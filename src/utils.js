'use strict';

const {
  DEFAULT_ENCODING,
  DATES
} = require(`./constants`);
const {readFile} = require(`fs/promises`);

/**
 * Shuffle items in array
 *
 * @param {array} items
 * @return {array}
 */
const shuffle = (items) => {
  const someArray = items.slice();

  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};


/**
 * Generate random integer
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Read file
 *
 * @param {string} dirFile
 */

const readingFileByLine = async (dirFile) => {
  let content = await readFile(dirFile, {encoding: DEFAULT_ENCODING});
  content = content.split(`\n`);
  content.pop();

  return content;
};

/**
 * Filtered by id
 *
 * @param {array} items
 * @param {string} id
 */

const findById = (items, id) => {
  let i;
  const item = items.filter((elem, index) => {
    if (elem.id === id) {
      i = index;
      return elem;
    } else {
      return false;
    }
  });

  return {
    index: i,
    attributes: item.shift()
  };
};

/**
 *
 * @return {string}
 */
const getNowDate = () => {
  const date = new Date(Date.now());
  return date.toLocaleDateString(`ru`);
};

/**
 * Generate array articles depending on count
 *
 * @param {number} count
 * @param {array} titles
 * @param {array} sentences
 * @param {array} categories
 * @param {array} users
 * @param {array} comments
 * @return {array}
 */
const generateArticles = (count, titles, sentences, categories, users, comments) => (
  new Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    description: shuffle(sentences).slice(1, 5).join(` `),
    createDate: DATES[getRandomInt(0, DATES.length - 1)],
    userId: getRandomInt(1, users.length - 1),
    comments: [{userId: getRandomInt(1, users.length - 1), message: comments[getRandomInt(0, comments.length - 1)]}],
  }))
);

/**
 * Generate array users depending on count
 *
 * @param {int} count
 * @param {array} roles
 * @param {array} names
 * @param {array} emails
 * @return {array}
 */
const generateUsers = (count, roles, names, emails) => {
  return new Array(count).fill({}).map((item, index) => ({
    firstName: names[getRandomInt(0, names.length - 1)],
    lastName: names[getRandomInt(0, names.length - 1)],
    email: names[getRandomInt(0, emails.length - 1)] + index,
    avatar: `avatar-1.png`,
    password: `password`,
    roleId: getRandomInt(1, roles.length - 1),
  }));
};

module.exports = {
  shuffle,
  getRandomInt,
  readingFileByLine,
  findById,
  getNowDate,
  generateArticles,
  generateUsers
};
