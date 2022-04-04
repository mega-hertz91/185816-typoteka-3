'use strict';

const {Router} = require(`express`);
const app = new Router();

/**
 * Include routers
 */
const publicationsRouter = require(`./publications`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);
const commentsRouter = require(`./comments`);
const usersRouter = require(`./user`);

/**
 * Include services
 */
const PublicationDataService = require(`../data-service/publication`);
const CategoryDataService = require(`../data-service/category`);
const SearchDataService = require(`../data-service/search`);
const CommentDataService = require(`../data-service/comment`);
const UserDataService = require(`../data-service/user`);

/**
 * Include models
 */
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models/index`);

(async () => {
  /**
   * Defined models
   */
  defineModels(sequelize);

  /**
   * Inject routes API
   */
  publicationsRouter(app, new PublicationDataService(sequelize), new CommentDataService(sequelize));
  searchRouter(app, new SearchDataService(sequelize));
  categoriesRouter(app, new CategoryDataService(sequelize));
  commentsRouter(app, new CommentDataService(sequelize));
  usersRouter(app, new UserDataService(sequelize));
})();

module.exports = app;
