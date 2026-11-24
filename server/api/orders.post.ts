import { safeParse } from 'valibot';
import { rentalOrderSchema, todayInMoscow } from '#shared/rental-order';
import type { RentalReceipt } from '#shared/rental-order';
import { persistOrder } from '#order-database';

export default defineEventHandler(async (event): Promise<RentalReceipt> => {
  if (getHeader(event, 'sec-fetch-site') === 'cross-site') {
    throw createError({ statusCode: 403, statusMessage: 'Cross-origin order submission' });
  }

  const contentType = getHeader(event, 'content-type')?.split(';')[0];
  if (contentType !== 'application/json') {
    throw createError({ statusCode: 415, statusMessage: 'Expected JSON' });
  }

  const maxBytes = 8 * 1024;
  if (Number(getHeader(event, 'content-length')) > maxBytes) {
    throw createError({ statusCode: 413, statusMessage: 'Order body too large' });
  }

  const body = await readBody<unknown>(event);
  const result = safeParse(rentalOrderSchema, body);
  if (!result.success || result.output.startsOn < todayInMoscow()) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid rental order' });
  }

  if (!await persistOrder(event, result.output)) {
    throw createError({ statusCode: 409, statusMessage: 'Order ID already in use' });
  }

  setResponseStatus(event, 201);
  return { id: result.output.id };
});
