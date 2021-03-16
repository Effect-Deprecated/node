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
    "@effect-ts/node/(.*)$": "<rootDir>/packages/node/build/$1",
    "@effect-ts/node$": "<rootDir>/packages/node/build",
    "@effect-ts/system/(.*)$": "<rootDir>/node_modules/@effect-ts/system/$1",
    "@effect-ts/system$": "<rootDir>/node_modules/@effect-ts/system",
    "@effect-ts/core/(.*)$": "<rootDir>/node_modules/@effect-ts/core/$1",
    "@effect-ts/core$": "<rootDir>/node_modules/@effect-ts/core"
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
      compiler: "ttypescript"
    }
  }
}
