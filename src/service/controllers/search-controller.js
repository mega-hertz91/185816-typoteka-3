'use strict';

class SearchController {
  index(req, res) {
    const articles = req.app.locals.posts;
    const query = new RegExp(req.query.query, `g`, `i`);
    const result = articles.filter((item) => {
      const matches = item.title.match(query);
      return matches !== null;
    });
    res.send(result);
  }
}

module.exports = new SearchController();
