'use strict';
const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const ArticleService = require(`../data-services/article`);
const CommentService = require(`../data-services/comment`);

const createAPI = () => {
  const app = express();
  const articlesMock = require(`../../mock.json`);
  app.use(express.json());
  articles(app, new ArticleService(articlesMock), new CommentService(articlesMock));
  return app;
};

const app = createAPI();

describe(`API returns articles list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`u4P6tgLb4t-Y3Aoe18fIh`));
});

describe(`API returns article by id`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/u4P6tgLb4t-Y3Aoe18fIh`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

test(`API returns code 404 if not found category`,
  () => request(app)
    .get(`/categories/MsDDjTD-Ac1CHeVZJqAh6`)
    .expect(ResponseStatus.NOT_FOUND)
);
