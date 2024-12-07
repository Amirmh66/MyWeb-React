import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv:['<rootDir>/setupTests.ts'],
  moduleFileExtensions: ["ts", "js", "tsx", "jsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]sx?$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
