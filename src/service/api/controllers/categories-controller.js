'use strict';

const {
  ResponseStatus
} = require(`../../../constants`);

class CategoriesController {
  getAll(req, res) {
    try {
      const categories = req.app.locals.categories;
      res.send(categories);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }
}

module.exports = new CategoriesController();
