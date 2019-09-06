CREATE TABLE user_items (
  user_id INTEGER REFERENCES stocked_users(id),
  item_id INTEGER REFERENCES stocked_items(id),
  PRIMARY KEY (user_id, item_id)
);