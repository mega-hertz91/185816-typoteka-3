'use strict';

const {Router} = require(`express`);
const app = new Router();
const homeRouter = require(`./home`);
const myRouter = require(`./my`);
const categoriesRouter = require(`./categories`);
const articlesRouter = require(`./articles`);
const authRouter = require(`./auth`);
const searchRouter = require(`./search`);

(async () => {
  homeRouter(app);
  myRouter(app);
  categoriesRouter(app);
  articlesRouter(app);
  authRouter(app);
  searchRouter(app);
})();

module.exports = app;
