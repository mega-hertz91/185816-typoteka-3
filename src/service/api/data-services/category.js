'use strict';

const categoriesMock = require(`../data/categories`);

class Category {
  constructor() {
    this._categories = categoriesMock;
  }

  async getAll() {
    return await this._categories();
  }
}

module.exports = new Category();
