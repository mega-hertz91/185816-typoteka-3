'use strict';

const {
  ResponseStatus,
  DEFAULT_ROLE
} = require(`../../constants`);
const {Router} = require(`express`);
const validateMiddleware = require(`../middlewares/validated-entitties`);
const userSchema = require(`../validators/user`);
const {hashSync, compareSync} = require(`../lib/password`);

module.exports = (app, UserDataService) => {
  const router = new Router();
  app.use(`/user`, router);

  router.post(`/`, validateMiddleware(userSchema), async (req, res) => {
    try {
      const unique = await UserDataService.getByEmail(req.body.email);

      if (!unique) {
        req.body.roleId = DEFAULT_ROLE;
        req.body.password = await hashSync(req.body.password);
        const user = await UserDataService.create(req.body);

        res
          .status(ResponseStatus.SUCCESS_CREATE)
          .send(user);
      } else {
        res
          .status(ResponseStatus.BAD_REQUEST)
          .send({
            message: [`email has been unique`],
            data: req.body
          });
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  });

  router.post(`/auth`, async (req, res) => {
    const {email, password} = req.body;

    const user = await UserDataService.getByEmail(email);
    if (user) {
      try {
        const correct = await compareSync(password, user.password);

        if (correct) {
          res
            .send(user);
        } else {
          res
            .status(ResponseStatus.UNAUTHORIZED)
            .send({messages: [`password incorrect`]});
        }
      } catch (e) {
        res
          .status(ResponseStatus.INTERNAL_ERROR)
          .send(e.message);
      }
    } else {
      res
        .status(ResponseStatus.UNAUTHORIZED)
        .send({messages: [`user is not authenticate`]});
    }
  });
};