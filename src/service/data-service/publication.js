'use strict';

const aliases = require(`../models/alias`);

class PublicationService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
  }

  /**
   * @param {object} extension
   * @return {Promise}
   */
  getAll(extension) {
    const includes = [];

    if (extension.comments) {
      includes.push(aliases.COMMENTS);
    }

    if (extension.categories) {
      includes.push(aliases.CATEGORIES);
    }

    return this._Publication.findAll({
      include: includes
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  getById(id) {
    return this._Publication.findByPk(id);
  }

  /**
   * {title, announce, description, preview, userId}
   * @param {object} data
   * @return {Promise}
   */
  create(data) {
    return this._Publication.create(data);
  }

  /**
   * {title, announce, description, preview, userId}
   * @param {int} id
   * @param {object} data
   * @return {Promise}
   */
  update(id, data) {
    return this._Publication.update(data, {
      where: {id}
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  drop(id) {
    return this._Publication.destroy({
      where: {id}
    });
  }
}

module.exports = PublicationService;
