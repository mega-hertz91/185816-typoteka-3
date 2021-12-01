'use strict';

const getRequestPath = (req, res) => {
  res.send(req.path);
};

module.exports = {
  getRequestPath
};
