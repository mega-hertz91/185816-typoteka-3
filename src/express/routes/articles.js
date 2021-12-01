'use strict';

const {Router} = require(`express`);
const router = new Router();
const {getRequestPath} = require(`../utils`);

router.get(`/articles/:id`, getRequestPath);
router.get(`/articles/add`, getRequestPath);
router.get(`/articles/edit/:id`, getRequestPath);
router.get(`/articles/category/:id`, getRequestPath);

module.exports = router;
