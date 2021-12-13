'use strict';

const {
  findById,
  getNowDate
} = require(`../../utils`);
const {nanoid} = require(`nanoid`);

class Article {

  static create(req) {
    const article = {
      id: nanoid(),
      title: req.body.title,
      description: req.body.description,
      announce: req.body.announce,
      createDate: getNowDate()
    };

    req.app.locals.posts.push(article);

    return article;
  }

  static delete(req) {
    let content = req.app.locals.posts;
    const article = findById(content, req.params.articleId);
    if (article.attributes) {
      req.app.locals.posts.splice(article.index, 1);
      return article;
    } else {
      return false;
    }
  }

  static update(req) {
    let content = req.app.locals.posts;
    let article = findById(content, req.params.articleId);
    if (article.attributes) {
      article.attributes.title = req.body.title ? req.body.title : article.attributes.title;
      article.attributes.description = req.body.description ? req.body.description : article.attributes.description;
      article.attributes.announce = req.body.announce ? req.body.announce : article.attributes.announce;

      content.splice(article.index, 1, article.attributes);
      return article;
    } else {
      return false;
    }
  }
}

module.exports = Article;
