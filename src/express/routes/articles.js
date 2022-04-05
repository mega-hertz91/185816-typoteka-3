'use strict';

const {Router} = require(`express`);
const {
  ensureArray
} = require(`../utils`);
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const {storage} = require(`../services/multer`);
const upload = multer({storage});
const authMiddleware = require(`../middlewares/auth`);
const csrfProtection = require(`../services/csrf`);
const urlParser = require(`../services/url-encoder-parser`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/articles`, router);

  router.get(`/add`, authMiddleware, csrfProtection, async (req, res) => {
    try {
      const categories = await api.getCategories();
      const {user} = req.session;

      res.render(`articles/add`, {
        categories,
        csrfToken: req.csrfToken(),
        user
      });
    } catch (e) {
      res.redirect(`/error`);
    }
  });

  router.post(`/add`, authMiddleware, upload.single(`upload`), csrfProtection, async (req, res) => {
    const {body, file} = req;
    const {user} = req.session;
    const data = {
      title: body.title,
      announce: body.announce,
      description: body.description,
      preview: file ? file.filename : ``,
      userId: user.id,
      categories: ensureArray(body.categories)
    };

    try {
      await api.createArticle(data);
      res.redirect(`/my`);
    } catch (e) {
      try {
        const categories = await api.getCategories();

        res.render(`articles/add`, {
          errorMessages: e.response.data.message,
          article: req.body,
          categories,
          user: req.session.user,
          csrfToken: req.csrfToken()
        });
      } catch (err) {
        res.redirect(`/error?message${err.message}`);
      }
    }
  });

  router.get(`/:id`, csrfProtection, async (req, res) => {
    try {
      const article = await api.getArticleById(req.params.id);

      if (article) {
        res.render(`articles/by-id`, {
          article,
          user: req.session.user,
          csrfToken: req.csrfToken()
        });
      } else {
        res.redirect(`/404`);
      }
    } catch (e) {
      res.redirect(`/error`);
    }
  });

  router.post(`/:id`, authMiddleware, urlParser, csrfProtection, async (req, res) => {
    try {
      await api.createComment({
        userId: req.session.user.id,
        publicationId: req.params.id,
        message: req.body.message
      });

      res
        .redirect(`/articles/${req.params.id}`);
    } catch (e) {
      const article = await api.getArticleById(req.params.id);
      res
        .render(`articles/by-id`, {
          article,
          user: req.session.user,
          errorMessages: e.response.data.message,
          comment: req.body.message,
          csrfToken: req.csrfToken()
        });
    }
  });

  router.get(`/edit/:id`, authMiddleware, csrfProtection, async (req, res) => {
    try {
      const article = await api.getArticleById(req.params.id);
      const categories = await api.getCategories();

      if (article.userId === req.session.user.id) {
        res.render(`articles/edit`, {
          article,
          categories,
          user: req.session.user,
          csrfToken: req.csrfToken()
        });
      } else {
        res.redirect(`/404`);
      }
    } catch (e) {
      res.redirect(`/404`);
    }
  });

  router.post(`/edit/:id`, authMiddleware, upload.single(`upload`), csrfProtection, async (req, res) => {
    const {body, file} = req;

    const data = {
      title: body.title,
      announce: body.announce,
      description: body.description,
      preview: file ? file.filename : false,
      userId: req.session.user.id,
      categories: ensureArray(body.categories),
      createdAt: body.createdAt
    };

    try {
      await api.updateArticle(req.params.id, data);
      res.redirect(`/articles/edit/${req.params.id}`);
    } catch (e) {
      const categories = await api.getCategories();
      res.render(`articles/edit`, {
        errorMessages: e.response.data.message,
        categories,
        article: req.body,
        user: req.session.user,
        csrfToken: req.csrfToken()
      });
    }
  });

  router.get(`/category/:id`, (req, res) => {
    res.send(`category`);
  });
};
