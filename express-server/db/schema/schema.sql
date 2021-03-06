DROP TABLE IF EXISTS destinations CASCADE;
CREATE TABLE destinations (
  destination_id SERIAL PRIMARY KEY NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS trips CASCADE;
CREATE TABLE trips (
  trip_id SERIAL PRIMARY KEY NOT NULL,
  destination_id INTEGER REFERENCES destinations(destination_id) ON DELETE CASCADE,
  hotel_name VARCHAR(255) NOT NULL,
  hotel_address VARCHAR(255) NOT NULL,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  flight_cost INTEGER,
  hotel_cost INTEGER,
  created_at TIMESTAMP
);

DROP TABLE IF EXISTS activities CASCADE;
CREATE TABLE activities (
  activity_id SERIAL PRIMARY KEY NOT NULL,
  trip_id INTEGER REFERENCES trips(trip_id) ON DELETE CASCADE,
  date TIMESTAMP,
  activity_name VARCHAR(255) NOT NULL,
  activity_address TEXT,
  type VARCHAR(255),
  cost INTEGER
);

