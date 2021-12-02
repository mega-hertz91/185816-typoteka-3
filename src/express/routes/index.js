'use strict';

const {Router} = require(`express`);
const router = new Router();
const IndexController = require(`../controllers/IndexController`);

router.get(`/`, IndexController.index);

module.exports = router;
