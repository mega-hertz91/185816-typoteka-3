'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  getAll(query) {
    const regExp = new RegExp(query, `g`, `i`);
    return this._articles.filter((item) => {
      const matches = item.title.match(regExp);
      return matches !== null;
    });
  }
}

module.exports = SearchService;
