'use strict';

const defineModels = require(`../models/index`);

module.exports = async (sequelize, {categories}) => {
  const {Category, Role, User, Publication} = defineModels(sequelize);
  await sequelize.sync({force: true});

  await Role.create({name: `admin`});
  await User.create({
    firstName: `test`,
    lastName: `test`,
    email: `test@t.ru`,
    password: `pswd`,
    avatar: `default.jpg`,
    roleId: 1
  });
  await Category.bulkCreate(categories.map((category) => ({name: category})));
  await Publication.create({
    title: `test`,
    announce: `test`,
    description: `test`,
    userId: 1
  });
};
