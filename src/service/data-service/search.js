'use strict';

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
      where: {title}
    });
  }
}

module.exports = SearchDataService;
