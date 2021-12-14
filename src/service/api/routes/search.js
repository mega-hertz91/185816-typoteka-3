'use strict';

const {Router} = require(`express`);
const router = new Router();
const SearchController = require(`../controllers/search-controller`);

module.exports = (app) => {
  app.use(`/search`, router);

  router.get(`/`, SearchController.index);
};
