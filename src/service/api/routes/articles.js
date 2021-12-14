'use strict';

const {Router} = require(`express`);
const router = new Router();
const ArticlesController = require(`../controllers/articles-controller`);


module.exports = (app) => {
  app.use(`/articles`, router);

  /**
   * CRUD routes
   */
  router.get(`/`, ArticlesController.getAll);
  router.get(`/:articleId`, ArticlesController.getById);
  router.post(`/`, ArticlesController.create);
  router.delete(`/:articleId`, ArticlesController.delete);
  router.put(`/:articleId`, ArticlesController.update);

  /**
   * Relationship routes
   */
  router.get(`/:articleId/comments`, ArticlesController.getCommentsById);
  router.post(`/:articleId/comments`, ArticlesController.createCommentById);
  router.delete(`/:articleId/comments/:commentId`, ArticlesController.deleteCommentById);
};
