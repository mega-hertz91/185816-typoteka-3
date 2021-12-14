'use strict';

const {
  findById,
  getNowDate
} = require(`../../../utils`);
const {nanoid} = require(`nanoid`);
const articlesMock = require(`../data/posts`);

class Article {
  constructor() {
    this._articles = articlesMock;
  }

  async getAll() {
    return await this._articles();
  }

  async getById(id) {
    const articles = await this._articles();
    return findById(articles, id);
  }

  async create(attributes) {
    const article = {
      id: nanoid(),
      title: attributes.title,
      description: attributes.description,
      announce: attributes.announce,
      createDate: getNowDate()
    };

    const articles = await this._articles();
    articles.push(article);

    return article;
  }

  async delete(id) {
    const articles = await this._articles();
    const article = findById(articles, id);
    if (article.attributes) {
      articles.splice(article.index, 1);
      return article;
    } else {
      return false;
    }
  }

  async update(attributes, id) {
    let article = await findById(this._articles(), id);
    if (article.attributes) {
      article.attributes.title = attributes.title ? attributes.title : article.attributes.title;
      article.attributes.description = attributes.description ? attributes.description : article.attributes.description;
      article.attributes.announce = attributes.announce ? attributes.announce : article.attributes.announce;

      const articles = await this._articles();
      articles.splice(article.index, 1, article.attributes);
      return article;
    } else {
      return false;
    }
  }
}

module.exports = new Article();
