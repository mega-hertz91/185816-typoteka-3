'use strict';

const {Router} = require(`express`);
const router = new Router();
const IndexController = require(`../controllers/index-controller`);

router.get(`/`, IndexController.index);

module.exports = router;
