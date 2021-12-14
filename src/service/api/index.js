'use strict';

const {Router} = require(`express`);
const app = new Router();
const articlesRouter = require(`./routes/articles`);
const searchRouter = require(`./routes/search`);
const categoriesRouter = require(`./routes/categories`);

/**
 * set mock data
 */

(() => {
  articlesRouter(app);
  searchRouter(app);
  categoriesRouter(app);
})();

module.exports = app;
