'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();
  app.use(`/search`, router);

  router.get(`/`, async (req, res) => {
    const {query} = req.query;

    try {
      if (query) {
        const result = await api.search(encodeURI(req.query.query));

        res.render(`search/search`, {
          query,
          result
        });
      } else {
        res.render(`search/search`, {
          query: `Запрос пуст`,
          result: false
        });
      }
    } catch (e) {
      res.render(`search/search`, {
        query,
        result: false
      });
    }
  });
};
