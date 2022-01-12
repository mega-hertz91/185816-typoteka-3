'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/404`, (req, res) => {
  res.render(`error/404`);
});

module.exports = router;
