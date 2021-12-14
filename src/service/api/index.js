'use strict';

const {Router} = require(`express`);
const app = new Router();
const articlesRouter = require(`./routes/articles`);
const searchRouter = require(`./routes/search`);
const posts = require(`./data/posts`);
const categories = require(`./data/categories`);

/**
 * set mock data
 */
const mockPosts = await posts();
const mockCategories = await categories();

(() => {
  articlesRouter(app, mockPosts);
  searchRouter(app);
})();

module.exports = app;
