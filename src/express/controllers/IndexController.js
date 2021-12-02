'use strict';

class IndexController {
  index(req, res) {
    res.render(`index/main`);
  }
}

module.exports = new IndexController();
