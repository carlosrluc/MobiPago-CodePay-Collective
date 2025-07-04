module.exports = {
  preset: "jest-expo",
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo|react-clone-referenced-element|@unimodules|unimodules|sentry-expo)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: [ "/node_modules/", "/android/", "/ios/"],
}
