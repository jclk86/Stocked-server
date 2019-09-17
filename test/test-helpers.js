const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      username: "test-user-1",
      fullname: "Test user 1",
      email: "test@gmail.com",
      password: "Password123!",
      date_created: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      username: "test-user-2",
      fullname: "Test user 2",
      email: "test2@gmail.com",
      password: "pAssword123#",
      date_created: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      username: "test-user-3",
      fullname: "Test user 3",
      email: "test3@gmail.com",
      password: "paSSword123@",
      date_created: new Date("2029-01-22T16:28:32.615Z")
    },
    {
      username: "test-user-4",
      fullname: "Test user 4",
      email: "test4@gmail.com",
      password: "passWord123!",
      date_created: new Date("2029-01-22T16:28:32.615Z")
    }
  ];
}

function makeTagsArray() {
  return [
    {
      name: "proteins"
    },
    {
      name: "dairy"
    },
    {
      name: "beverages"
    },
    {
      name: "utensils"
    },
    {
      name: "condiments"
    },
    {
      name: "dishware"
    },
    {
      name: "spices"
    },
    {
      name: "fruits"
    },
    {
      name: "grains"
    }
  ];
}

function makeInventoryArray(users) {
  return [
    {
      user_id: users[0].id,
      name: "steak",
      desc: "this is steak",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "lbs",
      tag: "proteins"
    },
    {
      user_id: users[0].id,
      name: "Milk",
      desc: "this is milk",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "gal",
      tag: "dairy"
    },
    {
      user_id: users[0].id,
      name: "bread",
      desc: "this is bread",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "pcs",
      tag: "grains"
    },
    {
      user_id: users[1].id,
      name: "forks",
      desc: "these are forks",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 100,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "pcs",
      tag: "utensils"
    },
    {
      user_id: users[1].id,
      name: "ketchup",
      desc: "this is ketchup",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "btl",
      tag: "condiments"
    },
    {
      user_id: users[1].id,
      name: "apples",
      desc: "these are apples",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "pcs",
      tag: "fruits"
    },
    {
      user_id: users[2].id,
      name: "noodles",
      desc: "these are noodles",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "bags",
      tag: "grains"
    },
    {
      user_id: users[2].id,
      name: "plates",
      desc: "these are plates",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "pcs",
      tag: "dishware"
    },
    {
      user_id: users[2].id,
      name: "chocolate",
      desc: "this is chocolate",
      image_url:
        "https://images.pexels.com/photos/1246956/pexels-photo-1246956.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      quantity: 10,
      cost_per_unit: 7.99,
      date_modified: new Date("2029-01-22T16:28:32.615Z"),
      unit: "pcs",
      tag: "dairy"
    }
  ];
}

function makeExpectedInventory(users, items) {
  const expectedInventory = items.filter(item => item.user_id === userid);
  return expectedInventory.map(item => {
    return {
      item_id: item.item_id,
      user_id: item.user_id,
      name: item.name,
      desc: item.desc,
      image_url: item.image_url,
      quantity: item.quantity,
      cost_per_unit: item.cost_per_unit,
      date_modified: item.date_modified
    };
  });
}

function makeInventoryFixtures() {
  const testUsers = makeUsersArray();
  const testInventory = makeInventoryArray(testUsers);
  const testTags = makeTagsArray();
  return { testUsers, testInventory, testTags };
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256"
  });
  return `Bearer ${token}`;
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into("stocked_users").insert(preppedUsers);
}

function seedTags(db, tags) {
  const preppedTags = tags.map(tag => ({
    ...tag
  }));
  return db.into("stocked_tags").insert(preppedTags);
}

function seedItemsTable(db, items = [], users, tags) {
  return db.transaction(async trx => {
    await seedTags(trx, tags);
    await seedUsers(trx, users);
    await trx.into("stocked_items").insert(items);
    await trx.raw(`SELECT setval('stocked_items_id_seq', ?)`, [
      items[items.length - 1].id
    ]);
  });
}

module.exports = {
  seedTags,
  seedUsers,
  makeUsersArray,
  makeTagsArray,
  makeInventoryFixtures,
  makeExpectedInventory,
  makeAuthHeader,
  makeInventoryArray,
  seedItemsTable
};
