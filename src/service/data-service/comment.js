'use strict';

class CommentDataService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
    this._Publication = sequelize.models.Publication;
  }

  /**
   * @return {Promise}
   */
  getAll() {
    return this._Comment.findAll({
      include: this._User,
      order: [[`id`, `DESC`]],
      limit: 4
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  getById(id) {
    return this._Comment.findOne({
      where: {id},
      include: [
        {
          model: this._User,
          attributes: [`avatar`, `firstName`, `lastName`]
        }
      ]
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  getByUserId(id) {
    return this._Comment.findAll({
      include: [
        {
          model: this._User,
          where: {id},
          attributes: [`firstName`, `lastName`, `avatar`]
        },
        {
          model: this._Publication,
          attributes: [`title`]
        }
      ],
      order: [[`createdAt`, `DESC`]]
    });
  }

  /**
   * @param {object} data
   * @return {Promise}
   */
  create(data) {
    return this._Comment.create(data);
  }

  /**
   * @param {int} id
   * @param {object} data
   * @return {Promise}
   */
  update(id, data) {
    return this._Comment.update(data, {
      where: {id}
    });
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  drop(id) {
    return this._Comment.destroy({
      where: {id}
    });
  }
}

module.exports = CommentDataService;
