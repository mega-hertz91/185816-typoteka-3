'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const {storage} = require(`../services/multer`);
const upload = multer({storage});
const api = require(`../api`).getAPI();
const urlEncodeParser = require(`../services/url-encoder-parser`);
const userSessionMiddleware = require(`../middlewares/user-session`);
const csrfProtection = require(`../services/csrf`);

module.exports = (app) => {
  const router = new Router();
  app.use(`/`, router);

  router.get(`/register`, userSessionMiddleware, csrfProtection, (req, res) => {
    res.render(`auth/register`, {csrfToken: req.csrfToken()});
  });

  router.post(`/register`, userSessionMiddleware, upload.single(`avatar`), csrfProtection, async (req, res) => {
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

  router.get(`/login`, userSessionMiddleware, csrfProtection, (req, res) => {
    res.render(`auth/login`, {csrfToken: req.csrfToken()});
  });

  router.post(`/login`, userSessionMiddleware, urlEncodeParser, csrfProtection, async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    try {
      req.session.user = await api.auth({email, password});
      req.session.save(() => {
        res
          .redirect(`/`);
      });
    } catch (e) {
      res
        .render(`auth/login`, {errorMessages: e.response.data.messages, user: req.body});
    }
  });

  router.get(`/logout`, (req, res) => {
    delete req.session.user;

    res.redirect(`/`);
  });
};
