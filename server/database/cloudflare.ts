import type { H3Event } from 'h3';
import type { RentalOrder } from '#shared/rental-order';
import { insertOrderSql, matchOrderSql, orderValues } from './orders';

interface D1Statement {
  bind(...values: string[]): D1Statement;
}

interface OrdersDatabase {
  prepare(sql: string): D1Statement;
  batch(statements: D1Statement[]): Promise<{ results: { id: string }[] }[]>;
}

export async function persistOrder(event: H3Event, order: RentalOrder): Promise<boolean> {
  const database: OrdersDatabase | undefined = event.context.cloudflare?.env.DB;
  if (!database) {
    throw createError({ statusCode: 503, statusMessage: 'Order storage unavailable' });
  }

  const values = orderValues(order);
  const [, existing] = await database.batch([
    database.prepare(insertOrderSql).bind(...values, new Date().toISOString()),
    database.prepare(matchOrderSql).bind(...values),
  ]);
  return existing?.results[0]?.id === order.id;
}
