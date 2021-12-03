'use strict';

const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);

const {
  DEFAULT_PORT,
  DEFAULT_ENCODING
} = require(`../../constants`);
const {readFile} = require(`fs/promises`);
const path = require(`path`);

module.exports = {
  name: `--server`,
  run(args) {
    const port = args.shift() || DEFAULT_PORT;

    /**
     * Use middleware json and url encoder
     */
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.get(`/posts`, async (req, res) => {
      try {
        const content = await readFile(path.join(path.dirname(__filename), `../../mock.json`), {encoding: DEFAULT_ENCODING});
        res.json(JSON.parse(content));
      } catch (e) {
        res.json([]);
      }
    });

    app.listen(port, () => {
      console.log(`Server started localhost:${port}`);
    });
  }
};
