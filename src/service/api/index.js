'use strict';

const {Router} = require(`express`);
const app = new Router();
const articlesRouter = require(`./articles`);
const searchRouter = require(`./search`);
const categoriesRouter = require(`./categories`);

/**
 * Include services
 */
const ArticleService = require(`../data-services/article`);
const CommentService = require(`../data-services/comment`);
const CategoryService = require(`../data-services/category`);
const SeachService = require(`../data-services/search`);
const posts = require(`../data/posts`);
const categories = require(`../data/categories`);

(async () => {
  /**
   * add mock data
   */
  const articlesMock = await posts();
  const categoriesMock = await categories();

  /**
   * Inject routes API
   */
  articlesRouter(app, new ArticleService(articlesMock), new CommentService(articlesMock));
  searchRouter(app, new SeachService(articlesMock));
  categoriesRouter(app, new CategoryService(categoriesMock));
})();

module.exports = app;
