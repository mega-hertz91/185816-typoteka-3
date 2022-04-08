'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);

module.exports = (app, CategoryDataService) => {
  const router = new Router();
  app.use(`/categories`, router);

  router.get(`/`, async (req, res) => {
    try {
      const categories = await CategoryDataService.getAll();

      if (categories) {
        res.send(categories);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Categories not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.get(`/:categoryId`, async (req, res) => {
    try {
      const category = await CategoryDataService.getById(req.params.categoryId);
      if (category) {
        res.send(category);
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

  router.post(`/`, async (req, res) => {
    try {
      const category = await CategoryDataService.create(req.body);

      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(category);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    try {
      const category = await CategoryDataService.update(id, req.body);

      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(category);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
