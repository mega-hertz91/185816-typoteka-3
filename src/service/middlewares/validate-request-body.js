'use strict';

const {
  ResponseStatus
} = require(`../../constants`);

module.exports = (req, res, next) => {
  const attributes = Object.values(req.body);
  if (attributes.length === 0) {
    res
      .status(ResponseStatus.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
