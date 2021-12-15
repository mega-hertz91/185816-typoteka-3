'use strict';
const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-services/search`);

const createAPI = () => {
  const app = express();
  const articlesMock = require(`../../mock.json`);
  app.use(express.json());
  search(app, new DataService(articlesMock));
  return app;
};

const app = createAPI();

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Обзор `
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`u4P6tgLb4t-Y3Aoe18fIh`));
});

test(`API returns code 404 if nothing is found`,
  () => request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`
    })
    .expect(ResponseStatus.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
  () => request(app)
    .get(`/search`)
    .expect(ResponseStatus.BAD_REQUEST)
);
