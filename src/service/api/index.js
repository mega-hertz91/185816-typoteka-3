'use strict';

const {Router} = require(`express`);
const app = new Router();
const publicationsRouter = require(`./publications`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

/**
 * Include services
 */
const PublicationService = require(`../data-service/publication`);
const CategoryService = require(`../data-services/category`);
const SearchService = require(`../data-services/search`);
const posts = require(`../data/posts`);
const categories = require(`../data/categories`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models/index`);

(async () => {
  /**
   * add mock data
   */
  const articlesMock = await posts();
  const categoriesMock = await categories();

  /**
   * Defined models
   */

  defineModels(sequelize);

  /**
   * Inject routes API
   */
  publicationsRouter(app, new PublicationService(sequelize));
  searchRouter(app, new SearchService(articlesMock));
  categoriesRouter(app, new CategoryService(categoriesMock));
})();

module.exports = app;
