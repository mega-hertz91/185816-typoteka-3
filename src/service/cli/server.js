'use strict';

const {
  DEFAULT_PORT,
  Prefix
} = require(`../../constants`);

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const apiRoutes = require(`../api/index`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models/index`);

/**
 * Initialize models
 */

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      const port = await args.shift() || DEFAULT_PORT;
      defineModels(sequelize);
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
      await sequelize.sync();

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
       * Add middlewares
       */
      app.use((err, _req, _res, _next) => {
        logger.error(`An error occurred on processing request: ${err.message}`);
      });

      app.use((req, res, next) => {
        logger.debug(`Request on route ${req.url}`);
        res.on(`finish`, () => {
          logger.info(`Response status code ${res.statusCode}`);
        });
        next();
      });

      /**
       * Add routers
       */
      app.use(Prefix.API, apiRoutes);

      app.listen(port, (e) => {
        if (e) {
          return logger.err(`An error occurred on server creation: ${e.message}`);
        }

        logger.info(`Server started localhost:${port}`);
        return logger.info(`Connection to database established`);
      });
    } catch (e) {
      logger.error(`An error occurred: ${e.message}`);
      process.exit();
    }
  }
};
