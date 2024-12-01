import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/app/__test__/**/*.test.ts"],
  moduleNameMapper : {"^@/(.*)$": "<rootDir>/$1"},
  moduleFileExtensions: ["ts", "js"],
};

export default config;