'use strict';

const {
  findById
} = require(`../../utils`);

class CategoryService {
  constructor(categories) {
    this._categories = categories;
  }

  getAll() {
    return this._categories;
  }

  getById(id) {
    return findById(this._categories, id);
  }
}

module.exports = CategoryService;
