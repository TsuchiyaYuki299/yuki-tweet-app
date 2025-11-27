DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);