'use strict';

const {Router} = require(`express`);
const api = require(`../api`).getAPI();
const authMiddleware = require(`../middlewares/auth`);
const authOwnerMiddleware = require(`../middlewares/auth-owner`);
const urlParser = require(`../services/url-encoder-parser`);
const csrfProtection = require(`../services/csrf`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/my`, router);

  /**
   * Display my articles
   * @method GET
   */
  router.get(`/`, authMiddleware, authOwnerMiddleware, async (req, res) => {
    const articles = await api.getArticleByUserId(req.session.user.id);

    res.render(`my/my`, {articles, user: req.session.user});
  });

  /**
   * Display my comments
   * @method GET
   */
  router.get(`/comments`, authMiddleware, authOwnerMiddleware, async (req, res) => {
    try {
      const comments = await api.getCommentByUserId(req.session.user.id);
      res.render(`my/comments`, {comments, user: req.session.user});
    } catch (e) {
      res.redirect(`/error`);
    }
  });

  /**
   * Display my categories
   * @method GET
   */
  router.get(`/categories`, authMiddleware, authOwnerMiddleware, csrfProtection, async (req, res) => {
    try {
      const categories = await api.getCategories();
      res.render(`my/categories`, {
        categories,
        user: req.session.user,
        csrfToken: req.csrfToken()
      });
    } catch (e) {
      res.redirect(`/error`);
    }
  });

  /**
   * Create new category
   * @method POST
   * @schema: {
   *   name: String
   * }
   */
  router.post(`/categories`, authMiddleware, authOwnerMiddleware, csrfProtection, urlParser, async (req, res) => {
    try {
      await api.createCategory(req.body);

      res
        .redirect(`/my/categories`);
    } catch (e) {
      res
        .render(`my/categories`, {
          user: req.session.user,
          csrfToken: req.csrfToken()
        });
    }
  });
};
