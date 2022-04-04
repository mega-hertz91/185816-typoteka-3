'use strict';

const {
  ResponseStatus
} = require(`../../constants`);
const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const testDB = require(`../lib/test-db`);

const publicationsRouter = require(`./publications`);
const PublicationService = require(`../data-service/publication`);
const CommentService = require(`../data-service/comment`);

const categories = [`Автомобили`];

const createAPI = async () => {
  const app = express();
  app.use(express.json());

  const sequelize = new Sequelize(`sqlite::memory:`, {logging: false});
  await testDB(sequelize, {categories});
  publicationsRouter(app, new PublicationService(sequelize), new CommentService(sequelize));
  return app;
};

describe(`API returns publications list`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/publications`)
  });


  test(`Return all publications status 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

describe(`API returns publication by id`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/publications/1`)
  });


  test(`Return publication by id status 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

describe(`API returns not found publication by id`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .get(`/publications/111`)
  });


  test(`Return publication by id status 404`, () => expect(response.statusCode).toBe(ResponseStatus.NOT_FOUND));
});

describe(`API create publication`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .post(`/publications`)
      .send({
        title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        announce: `tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
        userId: 1,
        categories: [1]
      })
  });


  test(`Return create status 201`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS_CREATE));
});

describe(`API create publication negative scenario`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
      .post(`/publications`)
      .send({
        title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
        announce: `tLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt`
      })
  });


  test(`Return create status 400`, () => expect(response.statusCode).toBe(ResponseStatus.BAD_REQUEST));
});


