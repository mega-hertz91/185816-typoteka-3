'use strict';

const {Router} = require(`express`);
const {
  getRequestPath,
  ensureArray
} = require(`../utils`);
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const {storage} = require(`../services/multer`);
const upload = multer({storage});
const authMiddleware = require(`../middlewares/auth`);
const csrfProtection = require(`../services/csrf`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/articles`, router);

  router.get(`/add`, authMiddleware, csrfProtection, async (req, res) => {
    res.render(`articles/add`, {csrfToken: req.csrfToken()});
  });

  router.post(`/add`, authMiddleware, upload.single(`upload`), csrfProtection, async (req, res) => {
    const {body, file} = req;
    const data = {
      title: body.title,
      announce: body.announce,
      description: body.description,
      preview: file ? file.filename : ``,
      userId: 1,
      categories: ensureArray(body.categories)
    };

    try {
      await api.createArticle(data);
      res.redirect(`/my`);
    } catch (e) {
      res.render(`articles/add`, {errorMessages: e.response.data.message, article: req.body, user: req.session.user, csrfToken: req.csrfToken()});
    }
  });

  router.get(`/:id`, async (req, res) => {
    res.send(`articles id`);
  });

  router.get(`/edit/:id`, authMiddleware, csrfProtection, async (req, res) => {
    try {
      const article = await api.getArticleById(req.params.id);
      res.render(`articles/edit`, {article, user: req.session.user, csrfToken: req.csrfToken()});
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
      preview: file ? file.filename : ``,
      userId: 3,
      categories: ensureArray(body.categories)
    };

    try {
      await api.updateArticle(req.params.id, data);
      res.redirect(`/articles/edit/${req.params.id}`);
    } catch (e) {
      res.render(`articles/edit`, {errorMessages: e.response.data.message, article: req.body, user: req.session.user, csrfToken: req.csrfToken()});
    }
  });

  router.get(`/category/:id`, getRequestPath);
};
