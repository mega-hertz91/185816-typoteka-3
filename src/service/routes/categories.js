'use strict';

const {Router} = require(`express`);
const router = new Router();
const CategoriesController = require(`../controllers/categories-controller`);

router.get(`/`, CategoriesController.getAll);

module.exports = router;
