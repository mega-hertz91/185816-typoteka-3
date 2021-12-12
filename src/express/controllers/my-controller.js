'use strict';

class MyController {
  index(req, res) {
    res.render(`my/my`);
  }

  comments(req, res) {
    res.send(`Page for comments`);
  }
}

module.exports = new MyController();
