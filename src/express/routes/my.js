'use strict';

const {Router} = require(`express`);
const router = new Router();
const MyController = require(`../controllers/MyController`);

router.get(`/my`, MyController.index);
router.get(`/my/comments`, MyController.comments);

module.exports = router;
