BEGIN;

TRUNCATE stocked_users, stocked_tags, stocked_items RESTART IDENTITY CASCADE;

INSERT INTO stocked_users (username, fullname, "password", email)
VALUES
  ('Pip123', 'Bob Smith', 'Password123', 'BSmith@gmail.com'),
  ('Cow_Moo', 'Sally Sue', 'p4assWord321', 'SallyS@gmail.com'),
  ('Manager1', 'Jack Wag', 'passW3rd', 'JWag@gmail.com');


INSERT INTO stocked_tags("name")
VALUES
  ('proteins'),
  ('beverages'),
  ('condiments'),
  ('dairy'),
  ('dishware'),
  ('utensils'),
  ('spices'),
  ('fruits'),
  ('grains');


INSERT INTO stocked_items("name", "desc", image_url, quantity, cost_per_unit, unit, tag, user_id)
VALUES
  ('Steaks', '60-day dry-aged', 'https://images.pexels.com/photos/1539684/pexels-photo-1539684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 10, 34.99, 'amt','proteins', 1),
  ('Apples', 'red delicious apples for pies', 'https://images.pexels.com/photos/39803/pexels-photo-39803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 40, 1.99, 'lbs', 'fruits', 1),
  ('Jasmin Rice', 'long-grain Jasmin rice', 'https://images.pexels.com/photos/724300/pexels-photo-724300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 80, .99, 'lbs', 'grains', 1),
  ('Tumeric', 'for roasted chicken', 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 10, 2.00, 'quartz', 'spices', 2 ),
  ('Coca-cola', 'bottled & made with sugar cane', 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 36, 1.50, 'bottles', 'beverages', 2),
  ('Milk', 'Lactaid, whole milk', 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 5, 5.99, 'gallons', 'dairy', 2),
  ('Forks', 'stainless steel', 'https://images.pexels.com/photos/262896/pexels-photo-262896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 100, 1.29, 'pieces', 'utensils', 3),
  ('Plates', 'blue patterned', 'https://images.pexels.com/photos/1907642/pexels-photo-1907642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 30, 6.99, 'pieces', 'dishware', 3),
  ('Ketchup', 'Heinz', 'https://images.pexels.com/photos/161025/tomatoes-ketchup-sad-food-161025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 20, 2.99, 'bottles', 'condiments', 3);

COMMIT;
