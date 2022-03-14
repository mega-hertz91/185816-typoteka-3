'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const checkQueryMiddleware = require(`../middlewares/check-query-search`);

module.exports = (app, SearchDataService) => {
  const router = new Router();
  app.use(`/search`, router);

  router.get(`/`, checkQueryMiddleware, async (req, res) => {
    try {
      const items = await SearchDataService.search(req.query.query);

      if (items) {
        res.send(items);
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
