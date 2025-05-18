import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm", // Use the ESM preset for TypeScript
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }], // Move ts-jest config here
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fix imports for ESM
  },
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
