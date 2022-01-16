'use strict';

const {Router} = require(`express`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/`, router);

  router.get(`/register`, (req, res) => {
    res.render(`auth/login`);
  });
  router.get(`/login`, (req, res) => {
    res.render(`auth/sign-up`);
  });
};
