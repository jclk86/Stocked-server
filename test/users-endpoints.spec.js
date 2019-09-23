const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Users Endpoints`, function() {
  let db;
  const { testUsers } = helpers.makeInventoryFixtures();
  const testUser = testUsers[0];
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
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

  describe(`POST /api/register`, () => {
    context(`User registration validation`, () => {
      beforeEach("insert users", () => helpers.seedUsers(db, testUsers));
      const requiredFields = ["username", "password", "fullname", "email"];
      requiredFields.forEach(field => {
        const registerAttemptBody = {
          username: "test_username",
          password: "test_password123",
          email: "testEmail@gmail.com",
          fullname: "test fullname"
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];

          return supertest(app)
            .post("/api/register")
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`
            });
        });

        it(`responds 400 'Password must be longer than 8 characters' when password is short`, () => {
          const userShortPassword = {
            username: "testusername",
            password: "1234567",
            email: "testemail@gmail.com",
            fullname: "test fullname"
          };
          return supertest(app)
            .post("/api/register")
            .send(userShortPassword)
            .expect(400, {
              error: `Password must be longer than 8 characters`
            });
        });

        it(`responds 400 'Password must be less than 72 characters' when password is long`, () => {
          const userLongPassword = {
            username: "testusername",
            password: "*".repeat(73),
            email: "testemail@gmail.com",
            fullname: "test fullname"
          };
          return supertest(app)
            .post("/api/register")
            .send(userLongPassword)
            .expect(400, { error: `Password must be less than 72 characters` });
        });

        it(`responds 400 error when password starts with spaces`, () => {
          const userPasswordEndsSpaces = {
            username: "testusername",
            password: "1Aa!2BbH@ ",
            email: "testemail@gmail.com",
            fullname: "test fullname"
          };
          return supertest(app)
            .post("/api/register")
            .send(userPasswordEndsSpaces)
            .expect(400, {
              error: `Password must not start or end with empty space`
            });
        });

        it(`responds 400 error when password isn't complex enough`, () => {
          const userPasswordNotComplex = {
            username: "testusername",
            password: "password",
            email: "testemail@gmail.com",
            fullname: "test fullname"
          };
          return supertest(app)
            .post("/api/register")
            .send(userPasswordNotComplex)
            .expect(400, {
              error: `Password must contain one upper case, lower case, number and special character`
            });
        });

        it(`responds 400 'Username already taken' when username isn't unique`, () => {
          const duplicateUser = {
            username: testUser.user_name,
            password: "11AAaa!!",
            fullname: "test full_name",
            email: "testmail@gmail.com"
          };
          return supertest(app)
            .post("/api/register")
            .send(duplicateUser)
            .expect(400, { error: `Missing 'username' in request body` });
        });
      });

      context(`Happy path`, () => {
        it(`responds 201, serialized user, storing bcryped password`, () => {
          const newUser = {
            username: "GhostPepper",
            password: "Password123#",
            fullname: "Bob Smith",
            email: "testmail@gmail.com"
          };
          return supertest(app)
            .post("/api/register")
            .send(newUser)
            .expect(201)
            .expect(res => {
              expect(res.body).to.have.property("id");
              expect(res.body.username).to.eql(newUser.username);
              expect(res.body.fullname).to.eql(newUser.fullname);
              expect(res.body.email).to.eql(newUser.email);
              expect(res.body).to.have.property("password");
              expect(res.header.location).to.eql(
                `/api/register/${res.body.id}/inventory`
              );
              expect(res.body).to.have.property("date_created");
            })
            .expect(res =>
              db
                .from("stocked_users")
                .select("*")
                .where({ id: res.body.id })
                .first()
                .then(row => {
                  expect(row.username).to.eql(newUser.username);
                  expect(row.fullname).to.eql(newUser.fullname);
                  expect(row.email).to.eql(newUser.email);
                  const expectedDate = new Date(
                    res.body.date_created
                  ).toLocaleString();
                  const actualDate = new Date(
                    row.date_created
                  ).toLocaleString();
                  expect(actualDate).to.eql(expectedDate);

                  return bcrypt.compare(newUser.password, row.password);
                })
                .then(compareMatch => {
                  expect(compareMatch).to.be.true;
                })
            );
        });
      });
    });
  });
});
