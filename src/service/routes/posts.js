'use strict';

const {Router} = require(`express`);
const router = new Router();
const PostsController = require(`../controllers/PostsController`);

router.get(`/`, PostsController.getAll);
router.get(`/:id`, PostsController.getById);

module.exports = router;
