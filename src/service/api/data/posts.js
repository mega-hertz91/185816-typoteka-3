'use strict';

const {
  DEFAULT_ENCODING
} = require(`../../../constants`);

const {readFile} = require(`fs/promises`);
const path = require(`path`);
let data = [];

const getPosts = async () => {
  if (data.length > 0) {
    return data;
  } else {
    data = await readFile(path.join(path.dirname(__filename), `../../../mock.json`), {encoding: DEFAULT_ENCODING});
    const content = data.slice();
    return JSON.parse(content);
  }
};

module.exports = getPosts;
