
module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    'jest-extended',
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
  ],
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1',
    '^@tests(.*)$': '<rootDir>/tests$1',
  },
  globalSetup: '<rootDir>/tests/global-setup.js',
};
