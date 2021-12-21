'use strict';

const {
  ResponseStatus
} = require(`../../constants`);

module.exports = (req, res, next) => {
  if (!req.query.query) {
    res
      .status(ResponseStatus.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
