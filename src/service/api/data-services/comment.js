'use strict';

const {
  findById,
  getNowDate
} = require(`../../../utils`);
const {nanoid} = require(`nanoid`);

class Comment {
  create(req) {
    let content = req.app.locals.posts;
    const article = findById(content, req.params.articleId);

    const comment = {
      id: nanoid(),
      titleArticle: req.body.titleArticle,
      avatar: req.body.avatar,
      author: req.body.author,
      text: req.body.text,
      createDate: getNowDate()
    };

    req.app.locals.posts[article.index].comments.push(comment);

    return comment;
  }

  delete(req) {
    let content = req.app.locals.posts;
    const article = findById(content, req.params.articleId);
    console.log(article);
    const comment = findById(article.attributes.comments, req.params.commentId);
    console.log(req.app.locals.posts[article.index].comments);

    req.app.locals.posts[article.index].comments.splice(comment.index, 1);

    return comment;
  }
}

module.exports = new Comment();
