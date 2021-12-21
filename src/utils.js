'use strict';

const {readFile} = require(`fs/promises`);
const {DEFAULT_ENCODING} = require(`./constants`);

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


module.exports = {
  shuffle,
  getRandomInt,
  readingFileByLine,
  findById,
  getNowDate
};
