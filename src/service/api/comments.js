'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);

const validateMiddleware = require(`../middlewares/validated-entitties`);
const commentSchema = require(`../validators/comment`);

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

  router.post(`/`, validateMiddleware(commentSchema), async (req, res) => {
    const data = req.body;
    data.createdAt = Date.now();
    data.updatedAt = Date.now();

    try {
      await CommentDataService.create(data);

      res
        .send(`success`);
    } catch (e) {
      console.log(e);
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(`error`);
    }
  });

  router.get(`/:id`, async (req, res) => {
    try {
      const item = await CommentDataService.getById(req.params.id);
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

  router.get(`/user/:id`, async (req, res) => {
    try {
      const item = await CommentDataService.getByUserId(req.params.id);
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
