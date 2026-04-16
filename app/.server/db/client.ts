import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const sqlite = new Database(process.env.DB_PATH ?? 'db.sqlite')

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    fields_json TEXT NOT NULL,
    bag TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    public_id TEXT NOT NULL UNIQUE,
    form_id INTEGER NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
    data_json TEXT NOT NULL,
    bag TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`)

export const db = drizzle(sqlite, { schema })
