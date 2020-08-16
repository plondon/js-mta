module.exports = {
  transform: { "\\.ts$": ["ts-jest"] },
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"]
};
