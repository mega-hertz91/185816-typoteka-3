'use strict';

module.exports = {
  name: `--help`,
  run() {
    console.info(`Программа запускает http-сервер и формирует файл с данными для API.`);
    console.info(`  Гайд: service.js <command>`);
    console.info(`Команды:
  --version: выводит номер версии
  --help: печатает этот текст
  --generate <count> формирует файл mocks.json`);
  }
};
