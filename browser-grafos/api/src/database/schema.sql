CREATE DATABASE IF NOT EXISTS bar_browser;

USE DATABASE bar_browser;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS sites;

CREATE TABLE IF NOT EXISTS sites (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  url VARCHAR NOT NULL,
  favicon_url VARCHAR NOT NULL,
  title VARCHAR NOT NULL UNIQUE,
  description VARCHAR NOT NULL
);

DROP TABLE IF EXISTS links;

CREATE TABLE IF NOT EXISTS links (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  origin_id UUID,
  destiny_id UUID,
  FOREIGN KEY(origin_id) REFERENCES sites(id),
  FOREIGN KEY(destiny_id) REFERENCES sites(id)
);