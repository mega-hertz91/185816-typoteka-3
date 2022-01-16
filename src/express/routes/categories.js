'use strict';

const {Router} = require(`express`);
const {getRequestPath} = require(`../utils`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/categories`, router);

  router.get(`/`, getRequestPath);
};
