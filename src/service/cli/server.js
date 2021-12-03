'use strict';

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const postsRouter = require(`../routes/posts`);

const {
  DEFAULT_PORT,
  PREFIX_ROUTER_POSTS
} = require(`../../constants`);


module.exports = {
  name: `--server`,
  run(args) {
    const port = args.shift() || DEFAULT_PORT;

    /**
     * Use middleware json and url encoder
     */
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.use(PREFIX_ROUTER_POSTS, postsRouter);

    app.listen(port, () => {
      console.log(`Server started localhost:${port}`);
    });
  }
};
