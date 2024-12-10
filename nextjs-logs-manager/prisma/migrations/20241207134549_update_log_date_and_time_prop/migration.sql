-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "details" TEXT NOT NULL
);
INSERT INTO "new_Entry" ("date", "details", "id", "user") SELECT "date", "details", "id", "user" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
CREATE TABLE "new_Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Log" ("date", "id", "level", "message", "serviceName", "time") SELECT "date", "id", "level", "message", "serviceName", "time" FROM "Log";
DROP TABLE "Log";
ALTER TABLE "new_Log" RENAME TO "Log";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
