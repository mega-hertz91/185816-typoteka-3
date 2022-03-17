'use strict';

const {PUBLICATIONS_PER_PAGE} = require(`../constants`);
const {Router} = require(`express`);
const api = require(`../api`);

module.exports = (app) => {
  const router = new Router();

  app.use(`/`, router);

  router.get(`/`, async (req, res) => {
    try {
      // получаем номер страницы
      let {page = 1} = req.query;
      page = +page;

      // количество запрашиваемых объявлений равно количеству объявлений на странице
      const limit = PUBLICATIONS_PER_PAGE;

      // количество объявлений, которое нам нужно пропустить - это количество объявлений на предыдущих страницах
      const offset = (page - 1) * PUBLICATIONS_PER_PAGE;
      const [
        {count, publications},
        categories
      ] = await Promise.all([
        api.getAPI().getArticles({limit, offset}),
        api.getAPI().getCategories(true)
      ]);
      console.log(publications, limit, offset);
      // количество страниц — это общее количество объявлений, поделённое на количество объявлений на странице (с округлением вверх)
      const totalPages = Math.ceil(count / PUBLICATIONS_PER_PAGE);

      res.render(`index/main`, {articles: publications, page, totalPages, categories});
    } catch (e) {
      res.send(e);
    }
  });

  router.get(`/404`, (req, res) => {
    res.render(`error/404`);
  });
};
