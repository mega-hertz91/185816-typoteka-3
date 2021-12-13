'use strict';

const {
  ResponseStatus
} = require(`../../constants`);

const {
  findById,
  getNowDate
} = require(`../../utils`);

const {nanoid} = require(`nanoid`);

class PostsController {
  async getAll(req, res) {
    try {
      const articles = req.app.locals.posts;
      res.send(articles);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async getById(req, res) {
    try {
      let content = req.app.locals.posts;
      const article = findById(content, req.params.articleId);

      if (article.attributes) {
        res.json(article.attributes);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Post not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async create(req, res) {
    const article = req.body;
    article.createDate = getNowDate();
    article.id = nanoid();
    req.app.locals.posts.push(article);
    res.send(article);
  }

  async update(req, res) {
    res.send(`update`);
  }

  async delete(req, res) {
    let content = req.app.locals.posts;
    const article = findById(content, req.params.articleId);
    if (article.attributes) {
      req.app.locals.posts.splice(article.index, 1);
      res.send(article.attributes);
    } else {
      res
        .status(ResponseStatus.NOT_FOUND)
        .send(`Article not found`);
    }
  }
}

module.exports = new PostsController();
