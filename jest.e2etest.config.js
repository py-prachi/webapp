module.exports = {
    roots: ['<rootDir>/test'],
    testRegex: '(.*\\.e2etest\\.ts?)$',
    modulePathIgnorePatterns: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    resetMocks: true,
  };
  