/**
 * The config enables the use of ECMAScript 6 modules
 */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/*.test.(ts|js)"],
  testEnvironment: "node",

  /** Options from jest wizard following bootcamp instructions  */
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
