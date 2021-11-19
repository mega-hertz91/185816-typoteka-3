'use strict';

const fs = require(`fs`);
const path = require(`path`);

const {
  CATEGORIES,
  SENTENCES,
  TITLES,
  FILE_NAME,
  DEFAULT_COUNT,
  DATES
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const generateArticles = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    createDate: DATES[getRandomInt(0, DATES.length - 1)],
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateArticles(countArticles));

    try {
      fs.writeFileSync(`${path.dirname(__dirname)}/../${FILE_NAME}`, content, {encoding: `utf-8`});
    } catch (e) {
      console.log(e);
    }
  }
};
