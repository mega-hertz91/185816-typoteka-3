'use strict';

const defineModels = require(`../models/index`);

module.exports = async (sequelize, {categories}) => {
  const {Category} = defineModels(sequelize);
  await sequelize.sync({force: true});

  await Category.bulkCreate(categories.map((category) => ({name: category})));
};
