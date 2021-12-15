'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const router = new Router();

module.exports = (app, Category) => {
  app.use(`/categories`, router);

  router.get(`/`, (req, res) => {
    try {
      const categories = Category.getAll();

      if (categories.length > 0) {
        res.send(categories);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Articles not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.get(`/:categoryId`, (req, res) => {
    try {
      const category = Category.getById(req.params.categoryId);
      if (category.attributes) {
        res.send(category.attributes);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Category not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
