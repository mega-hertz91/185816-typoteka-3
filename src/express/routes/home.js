'use strict';

const {PUBLICATIONS_PER_PAGE} = require(`../constants`);
const {Router} = require(`express`);
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();

  app.use(`/`, router);

  router.get(`/`, async (req, res) => {
    try {
      // получаем номер страницы
      let {page = 1} = req.query;
      page = +page;

      const {category} = req.query;

      // количество запрашиваемых объявлений равно количеству объявлений на странице
      const limit = PUBLICATIONS_PER_PAGE;

      // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
      const offset = (page - 1) * PUBLICATIONS_PER_PAGE;
      const [
        {count, publications},
        categories,
        comments
      ] = await Promise.all([
        api.getArticles({limit, offset, category}),
        api.getCategories(true),
        api.getComments()
      ]);

      const hotArticles = publications.slice(0, 4).sort((a, b) => {
        return b.comments.length - a.comments.length;
      });

      const totalPages = Math.ceil(count / PUBLICATIONS_PER_PAGE);

      res.render(`index/main`, {
        articles: publications,
        hotArticles,
        comments,
        page,
        totalPages,
        categories,
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
