CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  starts_on TEXT NOT NULL,
  ends_on TEXT NOT NULL CHECK (ends_on >= starts_on),
  note TEXT NOT NULL,
  created_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
