'use strict';

const {Router} = require(`express`);
const router = new Router();
const SearchController = require(`../controllers/search-controller`);

router.get(`/search`, SearchController.index);

module.exports = router;