import type { Market } from './types';

/**
 * Format currency based on market
 * KRW: ₩1,234,567 (integer)
 * USD: $1,234.56 (2 decimals)
 */
export function formatCurrency(value: number, market: Market): string {
  if (!isFinite(value)) {
    return '—';
  }

  if (market === 'KR') {
    return `₩${Math.round(value).toLocaleString('ko-KR')}`;
  }

  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format KRW converted value (for US mode display)
 */
export function formatKRWConverted(usdValue: number, fxRate: number): string {
  if (!isFinite(usdValue) || !isFinite(fxRate)) {
    return '—';
  }
  const krwValue = usdValue * fxRate;
  return `₩${Math.round(krwValue).toLocaleString('ko-KR')}`;
}

/**
 * Format percentage with sign
 * +42.9%, -30.0%
 */
export function formatPercent(value: number, showSign = true): string {
  if (!isFinite(value)) {
    return '—';
  }

  const rounded = value.toFixed(1);
  if (showSign && value > 0) {
    return `+${rounded}%`;
  }
  return `${rounded}%`;
}

/**
 * Format number for display (quantity, generic numbers)
 */
export function formatNumber(value: number, decimals = 0): string {
  if (!isFinite(value)) {
    return '—';
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Parse numeric input safely
 * Returns 0 for invalid/empty input
 */
export function parseNumericInput(value: string): number {
  if (!value || value.trim() === '') {
    return 0;
  }
  // Remove commas and currency symbols
  const cleaned = value.replace(/[₩$,]/g, '').trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}

/**
 * Get currency unit symbol
 */
export function getCurrencySymbol(market: Market): string {
  return market === 'KR' ? '₩' : '$';
}
