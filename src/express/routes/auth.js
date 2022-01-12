'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/register`, (req, res) => {
  res.render(`auth/login`);
});
router.get(`/login`, (req, res) => {
  res.render(`auth/sign-up`);
});

module.exports = router;
