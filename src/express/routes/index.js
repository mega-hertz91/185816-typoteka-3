'use strict';

const {Router} = require(`express`);
const router = new Router();
const api = require(`../api`);

router.get(`/`, async (req, res) => {
  const articles = await api.getAPI().getArticles();

  res.render(`index/main`, {articles});
});

module.exports = router;
