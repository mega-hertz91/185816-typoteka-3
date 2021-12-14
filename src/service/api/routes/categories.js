'use strict';

const {Router} = require(`express`);
const router = new Router();
const CategoriesController = require(`../controllers/categories-controller`);

module.exports = (app) => {
  app.use(`/categories`, router);
  router.get(`/`, CategoriesController.getAll);
};
