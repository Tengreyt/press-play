import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type { H3Event } from 'h3';
import type { RentalOrder } from '#shared/rental-order';
import { insertOrderSql, matchOrderSql, orderValues } from './orders';

let connection: Promise<DatabaseSync> | undefined;

async function openDatabase(path: string): Promise<DatabaseSync> {
  const migration = await useStorage('assets:migrations').getItemRaw<string>('0000_orders.sql');
  if (!migration) {
    throw new Error('Missing orders database migration');
  }

  mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  try {
    db.exec('PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL;');
    db.exec(migration);
    return db;
  } catch (error) {
    db.close();
    throw error;
  }
}

export async function persistOrder(event: H3Event, order: RentalOrder): Promise<boolean> {
  connection ??= openDatabase(useRuntimeConfig(event).orderDatabasePath).catch((error: unknown) => {
    connection = undefined;
    throw error;
  });

  const db = await connection;
  const values = orderValues(order);
  db.prepare(insertOrderSql).run(...values, new Date().toISOString());
  return db.prepare(matchOrderSql).get(...values)?.id === order.id;
}
