import { Currency } from '../types/store';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; label: string }> = {
  YER: { rate: 1, symbol: 'ر.ي', label: 'ريال يمني' },
  SAR: { rate: 0.0075, symbol: 'ر.س', label: 'ريال سعودي' },
  USD: { rate: 0.002, symbol: '$', label: 'دولار أمريكي' },
};

export function formatPrice(amountInYer: number, currency: Currency = 'YER'): string {
  const config = CURRENCY_RATES[currency];
  const converted = amountInYer * config.rate;
  
  if (currency === 'USD') {
    return `${config.symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}`;
  }
  
  return `${Math.round(converted).toLocaleString('ar-SA')} ${config.symbol}`;
}

export function convertAmount(amountInYer: number, currency: Currency): number {
  return Math.round(amountInYer * CURRENCY_RATES[currency].rate);
}
