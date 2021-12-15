'use strict';

class CategoryService {
  constructor(categories) {
    this._categories = categories;
  }

  getAll() {
    return this._categories;
  }
}

module.exports = CategoryService;
