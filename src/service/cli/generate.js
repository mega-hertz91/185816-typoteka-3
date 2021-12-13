'use strict';

const {
  FILE_NAME,
  DEFAULT_COUNT,
  DATES,
  DEFAULT_ENCODING
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const {writeFile} = require(`fs/promises`);
const path = require(`path`);
const chalk = require(`chalk`);
const {readingFileByLine} = require(`../../utils`);
const {nanoid} = require(`nanoid`);


/**
 * Generate array articles depending on count
 *
 * @param {number} count
 * @param {array} titles
 * @param {array} sentences
 * @param {array} categories
 * @return {array}
 */
const generateArticles = (count, titles, sentences, categories, comments) => (
  new Array(count).fill({}).map(() => ({
    id: nanoid(),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    description: shuffle(sentences).slice(1, 5).join(` `),
    createDate: DATES[getRandomInt(0, DATES.length - 1)],
    category: [categories[getRandomInt(0, categories.length - 1)]],
    comments: [{id: nanoid(), text: comments[getRandomInt(0, comments.length - 1)]}],
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

  try {
    const titles = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/titles.txt`));
    const sentences = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/sentences.txt`));
    const categories = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/categories.txt`));
    const comments = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/comments.txt`));
    const content = JSON.stringify(generateArticles(countArticles, titles, sentences, categories, comments));
    await writeFile(`${path.dirname(__dirname)}/../${FILE_NAME}`, content, {encoding: DEFAULT_ENCODING});
    console.log(chalk.green(`Create ${count ? count : `one`} items`));
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
