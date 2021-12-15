'use strict';

class Category {
  constructor(categories) {
    this._categories = categories;
  }

  getAll() {
    return this._categories;
  }
}

module.exports = Category;
