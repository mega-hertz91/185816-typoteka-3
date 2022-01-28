CREATE DATABASE typoteka
WITH
  OWNER = typoteka
  ENCODING = 'UTF8'
  TEMPLATE = template0
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE typoteka TO typoteka;

CREATE TABLE roles(
  id SERIAL PRIMARY KEY,
  name VARCHAR 255 NOT NULL
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR 255 NOT NULL,
  last_name VARCHAR 255 NOT NULL,
  password TEXT NOT NULL,
  avatar TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR 255 NOT NULL
)

CREATE TABLE publications(
  id
)



