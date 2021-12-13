'use strict';

const {
  readingFileByLine
} = require(`../../utils`);

const path = require(`path`);
const {nanoid} = require(`nanoid`);

const getCategories = async () => {
  let data = await readingFileByLine(path.join(path.dirname(__filename), `../../../data/categories.txt`));
  data = data.map((item) => {
    return {
      id: nanoid(),
      name: item
    };
  });
  return data;
};

module.exports = getCategories;
