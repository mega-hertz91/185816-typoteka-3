'use strict';

const {
  DEFAULT_PORT,
  Dir
} = require(`./constants`);
const express = require(`express`);
const app = express();
const path = require(`path`);
const mainRouter = require(`./routes/index`);

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
 * Inject router
 */
app.use(mainRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server listen localhost:${DEFAULT_PORT}`);
});
