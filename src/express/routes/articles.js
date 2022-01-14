'use strict';

const {Router} = require(`express`);
const router = new Router();
const {
  getRequestPath,
  ensureArray
} = require(`../utils`);
const api = require(`../api`).getAPI();
const multer = require(`multer`);
const {storage} = require(`../services/multer`);
const upload = multer({storage});

router.get(`/articles/add`, async (req, res) => {
  res.render(`articles/add`);
});

router.post(`/articles/add`, upload.single(`upload`), async (req, res) => {
  console.log(req.body);
  const {body, file} = req;
  const data = {
    title: body.title,
    announce: body.announce,
    description: body.description,
    background: file ? file.filename : ``,
    categories: ensureArray(body.categories)
  };

  try {
    await api.createArticle(data);
    res.redirect(`/my`);
  } catch (e) {
    console.log(e.message);
    res.redirect(`back`);
  }
});

router.get(`/articles/:id`, async (req, res) => {
  res.send(`articles id`);
});

router.get(`/articles/edit/:id`, async (req, res) => {
  try {
    const article = await api.getArticleById(req.params.id);
    res.render(`articles/edit`, {article});
  } catch (e) {
    res.redirect(`/404`);
  }
});

router.get(`/articles/category/:id`, getRequestPath);

module.exports = router;
