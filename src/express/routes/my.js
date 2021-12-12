'use strict';

const {Router} = require(`express`);
const router = new Router();
const MyController = require(`src/express/controllers/my-controller`);

router.get(`/my`, MyController.index);
router.get(`/my/comments`, MyController.comments);

module.exports = router;
