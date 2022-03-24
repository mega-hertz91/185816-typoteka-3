'use strict';
const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);
const sequelize = require(`../lib/sequelize`);
const define = require(`../models/index`);

const categoriesRouter = require(`./categories`);
const CategoryService = require(`../data-service/category`);

const createAPI = () => {
  define(sequelize);
  const app = express();
  app.use(express.json());
  categoriesRouter(app, new CategoryService(sequelize));
  return app;
};

const app = createAPI();

describe(`API returns categories list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`)
  });


  test(`Return all categories status 200`, async () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

describe(`API returns category by id`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories/2`)
  });


  test(`Return category by ID status 200`, async () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`Checked name category`, async () => expect(JSON.parse(response.text).name !== undefined).toBe(true));
});

describe(`API request undefined category`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories/1234`)
  });


  test(`Return status 404`, async () => expect(response.statusCode).toBe(ResponseStatus.NOT_FOUND));
});
