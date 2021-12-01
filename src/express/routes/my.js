'use strict';

const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);

router.get(`/my`, getRequestPath);
router.get(`/my/comments`, getRequestPath);

module.exports = router;
