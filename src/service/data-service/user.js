'use strict';

class UserDataService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  /**
   * @param {string} email
   * @return {Promise}
   */
  getByEmail(email) {
    return this._User.findOne({where: {email}});
  }

  /**
   * @param {object} data
   * @return {Promise}
   */
  create(data) {
    return this._User.create(data);
  }
}

module.exports = UserDataService;
