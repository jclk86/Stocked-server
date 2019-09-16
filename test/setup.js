process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";

require("dotenv").config();

process.env.TEST_DB_URL =
  process.env.TEST_DB_URL ||
  "postgresql://postgres:B3Th3B3st@localhost/stocked_test";

const { expect } = require("chai");
const supertest = require("supertest");

global.expect = expect;
global.supertest = supertest;
