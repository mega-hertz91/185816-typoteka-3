'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const router = new Router();

module.exports = (app, Article) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    try {
      const articles = Article.getAll();
      const query = new RegExp(req.query.query, `g`, `i`);
      const result = articles.filter((item) => {
        const matches = item.title.match(query);
        return matches !== null;
      });
      res.send(result);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
