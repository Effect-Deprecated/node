// eslint-disable-next-line
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["packages/**/src/**/*.ts"],
  setupFiles: ["./scripts/jest-setup.ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/packages/.*/build",
    "<rootDir>/packages/.*/compiler-debug",
    "<rootDir>/_tmp"
  ],
  verbose: true,
  moduleNameMapper: {
    "@effect-ts/node/(.*)$": "<rootDir>/packages/node/build/_traced/$1",
    "@effect-ts/node$": "<rootDir>/packages/node/build/_traced",
    "@effect-ts/system/(.*)$": "<rootDir>/node_modules/@effect-ts/system/_traced/$1",
    "@effect-ts/system$": "<rootDir>/node_modules/@effect-ts/system/_traced",
    "@effect-ts/core/(.*)$": "<rootDir>/node_modules/@effect-ts/core/_traced/$1",
    "@effect-ts/core$": "<rootDir>/node_modules/@effect-ts/core/_traced"
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
      compiler: "ttypescript"
    }
  }
}
