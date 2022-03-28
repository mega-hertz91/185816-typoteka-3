'use strict';

const {
  DEFAULT_COUNT
} = require(`../../constants`);

const {
  generateArticles,
  generateUsers,
  readingFileByLine
} = require(`../../utils`);

const path = require(`path`);
const chalk = require(`chalk`);

const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models/index`);
const Alias = require(`../models/alias`);
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `cli`});

/**
 * Initialization data-services
 *
 * @param {array} args
 */

const init = async (args) => {
  const [count] = args;
  const countItems = Number.parseInt(count, 10) || DEFAULT_COUNT;

  const {Category, Publication, User, Role} = defineModels(sequelize);

  try {
    const titles = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/titles.txt`));
    const sentences = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/sentences.txt`));
    const categories = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/categories.txt`));
    const comments = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/comments.txt`));
    const roles = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/roles.txt`));
    const names = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/names.txt`));
    const emails = await readingFileByLine(path.join(path.dirname(__dirname), `/../../data/emails.txt`));

    const users = generateUsers(countItems, roles, names, emails);
    const articles = generateArticles(countItems, titles, sentences, categories, users, comments);


    logger.info(`Trying to connect to database...`);
    await sequelize.authenticate();
    await sequelize.sync({force: true});

    await Role.bulkCreate(
        roles.map((role) => ({name: role}))
    );

    await Category.bulkCreate(
        categories.map((category) => ({name: category}))
    );

    await User.bulkCreate(
        users
    );

    const articlePromises = articles.map(async (article) => {
      await Publication.create(article, {include: Alias.COMMENTS});
    });

    await Promise.all(articlePromises);


    console.log(chalk.green(`Create ${count ? count : `one`} items`));
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

module.exports = {
  name: `--filldb`,
  run(args) {
    init(args);
  }
};
