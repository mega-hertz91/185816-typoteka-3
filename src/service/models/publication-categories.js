'use strict';

const {DataTypes, Model} = require(`sequelize`);

class PublicationCategories extends Model {
}

const define = (sequelize) => PublicationCategories.init({
  publicationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `PublicationCategories`,
  tableName: `publicationCategories`
});

module.exports = define;
