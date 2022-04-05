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
    try {
      const comments = await api.getCommentByUserId(req.session.user.id);
      res.render(`my/comments`, {comments, user: req.session.user});
    } catch (e) {
      res.redirect(`/error`);
    }
  });
};
