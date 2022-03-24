'use strict';

class CommentDataService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
  }

  /**
   * @return {Promise}
   */
  getAll() {
    return this._Comment.findAll();
  }

  /**
   * @param {int} id
   * @return {Promise}
   */
  getById(id) {
    return this._Comment.findOne({
      where: {id}
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
