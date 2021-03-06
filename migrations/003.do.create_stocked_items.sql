CREATE TABLE stocked_items (
  item_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  "name" TEXT NOT NULL, 
  user_id INTEGER REFERENCES stocked_users(id),
  "desc" TEXT,
  image_url TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  cost_per_unit NUMERIC NOT NULL,
  date_modified TIMESTAMP DEFAULT now() NOT NULL,
  unit TEXT NOT NULL,
  tag TEXT REFERENCES stocked_tags(name)
);

