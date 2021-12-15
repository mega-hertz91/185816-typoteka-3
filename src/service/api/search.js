'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const router = new Router();

module.exports = (app, Search) => {
  app.use(`/search`, router);

  router.get(`/`, (req, res) => {
    try {
      const articles = Search.getAll();
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
