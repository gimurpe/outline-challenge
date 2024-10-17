export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  moduleNameMapper: {
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@redux/(.*)$": "<rootDir>/src/redux/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      transformerConfig: {
        transformIgnorePatterns: [
          "/node_modules/(?!redux-persist)", // Include redux-persist in transformation
        ],
      },
    },
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
