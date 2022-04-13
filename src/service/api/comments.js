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

  /**
   * Gat all comment with limit 4
   * @method GET
   */
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

  /**
   * Create new comment
   * @method POST
   * @schema {
   *   userId: Integer,
   *   publicationId: Integer,
   *   message: String
   * }
   */
  router.post(`/`, validateMiddleware(commentSchema), async (req, res) => {
    const data = req.body;
    data.createdAt = Date.now();
    data.updatedAt = Date.now();

    const io = req.app.locals.socketio;

    try {
      const comment = await CommentDataService.create(data);
      const ioComment = await CommentDataService.getById(comment.id);

      io.emit(`comment:create`, ioComment);

      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(`success`);
    } catch (e) {
      console.log(e);
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(`error`);
    }
  });

  /**
   * Get comment by ID
   * @method GET
   */
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

  /**
   * Get comment by User ID
   * @method GET
   */
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
