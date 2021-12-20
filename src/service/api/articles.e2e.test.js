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

/**
 * Testing get all comments by article id
 */

describe(`API get all comments by article id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/W1FLyUKWnoUsfm8nUxRjj/comments`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

test(`API returns code 404 if not found comments by article`, () => {
    const app = createAPI();

    return request(app)
      .get(`/articles/MsDDjTD-Ac1CHeVZJqAh6/comments`)
      .expect(ResponseStatus.NOT_FOUND)
  }
);

/**
 * Testing create comments by article id
 */

describe(`API create comment by article id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/W1FLyUKWnoUsfm8nUxRjj/comments`)
      .send({
        title: "new article",
        author: "ibabushkin",
        text: "new my comment"
      })
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS_CREATE));
});

test(`API returns code 400 bad request in create comment`, () => {
    const app = createAPI();

    return request(app)
      .post(`/articles/W1FLyUKWnoUsfm8nUxRjj/comments`)
      .send({})
      .expect(ResponseStatus.BAD_REQUEST)
  }
);

/**
 * Testing delete comment by article id
 */

describe(`API delete comment by article id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/W1FLyUKWnoUsfm8nUxRjj/comments/b9OI6FfegJXfnHP0fefJk`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

test(`API returns code 404 not found comment`, () => {
    const app = createAPI();

    return request(app)
      .delete(`/articles/W1FLyUKWnoUsfm8nUxRjj/comments/b9OI6FfegJXfnHP0fefJR`)
      .expect(ResponseStatus.NOT_FOUND)
  }
);

/**
 * Testing get all
 */
describe(`API returns articles list`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`W1FLyUKWnoUsfm8nUxRjj`));
});

/**
 * Testing get by id
 */
describe(`API returns article by id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/W1FLyUKWnoUsfm8nUxRjj`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});


/**
 * Testing get by id
 */
test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .get(`/articles/MsDDjTD-Ac1CHeVZJqAh6`)
    .expect(ResponseStatus.NOT_FOUND)
});

/**
 * Testing create new article
 */
describe(`API create article`, () => {
  const app = createAPI();
  let response;

  const newArticle = {
    title: "My article",
    description: "This is my new article"
  };

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle)
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS_CREATE));
});


test(`API returns code 400 bad request`, () => {
    const app = createAPI();

    return request(app)
      .post(`/articles`)
      .send({})
      .expect(ResponseStatus.BAD_REQUEST)
  }
);

/**
 * Testing delete article by id
 */
describe(`API delete article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/W1FLyUKWnoUsfm8nUxRjj`)
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.SUCCESS));
});

test(`API returns code 404 if not found article`, () => {
    const app = createAPI();

    return request(app)
      .get(`/articles/MsDDjTD-Ac1CHeVZJqAh6`)
      .expect(ResponseStatus.NOT_FOUND)
  }
);

/**
 * Update article by id
 */
describe(`API delete article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/W1FLyUKWnoUsfm8nUxRjj`)
      .send({
        title: "New title for article"
      })
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(ResponseStatus.NOT_FOUND));
});


test(`API returns code 400 bad request`, () => {
    const app = createAPI();

    return request(app)
      .put(`/articles/W1FLyUKWnoUsfm8nUxRjj`)
      .send({})
      .expect(ResponseStatus.BAD_REQUEST)
  }
);

test(`API returns code 404 if not found article`, () => {
    const app = createAPI();

    return request(app)
      .get(`/articles/MsDDjTD-Ac1CHeVZJqAh6`)
      .expect(ResponseStatus.NOT_FOUND)
  }
);


