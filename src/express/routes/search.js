'use strict';

const {Router} = require(`express`);
const router = new Router();
const api = require(`../api`).getAPI();

router.get(`/search`, async (req, res) => {
  const {query} = req.query;

  try {
    if (query) {
      const result = await api.search(encodeURI(req.query.query));
      console.log(result);

      res.render(`search/search`, {
        query,
        result
      });
    } else {
      res.render(`search/search`, {
        query: `Запрос пуст`,
        result: false
      });
    }
  } catch (e) {
    console.log(e.message);
    res.render(`search/search`, {
      query,
      result: false
    });
  }
});

module.exports = router;
