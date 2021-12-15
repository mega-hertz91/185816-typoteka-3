'use strict';
const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);

const category = require(`./categories`);
const CategoryService = require(`../data-services/category`);

const categories = [
  {
    "id": "ofh9lnBJkk12eIoSfYHFC",
    "name": "Деревья"
  },
  {
    "id": "W0z3LpvbIK2s4dQzjHGKG",
    "name": "За жизнь"
  },
  {
    "id": "MsDDjTD-Ac1CHeVZJqAh6",
    "name": "Без рамки"
  }
];

const createAPI = () => {
  const app = express();
  app.use(express.json());
  category(app, new CategoryService(categories));
  return app;
};

const app = createAPI();

describe(`API returns categories list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`ofh9lnBJkk12eIoSfYHFC`));
});

describe(`API returns category by id`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories/MsDDjTD-Ac1CHeVZJqAh6`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

test(`API returns code 404 if not found category`,
  () => request(app)
    .get(`/categories/MsDDjTD-Ac1CHeVZJqAh623`)
    .expect(ResponseStatus.NOT_FOUND)
);
