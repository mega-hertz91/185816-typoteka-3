'use strict';

const {
  findById,
  getNowDate
} = require(`../../utils`);
const {nanoid} = require(`nanoid`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  create(id, attributes) {
    const article = findById(this._articles, id);

    const comment = {
      id: nanoid(),
      title: attributes.title,
      avatar: attributes.avatar,
      author: attributes.author,
      text: attributes.text,
      createDate: getNowDate()
    };

    this._articles[article.index].comments.push(comment);

    return comment;
  }

  delete(articleId, commentId) {
    const article = findById(this._articles, articleId);
    const comment = findById(article.attributes.comments, commentId);

    this._articles[article.index].comments.splice(comment.index, 1);

    return comment;
  }
}

module.exports = CommentService;
