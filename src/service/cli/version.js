'use strict';

const packageJsonFile = require(`../../../package.json`);

/**
 * Initialization service
 */
const init = () => {
  const version = packageJsonFile.version;
  console.info(version);
};

module.exports = {
  name: `--version`,
  run() {
    init();
  }
};
