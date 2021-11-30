'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mock.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_ENCODING = `utf8`;

const DATES = [
  `2021-03-01 01:10:00`,
  `2021-03-21 01:11:00`,
  `2021-05-02 12:10:00`,
  `2021-11-01 15:00:00`,
  `2021-10-01 01:10:00`,
];

const ExitCode = {
  success: 1,
  error: 0
};

const USER_ARGV_INDEX = 2;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  DATES,
  DEFAULT_ENCODING
};
