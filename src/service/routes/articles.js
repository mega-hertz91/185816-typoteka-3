'use strict';

const {Router} = require(`express`);
const router = new Router();
const ArticlesController = require(`../controllers/articles-controller`);

router.get(`/`, ArticlesController.getAll);
router.get(`/:articleId`, ArticlesController.getById);
router.post(`/`, ArticlesController.create);
router.delete(`/:articleId`, ArticlesController.delete);

module.exports = router;
