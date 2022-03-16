'use strict';

const {Router} = require(`express`);
const api = require(`../api`);

module.exports = (app) => {
  const router = new Router();

  app.use(`/`, router);

  router.get(`/`, async (req, res) => {
    const articles = await api.getAPI().getArticles();

    res.render(`index/main`, {articles});
  });

  router.get(`/404`, (req, res) => {
    res.render(`error/404`);
  });
};
