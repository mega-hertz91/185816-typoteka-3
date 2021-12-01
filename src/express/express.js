'use strict';

const express = require(`express`);
const app = express();
const DEFAULT_PORT = 8080;

const indexRouter = require(`./routes/index`);
const authRouter = require(`./routes/auth`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);
const searchRouter = require(`./routes/search`);

app.disable(`x-powered-by`);

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
