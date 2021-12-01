'use strict';

const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);

router.get(`/register`, getRequestPath);
router.get(`/login`, getRequestPath);

module.exports = router;
