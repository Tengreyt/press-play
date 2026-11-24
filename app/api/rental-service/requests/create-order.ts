import { parse } from 'valibot';
import { rentalReceiptSchema } from '#shared/rental-order';
import type { RentalOrder, RentalReceipt } from '#shared/rental-order';

export async function createRentalOrder(order: RentalOrder): Promise<RentalReceipt> {
  const response = await $fetch<unknown>('/api/orders', { method: 'POST', body: order, retry: 0 });
  return parse(rentalReceiptSchema, response);
}
