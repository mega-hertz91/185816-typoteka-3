'use strict';

const {
  DEFAULT_PORT,
  Dir
} = require(`./constants`);
const express = require(`express`);
const app = express();
const path = require(`path`);

const indexRouter = require(`./routes/index`);
const authRouter = require(`./routes/auth`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);
const notFoundRouter = require(`./routes/not-found`);

app.disable(`x-powered-by`);

/**
 * Add static directories
 */
app.use(express.static(path.resolve(__dirname, Dir.PUBLIC)));
app.use(express.static(path.resolve(__dirname, Dir.UPLOAD)));


/**
 * Add app template engine pug
 */
app.set(`views`, `${__dirname}/templates`);
app.set(`view engine`, `pug`);

/**
 * Inject global middlewares
 */

/**
 * Use routes
 */
app.use(indexRouter);
app.use(authRouter);
app.use(myRouter);
app.use(articlesRouter);
app.use(categoriesRouter);
app.use(searchRouter);
app.use(notFoundRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server listen localhost:${DEFAULT_PORT}`);
});
