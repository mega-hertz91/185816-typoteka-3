'use strict';

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const articlesRouter = require(`../routes/articles`);
const posts = require(`../data/posts`);

const {
  DEFAULT_PORT,
  Prefix,
  Entity
} = require(`../../constants`);


module.exports = {
  name: `--server`,
  async run(args) {
    const port = await args.shift() || DEFAULT_PORT;

    /**
     * Use middleware json and url encoder
     */
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    /**
     * Delete system headers
     */
    app.disable(`x-powered-by`);

    /**
     * set mock data
     */
    app.locals.posts = await posts();

    /**
     * Add routers
     */
    app.use(`${Prefix.API}${Entity.ARTICLES}`, articlesRouter);

    app.listen(port, () => {
      console.log(`Server started localhost:${port}`);
    });
  }
};
