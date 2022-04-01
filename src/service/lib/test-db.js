'use strict';

const defineModels = require(`../models/index`);
const {hashSync} = require(`../lib/password`);

module.exports = async (sequelize, {categories}) => {
  const {Category, Role, User, Publication} = defineModels(sequelize);
  await sequelize.sync({force: true});

  await Role.bulkCreate([{name: `admin`}, {name: `registered`}, {name: `blocked`}]);
  await User.create({
    firstName: `test`,
    lastName: `test`,
    email: `test@t.ru`,
    password: hashSync(`pswd`),
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
