/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use babel-jest for transformations
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  
  // Set the test environment to 'node' since testing only utility functions.
  // This is faster and simpler than a browser environment like jsdom.
  testEnvironment: 'node',

  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/?(*.)+(spec|test).ts"
  ],

  testPathIgnorePatterns: ["/node_modules/", "/public/"],
};