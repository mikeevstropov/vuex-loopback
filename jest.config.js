
module.exports = {
  verbose: true,
  setupFilesAfterEnv: [
    'jest-extended',
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
  ],
  globalSetup: '<rootDir>/tests/global-setup.js',
};
