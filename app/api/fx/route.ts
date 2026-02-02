import { NextResponse } from 'next/server';

// In-memory cache for FX rate
let cachedRate: number | null = null;
let cachedAt: number | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const DEFAULT_FX_RATE = 1350;

// Free API options (no key required):
// 1. exchangerate.host (may require key now)
// 2. Open Exchange Rates (limited free tier)
// 3. Frankfurter API (ECB data, free)
// We'll use Frankfurter as primary, with fallback

async function fetchFromFrankfurter(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://api.frankfurter.app/latest?from=USD&to=KRW',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.rates?.KRW ?? null;
  } catch {
    return null;
  }
}

async function fetchFromExchangeRateAPI(): Promise<number | null> {
  try {
    // Free tier, no key needed for basic conversion
    const res = await fetch(
      'https://open.er-api.com/v6/latest/USD',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.rates?.KRW ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();

  // Return cached value if still valid
  if (cachedRate !== null && cachedAt !== null) {
    const age = now - cachedAt;
    if (age < CACHE_DURATION_MS) {
      return NextResponse.json({
        rate: cachedRate,
        source: 'cache',
        cachedAt: cachedAt,
        expiresAt: cachedAt + CACHE_DURATION_MS,
      });
    }
  }

  // Try to fetch fresh rate
  let rate = await fetchFromFrankfurter();
  let source = 'frankfurter';

  // Fallback to alternative API
  if (rate === null) {
    rate = await fetchFromExchangeRateAPI();
    source = 'exchangerate-api';
  }

  // If all APIs fail, return fallback
  if (rate === null) {
    return NextResponse.json({
      rate: DEFAULT_FX_RATE,
      source: 'fallback',
      cachedAt: null,
      expiresAt: null,
      error: 'Failed to fetch live rate. Using default value.',
    });
  }

  // Update cache
  cachedRate = rate;
  cachedAt = now;

  return NextResponse.json({
    rate: rate,
    source: source,
    cachedAt: cachedAt,
    expiresAt: cachedAt + CACHE_DURATION_MS,
  });
}
