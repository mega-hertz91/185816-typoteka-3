'use strict';

const chalk = require(`chalk`);

/**
 * Initialization data-services
 */
const init = () => {
  console.info(chalk.gray(`Программа запускает http-сервер и формирует файл с данными для API.`));
  console.info(chalk.gray(`  Гайд: service.js <command>`));
  console.info(chalk.gray(`Команды:
  --version: выводит номер версии
  --help: печатает этот текст
  --generate <count> формирует файл mocks.json`));
};

module.exports = {
  name: `--help`,
  run() {
    init();
  }
};
