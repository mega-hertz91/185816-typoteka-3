'use strict';

const filldb = require(`./filldb`);
const version = require(`./version`);
const help = require(`./help`);
const server = require(`./server`);

const Cli = {
  [filldb.name]: filldb,
  [version.name]: version,
  [help.name]: help,
  [server.name]: server
};

module.exports = {
  Cli,
};
