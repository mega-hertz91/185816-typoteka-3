'use strict';

const {writeFile} = require(`fs/promises`);
const path = require(`path`);
const chalk = require(`chalk`);

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


/**
 * Generate array articles depending on count
 *
 * @param {number} count
 * @return {array}
 */
const generateArticles = (count) => (
  new Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    createDate: DATES[getRandomInt(0, DATES.length - 1)],
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

/**
 * Initialization service
 *
 * @param {array} args
 */
const init = async (args) => {
  const [count] = args;
  const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
  const content = JSON.stringify(generateArticles(countArticles));

  try {
    await writeFile(`${path.dirname(__dirname)}/../${FILE_NAME}`, content, {encoding: `utf8`});
    console.log(chalk.green(`Success ${count ? count : `one`} items`));
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};

module.exports = {
  name: `--generate`,
  run(args) {
    init(args);
  }
};
