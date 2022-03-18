'use strict';

const Aliases = require(`../models/alias`);

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
      includes.push(Aliases.COMMENTS);
    }

    if (extension.categories) {
      includes.push(Aliases.CATEGORIES);
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

  /**
   * @param {int} limit
   * @param {int} offset
   * @return {Promise}
   */
  async findPage({limit, offset}) {
    const {count, rows} = await this._Publication.findAndCountAll({
      limit,
      offset,
      include: [Aliases.CATEGORIES, Aliases.COMMENTS],
      order: [
        [`createdAt`, `DESC`]
      ],
      distinct: true
    });

    return {count, publications: rows};
  }
}

module.exports = PublicationService;
