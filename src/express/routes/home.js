'use strict';

const {PUBLICATIONS_PER_PAGE} = require(`../constants`);
const {Router} = require(`express`);
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();
  app.use(`/`, router);

  /**
   * Display homepage
   */
  router.get(`/`, async (req, res) => {
    try {
      let {page = 1} = req.query;
      page = +page;

      const limit = PUBLICATIONS_PER_PAGE;

      const offset = (page - 1) * PUBLICATIONS_PER_PAGE;

      const [
        {count, publications},
        categories,
        comments,
        hotPublications,
      ] = await Promise.all([
        api.getArticles({limit, offset}),
        api.getCategories(true),
        api.getComments(),
        api.getArticles({}, true)
      ]);

      const hotArticles = hotPublications
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 4)
        .filter((item) => item.comments.length > 0);

      const totalPages = Math.ceil(count / PUBLICATIONS_PER_PAGE);

      res.render(`index/main`, {
        articles: publications,
        hotArticles,
        comments,
        page,
        totalPages,
        categories: categories.filter((category) => category.publications.length > 0),
        user: req.session.user,
        currentCategory: Number(req.query.category)
      });
    } catch (e) {
      res.send(e);
    }
  });

  router.get(`/404`, (req, res) => {
    res.render(`error/404`, {user: req.session.user});
  });

  router.get(`/error`, (req, res) => {
    res.render(`error/500`, {user: req.session.user});
  });
};
