'use strict';

const api = require(`../api`);

class IndexController {
  async index(req, res) {
    const articles = await api.getAPI().getArticles();

    res.render(`index/main`, {articles});
  }
}

module.exports = new IndexController();
