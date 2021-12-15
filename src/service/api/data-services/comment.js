'use strict';

const {
  findById,
  getNowDate
} = require(`../../../utils`);
const {nanoid} = require(`nanoid`);

class Comment {
  constructor(articles) {
    this._articles = articles;
  }

  async create(id, attributes) {
    let articles = await this._articles();
    const article = findById(articles, id);

    const comment = {
      id: nanoid(),
      title: attributes.title,
      avatar: attributes.avatar,
      author: attributes.author,
      text: attributes.text,
      createDate: getNowDate()
    };

    articles[article.index].comments.push(comment);

    return comment;
  }

  async delete(articleId, commentId) {
    let articles = await this._articles();
    const article = findById(articles, articleId);
    const comment = findById(article.attributes.comments, commentId);

    articles[article.index].comments.splice(comment.index, 1);

    return comment;
  }
}

module.exports = Comment;
