import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Deprecated definition of "ts-jest"
  // globals: {
  //   'ts-jest': {
  //     useESM: true,
  //   },
  // },
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts'],

  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

export default config;
