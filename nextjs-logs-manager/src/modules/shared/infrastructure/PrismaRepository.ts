import { PrismaClient } from "@prisma/client";

export abstract class PrismaRepository {
  protected readonly prisma: PrismaClient;

  public constructor() {
    this.prisma = new PrismaClient();
  }
}
