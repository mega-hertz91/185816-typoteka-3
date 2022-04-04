'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const authMiddleware = require(`../middlewares/auth`);

module.exports = (app) => {
  const router = new Router();

  app.use(`/my`, router);

  router.get(`/`, authMiddleware, async (req, res) => {
    const articles = await api.getArticleByUserId(req.session.user.id);

    res.render(`my/my`, {articles, user: req.session.user});
  });

  router.get(`/comments`, async (req, res) => {
    const limit = 1;
    const offset = 8;
    const articles = await api.getArticles({limit, offset});
    const comments = articles.map((item) => {
      return item.comments.map((commentItem) => {
        return {
          title: item.title,
          date: item.createDate,
          text: commentItem.text
        };
      });
    });

    res.render(`my/comments`, {comments: comments.shift()});
  });
};
