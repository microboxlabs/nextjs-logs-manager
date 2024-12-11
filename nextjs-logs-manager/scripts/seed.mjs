import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    const admin = await prisma.user.create({
      data: {
        username: "admin",
        password: adminPassword,
        role: "ADMIN",
      },
    });

    const regularUser = await prisma.user.create({
      data: {
        username: "user",
        password: userPassword,
        role: "USER",
      },
    });

    const sampleLogs = [
      {
        timestamp: new Date("2024-01-15T10:00:00Z"),
        level: "INFO",
        service: "Service-A",
        message: "Application started successfully",
      },
      {
        timestamp: new Date("2024-01-15T11:30:00Z"),
        level: "WARNING",
        service: "Service-B",
        message: "High memory usage detected",
      },
      {
        timestamp: new Date("2024-01-15T12:45:00Z"),
        level: "ERROR",
        service: "Service-C",
        message: "Database connection failed",
      },
      {
        timestamp: new Date("2024-01-16T09:15:00Z"),
        level: "INFO",
        service: "Service-A",
        message: "Routine health check completed",
      },
      {
        timestamp: new Date("2024-01-16T14:20:00Z"),
        level: "ERROR",
        service: "Service-B",
        message: "Critical system error",
      },
    ];

    await prisma.log.createMany({
      data: sampleLogs,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase().catch(console.error);
