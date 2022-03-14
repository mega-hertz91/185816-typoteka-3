'use strict';

const {Op} = require(`sequelize`);

class SearchDataService {
  constructor(sequelize) {
    this._Publication = sequelize.models.Publication;
  }

  /**
   * @param {string} title
   * @return {Promise}
   */
  search(title) {
    return this._Publication.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    });
  }
}

module.exports = SearchDataService;
