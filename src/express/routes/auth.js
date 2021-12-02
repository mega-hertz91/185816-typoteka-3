'use strict';

const {Router} = require(`express`);
const router = new Router();
const AuthController = require(`../controllers/AuthController`);

router.get(`/register`, AuthController.signUp);
router.get(`/login`, AuthController.login);

module.exports = router;
