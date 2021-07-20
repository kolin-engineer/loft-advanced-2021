module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^components/(.*)$": "<rootDir>/src/admin/components/$1",
  },
  resetMocks: false,
  setupFiles: ["jest-localstorage-mock"],
};
