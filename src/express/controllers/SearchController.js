'use strict';

class SearchController {
  index(req, res) {
    res.render(`search/search`);
  }
}

module.exports = new SearchController();
