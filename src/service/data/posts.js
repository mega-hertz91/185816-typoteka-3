'use strict';

const {
  DEFAULT_ENCODING
} = require(`../../constants`);

const {readFile} = require(`fs/promises`);
const path = require(`path`);
let data = [];

const getPosts = async () => {
  if (data.length > 0) {
    return data;
  } else {
    data = await readFile(path.join(path.dirname(__filename), `../../mock.json`), {encoding: DEFAULT_ENCODING});
    data = JSON.parse(data.slice());
    return data;
  }
};

module.exports = getPosts;
