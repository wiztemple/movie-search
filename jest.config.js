module.exports = {
  preset: 'ts-jest', // Add this line if you are using TypeScript
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add this line to include additional setup
};
