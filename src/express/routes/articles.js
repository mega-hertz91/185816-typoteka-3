'use strict';

const {ResponseStatus} = require(`../../constants`);
const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);
const api = require(`../api`);

router.get(`/articles/add`, async (req, res) => {
  res.render(`articles/add`);
});

router.get(`/articles/:id`, async (req, res) => {
  res.send(`articles id`);
});

router.get(`/articles/edit/:id`, async (req, res) => {
  try {
    const article = await api.getAPI().getArticleById(req.params.id);
    res.render(`articles/edit`, {article});
  } catch (e) {
    res.redirect(ResponseStatus.NOT_FOUND, `/404`);
  }
});

router.get(`/articles/category/:id`, getRequestPath);

module.exports = router;
