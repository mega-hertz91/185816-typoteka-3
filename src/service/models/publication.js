'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Publication extends Model {}

const define = (sequelize) => Publication.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  announce: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  preview: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `Publication`,
  tableName: `publications`
});

module.exports = define;
