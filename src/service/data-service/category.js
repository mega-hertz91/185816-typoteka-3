'use strict';

const Aliases = require(`../models/alias`);

class CategoryDataService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  /**
   * @return {Promise}
   */
  getAll() {
    return this._Category.findAll({
      include: [Aliases.PUBLICATIONS]
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  getById(id) {
    return this._Category.findOne({
      where: {id}
    });
  }

  /**
   * @param {int} id
   * @param {object} data
   * @return {Promise}
   */
  update(id, data) {
    return this._Category.update(data, {
      where: {id}
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  drop(id) {
    return this._Category.destroy({
      where: {id}
    });
  }
}

module.exports = CategoryDataService;
