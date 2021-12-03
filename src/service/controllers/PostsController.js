'use strict';

const {readFile} = require(`fs/promises`);
const path = require(`path`);

const {
  DEFAULT_ENCODING,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR
} = require(`../../constants`);

class PostsController {
  async getAll(req, res) {
    try {
      let content = await readFile(path.join(path.dirname(__filename), `../../mock.json`), {encoding: DEFAULT_ENCODING});
      content = JSON.parse(content);
      res.json(content);
    } catch (e) {
      res.json([]);
    }
  }

  async getById(req, res) {
    try {
      let content = await readFile(path.join(path.dirname(__filename), `../../mock.json`), {encoding: DEFAULT_ENCODING});
      content = JSON.parse(content);
      if (content[req.params.id]) {
        res.json(content[req.params.id]);
      } else {
        res
          .status(STATUS_NOT_FOUND)
          .send(`Post not found`);
      }
    } catch (e) {
      res
        .status(STATUS_INTERNAL_ERROR)
        .send(`Data not found`);
    }
  }
}

module.exports = new PostsController();
