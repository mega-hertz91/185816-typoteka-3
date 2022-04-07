'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const testDB = require(`../lib/test-db`);

const categoriesRouter = require(`./categories`);
const CategoryService = require(`../data-service/category`);

const categories = [`Автомобили`];

const createAPI = async () => {
  const app = express();
  app.use(express.json());

  const sequelize = new Sequelize(`sqlite::memory:`, {logging: false});
  await testDB(sequelize, {categories});
  categoriesRouter(app, new CategoryService(sequelize));
  return app;
};

describe(`API returns comments list`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/comments`)
  });


  test(`Return all comments status 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

