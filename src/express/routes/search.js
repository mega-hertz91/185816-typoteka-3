'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/search`, (req, res) => {
  res.render(`search/search`);
});

module.exports = router;
