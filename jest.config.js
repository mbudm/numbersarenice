module.exports = {
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
  ],
  preset: 'ts-jest',
  rootDir: 'src',
  globals: {
    __PATH_PREFIX__: ``,
  },
}
