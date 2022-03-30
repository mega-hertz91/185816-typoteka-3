'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mock.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_ENCODING = `utf8`;
const DEFAULT_PORT = 3000;
const DEFAULT_ROLE = 2;
const ResponseStatus = {
  SUCCESS: 200,
  SUCCESS_CREATE: 201,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400
};

const MULTIPLIER = 10;

const Method = {
  POST: `POST`,
  GET: `GET`,
  DELETE: `DELETE`,
  PUT: `PUT`
};

const Entity = {
  POSTS: `/posts`,
  ARTICLES: `/articles`,
  SEARCH: `/search`,
  CATEGORIES: `/categories`
};

const Prefix = {
  API: `/api`
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

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
  DEFAULT_ENCODING,
  DEFAULT_PORT,
  Prefix,
  Entity,
  ResponseStatus,
  Env,
  Method,
  MULTIPLIER,
  DEFAULT_ROLE
};
