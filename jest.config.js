import { Config } from '@jest/types'
import 'ts-jest'
import 'babel-jest'
import 'jest-watch-typeahead'

/** @type Partial<Config.InitialOptions> */
module.exports = {
  transform: {
    '.(ts|tsx)$': 'ts-jest/dist',
    '.(js|jsx)$': 'babel-jest', // jest's default
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
  testURL: 'http://localhost',
  rootDir,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
