'use strict';

const Alias = require(`./alias`);
const defineRole = require(`./role`);
const defineUser = require(`./user`);
const defineCategory = require(`./categiry`);
const definePublication = require(`./publication`);
const defineComment = require(`./comment`);
const definePublicationCategories = require(`./publication-categories`);

const define = (sequelize) => {
  /**
   * Init models
   */
  const Category = defineCategory(sequelize);
  const Role = defineRole(sequelize);
  const User = defineUser(sequelize);
  const Publication = definePublication(sequelize);
  const Comment = defineComment(sequelize);
  const PublicationCategories = definePublicationCategories(sequelize);

  /**
   * Init relationships
   */

  Role.hasMany(User, {
    as: Alias.USERS,
    foreignKey: `roleId`,
    onDelete: `cascade`
  });

  User.belongsTo(Role, {
    foreignKey: `roleId`,
  });

  User.hasMany(Comment, {
    as: Alias.COMMENTS,
    foreignKey: `userId`,
    onDelete: `cascade`
  });

  Comment.belongsTo(User, {
    foreignKey: `userId`,
  });

  Publication.hasMany(Publication, {
    as: Alias.COMMENTS,
    foreignKey: `publicationId`,
    onDelete: `cascade`
  });

  Comment.belongsTo(Publication, {
    foreignKey: `publicationId`,
  });

  Category.belongsToMany(Publication, {
    through: `publicationCategories`,
    as: Alias.PUBLICATIONS
  });

  Publication.belongsToMany(Category, {
    through: `publicationCategory`,
    as: Alias.CATEGORIES
  });

  return {Category, Role, User, Publication, Comment, PublicationCategories};
};

module.exports = define;
