'use strict';

const {Router} = require(`express`);
const router = new Router();
const IndexController = require(`src/express/controllers/index-controller`);

router.get(`/`, IndexController.index);

module.exports = router;
