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

describe(`API returns articles based on search query`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Самый лучший музыкальный альбом этого год`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`W1FLyUKWnoUsfm8nUxRjj`));
});

test(`API returns code 404 if nothing is found`, () => {
    const app = createAPI();

    return request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(ResponseStatus.NOT_FOUND)
  }
);

test(`API returns 400 when query string is absent`,
  () => {
    const app = createAPI();

   return request(app)
      .get(`/search`)
      .expect(ResponseStatus.BAD_REQUEST)
  }
);
