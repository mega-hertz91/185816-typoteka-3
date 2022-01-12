'use strict';

const {Router} = require(`express`);
const router = new Router();
const api = require(`../api`);

router.get(`/my`, async (req, res) => {
  const articles = await api.getAPI().getArticles();

  res.render(`my/my`, {articles});
});

router.get(`/my/comments`, async (req, res) => {
  const articles = await api.getAPI().getArticles();
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

module.exports = router;
