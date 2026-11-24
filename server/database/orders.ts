import type { RentalOrder } from '#shared/rental-order';

export const insertOrderSql = `
  INSERT INTO orders (id, name, contact, starts_on, ends_on, note, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO NOTHING
`;

export const matchOrderSql = `
  SELECT id FROM orders
  WHERE id = ? AND name = ? AND contact = ? AND starts_on = ? AND ends_on = ? AND note = ?
`;

export function orderValues(order: RentalOrder): [string, string, string, string, string, string] {
  return [order.id, order.name, order.contact, order.startsOn, order.endsOn, order.note];
}
