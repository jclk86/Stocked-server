const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Tags endpoint", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after(`disconnect from db`, () => db.destroy());

  before(`clean up tags`, () =>
    db.schema.raw("TRUNCATE TABLE stocked_tags, stocked_items CASCADE")
  );

  afterEach(`clean up tags`, () =>
    db.schema.raw("TRUNCATE TABLE stocked_tags,  stocked_items CASCADE")
  );

  describe(`Tags Endpoints`, () => {
    context(`Given no tags`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/tags")
          .expect(200, []);
      });
    });
    context(`Given tags`, () => {
      const expectedTags = helpers.makeTagsArray();
      beforeEach(() => helpers.seedTags(db, expectedTags));
      it(`responds with 200 and gets tags from api`, () => {
        return supertest(app)
          .get("/api/tags")
          .expect(200, expectedTags);
      });
    });
  });
});
