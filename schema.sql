CREATE
DATABASE typoteka
WITH
  OWNER = typoteka
  ENCODING = 'UTF8'
  TEMPLATE = template0
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  CONNECTION LIMIT = -1;

GRANT ALL
ON DATABASE typoteka TO typoteka;

CREATE TABLE roles
(
  id   SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users
(
  id         SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name  VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   TEXT    NOT NULL,
  avatar     TEXT    NOT NULL,
  role_id    INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE categories
(
  id   SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE publications
(
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  announce    TEXT NOT NULL,
  description TEXT NOT NULL,
  public_date DATE DEFAULT ('now'),
  preview     TEXT NOT NULL
);

CREATE TABLE comments
(
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL,
  publication_id INTEGER NOT NULL,
  message        TEXT    NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (publication_id) REFERENCES publications (id)
);

CREATE TABLE publication_categories
(
  id SERIAL PRIMARY KEY,
  publication_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (publication_id) REFERENCES publications(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON publications(title);

