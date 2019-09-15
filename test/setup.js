const { expect } = require("chai");
const supertest = require("supertest");

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret";
process.env.JWT_EXPIRY = "3m";

global.expect = expect;
global.supertest = supertest;

//see secure login 5 in curriculum for what's needed in this file for testing
