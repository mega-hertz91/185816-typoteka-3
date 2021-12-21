'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const router = new Router();
const checkQueryMiddleware = require(`../middlewares/check-query-search`);

module.exports = (app, Search) => {
  app.use(`/search`, router);

  router.get(`/`, checkQueryMiddleware, (req, res) => {
    try {
      const articles = Search.getAll(req.query.query);

      if (articles.length > 0) {
        res.send(articles);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Result not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
