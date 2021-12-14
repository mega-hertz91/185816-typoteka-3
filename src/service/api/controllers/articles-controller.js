'use strict';

const {
  ResponseStatus
} = require(`../../../constants`);

const Article = require(`../data-services/article`);
const Comment = require(`../data-services/comment`);

class PostsController {
  async getAll(req, res) {
    try {
      const articles = await Article.getAll();
      res.send(articles);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async getById(req, res) {
    try {
      const article = await Article.getById(req.params.articleId);

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

  async create(req, res) {
    try {
      const article = await Article.create(req.body);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(article);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async update(req, res) {
    try {
      const article = await Article.update(req.body, req.params.articleId);
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

  async delete(req, res) {
    try {
      const article = await Article.delete(req.params.articleId);
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

  async getCommentsById(req, res) {
    try {
      const article = await Article.getById(req.params.articleId);

      if (article.attributes) {
        res.json(article.attributes.comments);
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
  }

  async createCommentById(req, res) {
    try {
      const comment = await Comment.create(req.params.articleId, req.body);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(comment);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async deleteCommentById(req, res) {
    try {
      const comment = await Comment.delete(req.params.articleId, req.params.commentId);
      res
        .status(ResponseStatus.SUCCESS_CREATE)
        .send(comment);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }
}

module.exports = new PostsController();
