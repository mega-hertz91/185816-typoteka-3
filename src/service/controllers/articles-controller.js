'use strict';

const {
  ResponseStatus
} = require(`../../constants`);

const {
  findById
} = require(`../../utils`);

const Article = require(`../models/article`);

class PostsController {
  getAll(req, res) {
    try {
      const articles = req.app.locals.posts;
      res.send(articles);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  getById(req, res) {
    try {
      let content = req.app.locals.posts;
      const article = findById(content, req.params.articleId);

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
  }

  create(req, res) {
    try {
      const article = Article.create(req);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(article);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  update(req, res) {
    try {
      const article = Article.update(req);
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
  }

  delete(req, res) {
    try {
      const article = Article.delete(req);
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
  }
}

module.exports = new PostsController();
