'use strict';

const getRequestPath = (req, res) => {
  res.send(req.path);
};

const ensureArray = (value) => Array.isArray(value) ? value : [value];

module.exports = {
  getRequestPath,
  ensureArray
};
