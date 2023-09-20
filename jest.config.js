module.exports = {
    roots: ['<rootDir>/test'],
    testRegex: '(.*\\.test\\.ts?)$',
    modulePathIgnorePatterns: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    resetMocks: true,
  };
  