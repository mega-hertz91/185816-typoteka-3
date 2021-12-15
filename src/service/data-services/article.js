'use strict';

const {
  findById,
  getNowDate
} = require(`../../utils`);
const {nanoid} = require(`nanoid`);

class Article {
  constructor(articles) {
    this._articles = articles;
  }

  getAll() {
    return this._articles;
  }

  getById(id) {
    const articles = this._articles;
    return findById(articles, id);
  }

  create(attributes) {
    const article = {
      id: nanoid(),
      title: attributes.title,
      description: attributes.description,
      announce: attributes.announce,
      createDate: getNowDate()
    };

    const articles = this._articles;
    articles.push(article);

    return article;
  }

  delete(id) {
    const articles = this._articles;
    const article = findById(articles, id);
    if (article.attributes) {
      articles.splice(article.index, 1);
      return article;
    } else {
      return false;
    }
  }

  update(attributes, id) {
    let article = findById(this._articles, id);
    if (article.attributes) {
      article.attributes.title = attributes.title ? attributes.title : article.attributes.title;
      article.attributes.description = attributes.description ? attributes.description : article.attributes.description;
      article.attributes.announce = attributes.announce ? attributes.announce : article.attributes.announce;

      const articles = this._articles;
      articles.splice(article.index, 1, article.attributes);
      return article;
    } else {
      return false;
    }
  }
}

module.exports = Article;
