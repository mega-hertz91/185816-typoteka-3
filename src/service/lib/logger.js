'use strict';

const pino = require(`pino`);
const {Env} = require(`../../constants`);
const path = require(`path`);

const LOG_FILE = path.join(path.dirname(__dirname), `/logs/api.log`);
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode
}, isDevMode ? process.stdout : pino.destination({dest: LOG_FILE, sync: false}));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
