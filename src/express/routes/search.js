'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();
  app.use(`/search`, router);

  /**
   * Display result search
   * @method GET
   */
  router.get(`/`, async (req, res) => {
    const {query} = req.query;

    try {
      if (query) {
        const articles = await api.search(encodeURI(req.query.query));

        res.render(`search/search`, {
          query,
          articles,
          user: req.session.user
        });
      } else {
        res.render(`search/search`, {
          query: `Запрос пуст`,
          articles: false,
          user: req.session.user
        });
      }
    } catch (e) {
      res.render(`search/search`, {
        query,
        articles: false,
        user: req.session.user
      });
    }
  });
};
