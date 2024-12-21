/*
  Warnings:

  - Added the required column `levelId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "LogLevel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "levelId" INTEGER NOT NULL,
    CONSTRAINT "Log_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "LogLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log" ("id", "message", "service", "timestamp") SELECT "id", "message", "service", "timestamp" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "LogLevel_name_key" ON "LogLevel"("name");
