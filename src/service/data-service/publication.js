'use strict';

const Aliases = require(`../models/alias`);

class PublicationService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
    this._PC = sequelize.models.PublicationCategories;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
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
    return this._Publication.findByPk(id, {
      include: [
        {
          model: this._Category,
          as: Aliases.CATEGORIES,
          include: Aliases.PUBLICATIONS
        },
        {
          model: this._Comment,
          as: Aliases.COMMENTS,
          include: this._User
        }
      ]
    });
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
    return this._PC.bulkCreate(data.categories.map((id) => ({CategoryId: Number(id), PublicationId: publication.id})));
  }

  /**
   * {title, announce, description, preview, userId}
   * @param {int} id
   * @param {object} data
   * @return {Promise}
   */
  async update(id, data) {
    await this._PC.destroy({where: {PublicationId: id}});
    console.log(data.categories);
    await this._PC.bulkCreate(data.categories.map((itemId) => ({CategoryId: Number(itemId), PublicationId: id})));

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
   * @param {int} category
   * @return {Promise}
   */
  async findPage({limit, offset, category}) {
    let categoryOptions = false;
    if (category) {
      categoryOptions = {
        id: category
      };
    }
    const {count, rows} = await this._Publication.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: this._Category,
          as: Aliases.CATEGORIES,
          where: categoryOptions ? categoryOptions : false
        },
        Aliases.COMMENTS
      ],
      order: [
        [`createdAt`, `DESC`]
      ],
      distinct: true
    });

    return {count, publications: rows};
  }
}

module.exports = PublicationService;
