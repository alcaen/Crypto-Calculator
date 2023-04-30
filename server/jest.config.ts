import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['dist/*'],
};

export default config;
