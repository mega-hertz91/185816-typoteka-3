'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const validateMiddleware = require(`../middlewares/validated-entitties`);
const categorySchema = require(`../validators/category`);

module.exports = (app, CategoryDataService) => {
  const router = new Router();
  app.use(`/categories`, router);

  /**
   * Get all categories
   * @method GET
   */
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

  /**
   * Get category by id
   * @method GET
   */
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

  /**
   * Create new category
   * @method POST
   * @schema {
   *   name: String
   * }
   */
  router.post(`/`, validateMiddleware(categorySchema), async (req, res) => {
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

  /**
   * Update category by ID
   * @method PUT
   * @schema {
   *   name: String
   * }
   */
  router.put(`/:id`, validateMiddleware(categorySchema), async (req, res) => {
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

  /**
   * Drop category by ID
   * @method DELETE
   */
  router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    try {
      const category = await CategoryDataService.drop(id);

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
