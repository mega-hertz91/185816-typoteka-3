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

module.exports = (app) => {
  const router = new Router();
  app.use(`/articles`, router);

  router.get(`/add`, async (req, res) => {
    res.render(`articles/add`);
  });

  router.post(`/add`, upload.single(`upload`), async (req, res) => {
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
      await api.createArticle(data);
      res.redirect(`/my`);
    } catch (e) {
      res.redirect(`back`);
    }
  });

  router.get(`/:id`, async (req, res) => {
    res.send(`articles id`);
  });

  router.get(`/edit/:id`, async (req, res) => {
    try {
      const article = await api.getArticleById(req.params.id);
      res.render(`articles/edit`, {article});
    } catch (e) {
      res.redirect(`/404`);
    }
  });

  router.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
    const {body, file} = req;
    console.log(req.body);

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
      res.redirect(`/404`);
    }
  });

  router.get(`/category/:id`, getRequestPath);
};
