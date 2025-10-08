CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  balance NUMERIC(12, 2) DEFAULT 0
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  details TEXT,
  amount NUMERIC(12, 2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  account_id INT REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE triggers (
  id SERIAL PRIMARY KEY,
  description TEXT,
  amount NUMERIC(12, 2) NOT NULL,
  operator TEXT CHECK (operator IN ('==', '>', '<', 'between')) NOT NULL,
  range_min NUMERIC(12, 2),
  range_max NUMERIC(12, 2),
  account_id INT REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  trigger_id INT REFERENCES triggers(id)
);


