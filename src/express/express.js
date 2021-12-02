'use strict';

const {
  DEFAULT_PORT,
  STATIC_DIR
} = require(`./constants`);
const express = require(`express`);
const app = express();

const indexRouter = require(`./routes/index`);
const authRouter = require(`./routes/auth`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);

app.disable(`x-powered-by`);

/**
 * Add static directory
 */
app.use(express.static(`${__dirname}/${STATIC_DIR}`));

/**
 * Use routes
 */
app.use(indexRouter);
app.use(authRouter);
app.use(myRouter);
app.use(articlesRouter);
app.use(categoriesRouter);
app.use(searchRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server listen localhost:${DEFAULT_PORT}`);
});
