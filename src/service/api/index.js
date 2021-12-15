'use strict';

const {Router} = require(`express`);
const app = new Router();
const articlesRouter = require(`./routes/articles`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

/**
 * Include services
 */
const ArticleService = require(`./data-services/article`);
const CommentService = require(`./data-services/comment`);
const CategoryService = require(`./data-services/category`);
const posts = require(`./data/posts`);
const categories = require(`./data/categories`);

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
  searchRouter(app, new ArticleService(articlesMock));
  categoriesRouter(app, new CategoryService(categoriesMock));
})();

module.exports = app;
