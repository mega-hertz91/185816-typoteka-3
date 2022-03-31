'use strict';

const {
  DEFAULT_PORT,
  Dir
} = require(`./constants`);
const express = require(`express`);
const app = express();
const path = require(`path`);
const mainRouter = require(`./routes/index`);
const session = require(`express-session`);
const sequelize = require(`../service/lib/sequelize`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const {SESSION_SECRET} = process.env;
if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}


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
 * Add database
 */
const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 180000,
  checkExpirationInterval: 60000
});

sequelize.sync({});

/**
 * Inject global middlewares
 */
app.use(session({
  secret: SESSION_SECRET,
  store: mySessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
}));

/**
 * Inject router
 */
app.use(mainRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Server listen localhost:${DEFAULT_PORT}`);
});
