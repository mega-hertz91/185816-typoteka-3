'use strict';

const {
  DEFAULT_COUNT,
  DATES,
  MULTIPLIER
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  readingFileByLine
} = require(`../../utils`);

const path = require(`path`);
const chalk = require(`chalk`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models/index`);
const Aliase = require(`../models/alias`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `cli`});

/**
 * Generate array articles depending on count
 *
 * @param {number} count
 * @param {array} titles
 * @param {array} sentences
 * @param {array} categories
 * @param users
 * @return {array}
 */

const generateArticles = (count, titles, sentences, categories, users) => (
  new Array(count * MULTIPLIER).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    description: shuffle(sentences).slice(1, 5).join(` `),
    createDate: DATES[getRandomInt(0, DATES.length - 1)],
    userId: getRandomInt(1, users.length - 1),
    // category: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

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

const generateComments = (count, users, publications, comments) => {
  return new Array(count * MULTIPLIER).fill({}).map(() => ({
    userId: getRandomInt(1, users.length - 1),
    publicationId: getRandomInt(1, publications.length - 1),
    message: comments[getRandomInt(0, comments.length - 1)]
  }));
};

/**
 * Initialization data-services
 *
 * @param {array} args
 */

const init = async (args) => {
  const [count] = args;
  const countItems = Number.parseInt(count, 10) || DEFAULT_COUNT;

  const {Category, Publication, User, Role, Comment} = defineModels(sequelize);

  try {
    const titles = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/titles.txt`));
    const sentences = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/sentences.txt`));
    const categories = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/categories.txt`));
    const comments = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/comments.txt`));
    const roles = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/roles.txt`));
    const names = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/names.txt`));
    const emails = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/emails.txt`));

    const users = generateUsers(countItems, roles, names, emails);
    const articles = generateArticles(countItems, titles, sentences, categories, users);
    const commentItems = generateComments(countItems, users,articles, comments);


    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
    await sequelize.sync({force: true});

    const rolesCreate = Role.bulkCreate(
        roles.map((role) => ({name: role}))
    );

    const categoriesCreate = Category.bulkCreate(
        categories.map((category) => ({name: category}))
    );

    const usersCreate = User.bulkCreate(
        users
    );

    const publicationsCreate = Publication.bulkCreate(
        articles
    );

    const commentsCreate = Comment.bulkCreate(
        commentItems
    );

    const promises = [rolesCreate, categoriesCreate, usersCreate, publicationsCreate, commentsCreate];

    await Promise.all(promises);

    console.log(chalk.green(`Create ${count ? count : `one`} items`));
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};

module.exports = {
  name: `--filldb`,
  run(args) {
    init(args);
  }
};
