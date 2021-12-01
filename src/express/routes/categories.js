'use strict';

const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);

router.get(`/categories`, getRequestPath);

module.exports = router;
