const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Inventory Endpoints`, function() {
  let db;
  const {
    testUsers,
    testInventory,
    testTags
  } = helpers.makeInventoryFixtures();
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("cleanup stocked_items and stocked_users table", () =>
    db.schema.raw("TRUNCATE TABLE stocked_users, stocked_items CASCADE")
  );
  before("cleanup stocked_tags table", () =>
    db.schema.raw("TRUNCATE TABLE stocked_tags, stocked_items CASCADE")
  );
  afterEach("cleanup stocked_items and stocked_users table", () =>
    db.schema.raw("TRUNCATE TABLE stocked_users, stocked_items CASCADE")
  );
  afterEach("cleanup stocked_tags", () =>
    db.schema.raw("TRUNCATE TABLE stocked_tags, stocked_items CASCADE")
  );

  describe("Unauthorized requests", () => {
    beforeEach("insert inventory", () => {
      return db.into("stocked_users").insert(testUsers);
    });
    beforeEach("stocked_tags", () => {
      return db.into("stocked_tags").insert(testTags);
    });
    beforeEach("insert items", () => {
      return db.into("stocked_items").insert(testInventory);
    });
    it(`responds 401 Unauthorized for GET /api/user/users_id/inventory`, () => {
      const testUserId = testUsers[0].id;
      return supertest(app)
        .get(`/api/user/${testUserId}/inventory`)
        .expect(401, { error: "Missing bearer token" });
    });
  });

  describe(`PATCH /api/user/user_id/inventory/item_id`, () => {
    beforeEach("insert inventory", () => {
      return db.into("stocked_users").insert(testUsers);
    });
    beforeEach("stocked_tags", () => {
      return db.into("stocked_tags").insert(testTags);
    });
    beforeEach("insert items", () => {
      return db.into("stocked_items").insert(testInventory);
    });

    it(`updates an item, responding with updated item`, () => {
      const testUser = testUsers[0];
      const testItem = testInventory[0];
      const updatedItem = { name: "title update" };
      const expectedItem = {
        ...testItem[testItem.item_id - 1],
        ...updatedItem
      };
      return supertest(app)
        .patch(`/api/user/${testUser.id}/inventory/${testItem.item_id}`)
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .send(updatedItem)
        .expect(204)
        .then(res => {
          supertest(app)
            .get(`/api/user/${testUser.id}/inventory/${testItem.item_id}`)
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(expectedItem);
        });
    });
  });

  describe(`POST /api/user/user_id/inventory`, () => {
    beforeEach("insert inventory", () => {
      return db.into("stocked_users").insert(testUsers);
    });
    beforeEach("stocked_tags", () => {
      return db.into("stocked_tags").insert(testTags);
    });
    beforeEach("insert items", () => {
      return db.into("stocked_items").insert(testInventory);
    });

    it(`creates an item, responding 201 and the new item`, () => {
      this.retries(3);
      const testUser = testUsers[0];
      const newItem = {
        name: "Turkey",
        quantity: 5,
        unit: "lbs",
        cost_per_unit: "7.99",
        tag: testTags[0].name,
        image_url:
          "https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        desc: "test desc"
      };
      return supertest(app)
        .post("/api/user/${testUser.id}/inventory")
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .send(newItem)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property("item_id");
          expect(res.body.quantity).to.eql(newItem.quantity);
          expect(res.body.unit).to.eql(newItem.unit);
          expect(res.body.cost_per_unit).to.eql(newItem.cost_per_unit);
          expect(res.body.tag).to.eql(newItem.tag);
          expect(res.body.image_url).to.eql(newItem.image_url);
          expect(res.body.desc).to.eql(newItem.desc);
          expect(res.body).to.have.property("date_modified");
        });
    });
  });
});
