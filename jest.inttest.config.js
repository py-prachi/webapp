module.exports = {
    roots: ['<rootDir>/test'],
    testRegex: '(.*\\.inttest\\.ts?)$',
    modulePathIgnorePatterns: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    resetMocks: true,
  };
  