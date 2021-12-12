'use strict';

const {Router} = require(`express`);
const router = new Router();
const PostsController = require(`../controllers/posts-controller`);

router.get(`/`, PostsController.getAll);
router.get(`/:id`, PostsController.getById);

module.exports = router;
