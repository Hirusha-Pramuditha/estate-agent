export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.test.jsx'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-dnd|dnd-core|react-dnd-html5-backend|@react-dnd)/)'
  ]
}