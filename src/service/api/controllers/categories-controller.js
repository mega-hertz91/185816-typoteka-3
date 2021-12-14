'use strict';

const {
  ResponseStatus
} = require(`../../../constants`);
const Category = require(`../data-services/category`);

class CategoriesController {
  async getAll(req, res) {
    try {
      const categories = await Category.getAll();
      res.send(categories);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }
}

module.exports = new CategoriesController();
