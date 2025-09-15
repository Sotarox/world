/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Use babel-jest for transformations
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  
  testEnvironment: 'jsdom',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],

  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx)",
    "**/?(*.)+(spec|test).(ts|tsx)"
  ],

  testPathIgnorePatterns: ["/node_modules/", "/public/"],
};