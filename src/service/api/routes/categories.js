'use strict';

const {
  ResponseStatus
} = require(`../../../constants`);
const {Router} = require(`express`);
const router = new Router();

module.exports = (app, Category) => {
  app.use(`/categories`, router);
  router.get(`/`, (req, res) => {
    try {
      const categories = Category.getAll();
      res.send(categories);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
