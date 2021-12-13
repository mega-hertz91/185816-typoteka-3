'use strict';

const {
  ResponseStatus
} = require(`../../constants`);

class PostsController {
  async getAll(req, res) {
    try {
      const content = await req.app.locals.posts;
      res.send(content);
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }

  async getById(req, res) {
    try {
      let content = await req.app.locals.posts;

      const index = content.filter((elem) => {
        return elem.id === req.params.id;
      });

      if (index[0]) {
        res.json(index[0]);
      } else {
        res
          .status(ResponseStatus.NOT_FOUND)
          .send(`Post not found`);
      }
    } catch (e) {
      res
        .status(ResponseStatus.INTERNAL_ERROR)
        .send(e.message);
    }
  }
}

module.exports = new PostsController();
