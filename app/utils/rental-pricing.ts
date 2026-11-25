const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export const dailyRentalPrice = 1000;
export const weeklyRentalRate = { days: 7, duration: '7 суток', total: 6000 } as const;

export const rentalRates = [
  { days: 1, duration: '1 сутки', total: dailyRentalPrice },
  { days: 2, duration: '2 суток', total: 1800 },
  { days: 3, duration: '3 суток', total: 2700 },
  { days: 4, duration: '4 суток', total: 3600 },
  { days: 5, duration: '5 суток', total: 4500 },
  { days: 6, duration: '6 суток', total: 5400 },
  weeklyRentalRate,
] as const;

export function formatRentalPrice(total: number): string {
  return rubles.format(total);
}
