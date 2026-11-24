import * as v from 'valibot';

const calendarDate = v.pipe(
  v.string(),
  v.isoDate('Выбери дату в календаре.'),
  v.check((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Такой даты нет в календаре.'),
);

export const rentalOrderSchema = v.pipe(
  v.object({
    id: v.pipe(v.string(), v.uuid()),
    name: v.pipe(v.string(), v.trim(), v.minLength(2, 'Укажи имя.'), v.maxLength(80)),
    contact: v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(48),
      v.check((value) => {
        const digits = value.replace(/\D/g, '');
        const isPhone = /^\+?[\d ()-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
        return isPhone || /^@[a-zA-Z][\w]{4,31}$/.test(value);
      }, 'Укажи телефон или ник в Telegram, начиная с @.'),
    ),
    startsOn: calendarDate,
    endsOn: calendarDate,
    note: v.pipe(v.string(), v.trim(), v.maxLength(600, 'В комментарии может быть до 600 символов.')),
    contactConsent: v.literal(true, 'Подтверди согласие, чтобы мы могли ответить на заявку.'),
  }),
  v.forward(v.partialCheck([['startsOn'], ['endsOn']], ({ startsOn, endsOn }) => endsOn >= startsOn,
    'Дата окончания должна быть в день начала аренды или позже.'), ['endsOn']),
);

export const rentalReceiptSchema = v.object({ id: v.pipe(v.string(), v.uuid()) });

export type RentalOrder = v.InferOutput<typeof rentalOrderSchema>;
export type RentalReceipt = v.InferOutput<typeof rentalReceiptSchema>;

export function todayInMoscow(): string {
  return new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
}
