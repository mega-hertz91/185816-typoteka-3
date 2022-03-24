'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);

const validateMiddleware = require(`../middlewares/validated-entitties`);
const categorySchema = require(`../validators/comment`);

module.exports = (app, CommentDataService) => {
  const router = new Router();
  app.use(`/comments`, router);

  router.get(`/`, async (req, res) => {
    try {
      const items = await CommentDataService.getAll();

      res.send(items);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.post(`/`, validateMiddleware(categorySchema), async (req, res) => {
    res
      .send(`success`);
  });

  router.get(`/:commentId`, async (req, res) => {
    try {
      const item = await CommentDataService.getById(req.params.commentId);
      if (item) {
        res.send(item);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Comment not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });
};
