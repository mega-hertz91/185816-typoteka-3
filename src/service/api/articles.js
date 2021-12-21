'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const {Router} = require(`express`);
const validateRequestMiddleware = require(`../middlewares/validate-request-body`);


module.exports = (app, Article, Comment) => {
  const router = new Router();
  app.use(`/articles`, router);

  /**
   * CRUD routes
   */
  router.get(`/`, (req, res) => {
    try {
      const articles = Article.getAll();
      res.send(articles);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.get(`/:articleId`, (req, res) => {
    try {
      const article = Article.getById(req.params.articleId);

      if (article.attributes) {
        res.json(article.attributes);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Article not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.post(`/`, validateRequestMiddleware, (req, res) => {
    try {
      const article = Article.create(req.body);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(article);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  /**
   * Delete article by ID
   */
  router.delete(`/:articleId`, (req, res) => {
    try {
      const article = Article.delete(req.params.articleId);
      if (article) {
        res.send(article);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Article not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  /**
   * Update article by ID
   */
  router.put(`/:articleId`, validateRequestMiddleware, (req, res) => {
    try {
      const article = Article.update(req.body, req.params.articleId);
      if (article) {
        res.send(article);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Article not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  /**
   * Get all comment by article ID
   */
  router.get(`/:articleId/comments`, (req, res) => {
    try {
      const article = Article.getById(req.params.articleId);

      if (article.attributes) {
        res.send(article.attributes.comments);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Comments not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  /**
   * Create comment by article ID
   */
  router.post(`/:articleId/comments`, validateRequestMiddleware, (req, res) => {
    try {
      const comment = Comment.create(req.params.articleId, req.body);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(comment);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  /**
   * Delete comment by ID in article ID
   */
  router.delete(`/:articleId/comments/:commentId`, (req, res) => {
    try {
      const comment = Comment.delete(req.params.articleId, req.params.commentId);
      if (comment.attributes) {
        res
          .status(ResponseStatus.SUCCESS)
          .send(comment.attributes);
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
