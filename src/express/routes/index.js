'use strict';

const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);

router.get(`/`, getRequestPath);

module.exports = router;
