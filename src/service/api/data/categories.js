'use strict';

const {
  readingFileByLine
} = require(`../../../utils`);

const path = require(`path`);
const {nanoid} = require(`nanoid`);
let data = [];

const getCategories = async () => {
  if (data.length > 0) {
    data = await readingFileByLine(path.join(path.dirname(__filename), `../../../../data/categories.txt`));
    data = data.map((item) => {
      return {
        id: nanoid(),
        name: item
      };
    });
    return data;
  } else {
    return data;
  }
};

module.exports = getCategories;
