'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {storage} = require(`../services/multer`);
const upload = multer({storage});
const api = require(`../api`).getAPI();

module.exports = (app) => {
  const router = new Router();
  app.use(`/`, router);

  router.get(`/register`, (req, res) => {
    res.render(`auth/register`);
  });

  router.post(`/register`, upload.single(`avatar`), async (req, res) => {
    const {body, file} = req;

    if (body.password === body.repeatPassword) {
      body.avatar = file ? file.filename : `default.png`;
      const {firstName, lastName, email, password, avatar} = body;

      try {
        await api.createUser({
          firstName,
          lastName,
          email,
          password,
          avatar
        });

        res
          .redirect(`/login`);
      } catch (e) {
        res
          .render(`auth/register`, {
            errorMessages: e.response.data.message,
            user: req.body
          });
      }
    } else {
      res
        .render(`auth/register`, {
          errorMessages: [`Passwords do not match`],
          user: req.body
        });
    }
  });

  router.get(`/login`, (req, res) => {
    res.render(`auth/login`);
  });
};
