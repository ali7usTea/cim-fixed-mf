/** @type {import('jest').Config} */
export default {
  cache: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "@happy-dom/jest-environment",
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest.setup.ts"],
  setupFiles: ["<rootDir>/jest.env.cjs"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "./esbuild-jest-transformer.cjs",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(jwt-decode|cim-ui-components)/)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^cim-ui-components$": "<rootDir>/node_modules/cim-ui-components/dist/index.js"
  }
};
