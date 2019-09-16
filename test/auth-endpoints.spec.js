const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Auth Endpoints`, function() {
  let db;
  const { testUsers } = helpers.makeInventoryFixtures();
  const testUser = testUsers[0];
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean up", () =>
    db.schema.raw("TRUNCATE TABLE stocked_users, stocked_items CASCADE")
  );
  afterEach("cleanup", () =>
    db.schema.raw("TRUNCATE TABLE stocked_users, stocked_items CASCADE")
  );
  describe(`POST /api/auth/login`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));
    const requiredFields = ["username", "password"];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];
        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`
          });
      });

      it(`responds with "Incorrect username or password" when bad username or password`, () => {
        const userInvalidUser = {
          username: "NotAUser",
          password: "Password123!"
        };
        return supertest(app)
          .post("/api/auth/login")
          .send(userInvalidUser)
          .expect(400, { error: "Incorrect username or password" });
      });

      it(`responds with "Incorrect username or password" when bad username or password`, () => {
        const userInvalidPass = {
          username: "Pip123",
          password: "incorrect"
        };
        return supertest(app)
          .post("/api/auth/login")
          .send(userInvalidPass)
          .expect(400, { error: "Incorrect username or password" });
      });

      it("responds with 200 and JWT auth token using secret when valid credentials", () => {
        const userValidCreds = {
          username: "Pip123",
          password: "Password123!"
        };

        const expectedToken = jwt.sign(
          { id: testUser.id },
          process.env.JWT_SECRET,
          { subject: testUser.username, algorithm: "HS256" }
        );
        return supertest(app)
          .post("/api/auth/login")
          .send(userValidCreds)
          .expect(200, {
            authToken: expectedToken,
            id: testUser.id
          });
      });
    });
  });
});
