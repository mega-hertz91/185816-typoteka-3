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


  /**
   * Display form for register new User
   * @method GET
   */
  router.get(`/register`, userSessionMiddleware, csrfProtection, (req, res) => {
    res.render(`auth/register`, {csrfToken: req.csrfToken()});
  });

  /**
   * Register new User
   * @method POST
   * @schema: {
   *   email: String,
   *   password: String
   * }
   */
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
            user: req.body,
            csrfToken: req.csrfToken()
          });
      }
    } else {
      res
        .render(`auth/register`, {
          errorMessages: [`"password" пароли не совпадают`],
          user: req.body,
          csrfToken: req.csrfToken()
        });
    }
  });

  /**
   * Display form for authenticate user
   * @method GET
   */
  router.get(`/login`, userSessionMiddleware, csrfProtection, (req, res) => {
    res.render(`auth/login`, {csrfToken: req.csrfToken(), redirect: req.header(`referer`)});
  });

  /**
   * Authenticate user
   * @method POST
   * @schema: {
   *   email: String,
   *   password: String
   * }
   */
  router.post(`/login`, userSessionMiddleware, urlEncodeParser, csrfProtection, async (req, res) => {
    const {email, password} = req.body;
    const {redirect} = req.query;
    try {
      req.session.user = await api.auth({email, password});

      if (redirect) {
        req.session.save(() => {
          res
            .redirect(req.query.redirect);
        });
      } else {
        res
          .redirect(`/`);
      }
    } catch (e) {
      res
        .render(`auth/login`, {
          errorMessages: e.response.data.message,
          data: req.body,
          csrfToken: req.csrfToken(),
          redirect: redirect ? redirect : `/`
        });
    }
  });

  /**
   * Logout user
   */
  router.get(`/logout`, (req, res) => {
    delete req.session.user;

    res.redirect(`/`);
  });
};
