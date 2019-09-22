BEGIN;
-- $2a$12$D4.IrSWGkcMCbbzSJ0KfIOT5sdAPH4ssgs9MpuesfgIwHlVJXMriG
TRUNCATE stocked_users, stocked_tags, stocked_items RESTART IDENTITY CASCADE;

INSERT INTO stocked_users (username, fullname, "password", email)
VALUES
  ('Pip123', 'Bob Smith', '$2a$12$D4.IrSWGkcMCbbzSJ0KfIOT5sdAPH4ssgs9MpuesfgIwHlVJXMriG', 'BSmith@gmail.com'), 
  ('Cow_Moo', 'Sally Sue', '$2a$12$j0kP69qBqyetvE9NIuNzG.2ScRBydc1FhT5iGWIiBMN9LIkD9mgqe', 'SallyS@gmail.com'),
  ('Manager1', 'Jack Wag', '$2a$12$dfTM0zGYg2b4gG6.21C1oeriE1/POMhzt3cY28mE4yYcldNDfWObS', 'JWag@gmail.com');


INSERT INTO stocked_tags("name")
VALUES
  ('Proteins'),
  ('Beverages'),
  ('Sauces'),
  ('Dairy'),
  ('Dishware'),
  ('Utensils'),
  ('Seasoning'),
  ('Fruits'),
  ('Grains'),
  ('Cookware');


INSERT INTO stocked_items("name", "desc", image_url, quantity, cost_per_unit, unit, tag, user_id)
VALUES
  ('Steaks', '60-day dry-aged', 'https://images.pexels.com/photos/1539684/pexels-photo-1539684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 10, 34.99, 'amt','Proteins', 1),
  ('Apples', 'Red delicious apples for pies', 'https://images.pexels.com/photos/39803/pexels-photo-39803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 40, 1.99, 'lbs', 'Fruits', 1),
  ('Jasmin Rice', 'Long-grain Jasmin rice', 'https://images.pexels.com/photos/724300/pexels-photo-724300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 80, .99, 'lbs', 'Grains', 1),
  ('Tumeric', 'For roasted chicken', 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 10, 2.00, 'qt', 'Seasoning', 2 ),
  ('Coca-cola', 'Bottled & made with sugar cane', 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 3, 1.50, 'dz', 'Beverages', 2),
  ('Milk', 'Lactaid, whole milk', 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 5, 5.99, 'gal', 'Dairy', 2),
  ('Forks', 'Stainless steel', 'https://images.pexels.com/photos/262896/pexels-photo-262896.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 100, 1.29, 'pcs', 'Utensils', 3),
  ('Plates', 'Blue patterned', 'https://images.pexels.com/photos/1907642/pexels-photo-1907642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 30, 6.99, 'pcs', 'Dishware', 3),
  ('Ketchup', 'Heinz', 'https://images.pexels.com/photos/161025/tomatoes-ketchup-sad-food-161025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 20, 2.99, 'btls', 'Sauces', 3),
  ('Wok', 'Carbon steel', 'https://images.pexels.com/photos/1537166/pexels-photo-1537166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 2, 56.99, 'pcs', 'Cookware', 1);

COMMIT;

