'use strict';

const {PUBLICATIONS_PER_PAGE} = require(`../constants`);
const {Router} = require(`express`);
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();
  app.use(`/category`, router);

  /**
   * Display page by category id
   */
  router.get(`/:id`, async (req, res) => {
    try {
      // получаем номер страницы
      let {page = 1} = req.query;
      page = +page;

      const category = req.params.id;

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

      const hotArticles = publications
        .sort((a, b) => {
          return b.comments.length - a.comments.length;
        })
        .filter((article) => article.comments.length > 0);

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
};
