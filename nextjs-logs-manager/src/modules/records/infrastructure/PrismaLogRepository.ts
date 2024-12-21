import { PrismaRepository } from "@/src/modules/shared/infrastructure/PrismaRepository";
import LogRepository from "@/src/modules/records/domain/LogRepository";
import LogRecord from "../domain/LogRecord";
import { Prisma } from "@prisma/client";
import LogLevel from "../domain/LogLevel";
import { LogFilters } from "@/src/modules/records/application/readLogs";

export default class PrismaLogRepository
  extends PrismaRepository
  implements LogRepository
{
  async save(records: LogRecord[]): Promise<void> {
    const levels = await this.prisma.logLevel.findMany({});
    const levelMap = levels.reduce(
      (acc, level) => {
        acc[level.name as LogLevel] = level.id;
        return acc;
      },
      {} as Record<LogLevel, number>,
    );

    if (levels.length === 0) {
      return;
    }

    await this.prisma.log.createMany({
      data: records.map((record) => ({
        timestamp: record.timestamp,
        service: record.service,
        message: record.message,
        levelId: levelMap[record.level],
      })),
    });
  }

  async getAll(filters: LogFilters): Promise<LogRecord[]> {
    const where: Prisma.LogWhereInput = {};

    if (filters) {
      const conditions: Prisma.LogWhereInput[] = [];

      if (filters.from) {
        conditions.push({
          timestamp: {
            gte: filters.from,
          },
        });
      }

      if (filters.to) {
        conditions.push({
          timestamp: {
            lte: filters.to,
          },
        });
      }

      if (filters.service) {
        conditions.push({
          service: {
            contains: filters.service,
          },
        });
      }

      if (filters.message) {
        conditions.push({
          message: {
            contains: filters.message,
          },
        });
      }

      if (filters.level) {
        conditions.push({
          level: {
            name: filters.level,
          },
        });
      }

      if (conditions.length > 0) {
        where.AND = conditions;
      }
    }

    const logs = await this.prisma.log.findMany({
      where,
      include: {
        level: true,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return logs.map(
      (log) =>
        ({
          timestamp: log.timestamp,
          level: log.level.name,
          service: log.service,
          message: log.message,
        }) as LogRecord,
    );
  }
}
