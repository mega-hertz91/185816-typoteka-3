'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);

/**
 * Initialization service
 */
const init = () => {
  const version = packageJsonFile.version;
  console.info(chalk.blue(version));
};

module.exports = {
  name: `--version`,
  run() {
    init();
  }
};
