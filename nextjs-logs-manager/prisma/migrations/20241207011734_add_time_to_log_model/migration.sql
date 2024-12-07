/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Log` table. All the data in the column will be lost.
  - Added the required column `date` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "level" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Log" ("id", "level", "message", "serviceName") SELECT "id", "level", "message", "serviceName" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
