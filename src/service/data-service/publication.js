'use strict';

const Aliases = require(`../models/alias`);

class PublicationService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
    this._PB = sequelize.models.PublicationCategories;
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
   * @param {int} id
   * @return {Promise}
   */
  getByAuthorId(id) {
    return this._Publication.findAll({where: {userId: id}});
  }

  /**
   * {title, announce, description, preview, userId}
   * @param {object} data
   * @return {Promise}
   */
  async create(data) {
    const publication = await this._Publication.create(data);
    return this._PB.bulkCreate(data.categories.map((id) => ({CategoryId: Number(id), PublicationId: publication.id})));
  }

  /**
   * {title, announce, description, preview, userId}
   * @param {int} id
   * @param {object} data
   * @return {Promise}
   */
  async update(id, data) {
    await this._PB.destroy({where: {PublicationId: id}});
    await this._Publication.update(data, {
      where: {id}
    });

    return this._PB.bulkCreate(data.categories.map((itemId) => ({CategoryId: Number(itemId), PublicationId: id})));
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
