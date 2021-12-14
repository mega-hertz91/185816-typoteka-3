'use strict';

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const apiRoutes = require(`../api/index`);

const {
  DEFAULT_PORT,
  Prefix
} = require(`../../constants`);


module.exports = {
  name: `--server`,
  async run(args) {
    try {
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
       * Add routers
       */
      app.use(Prefix.API, apiRoutes);

      app.listen(port, () => {
        console.log(`Server started localhost:${port}`);
      });
    } catch (e) {
      console.log(e);
      process.exit();
    }
  }
};
