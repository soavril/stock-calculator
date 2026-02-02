'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Market, MarketContextType, FXState } from './types';

const MarketContext = createContext<MarketContextType | null>(null);

const DEFAULT_FX_RATE = 1350;

const initialFxState: FXState = {
  rate: DEFAULT_FX_RATE,
  lastUpdated: null,
  source: 'fallback',
  isLoading: false,
  error: null,
};

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarket] = useState<Market>('KR');
  const [fxState, setFxState] = useState<FXState>(initialFxState);

  const fetchFxRate = useCallback(async () => {
    setFxState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch('/api/fx');
      if (!res.ok) {
        throw new Error('Failed to fetch FX rate');
      }

      const data = await res.json();

      setFxState({
        rate: data.rate,
        lastUpdated: data.cachedAt ? new Date(data.cachedAt) : new Date(),
        source: data.source === 'fallback' ? 'fallback' : 'api',
        isLoading: false,
        error: data.error || null,
      });
    } catch (err) {
      setFxState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch exchange rate. Using manual input.',
        source: 'fallback',
      }));
    }
  }, []);

  const setManualFxRate = useCallback((rate: number) => {
    if (rate > 0) {
      setFxState({
        rate,
        lastUpdated: new Date(),
        source: 'manual',
        isLoading: false,
        error: null,
      });
    }
  }, []);

  // Legacy setFxRate for backward compatibility
  const setFxRate = useCallback((rate: number) => {
    setManualFxRate(rate);
  }, [setManualFxRate]);

  // Auto-fetch FX rate when switching to US market
  useEffect(() => {
    if (market === 'US' && fxState.source === 'fallback' && !fxState.lastUpdated) {
      fetchFxRate();
    }
  }, [market, fxState.source, fxState.lastUpdated, fetchFxRate]);

  return (
    <MarketContext.Provider
      value={{
        market,
        setMarket,
        fxRate: fxState.rate,
        setFxRate,
        fxState,
        fetchFxRate,
        setManualFxRate,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket(): MarketContextType {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within MarketProvider');
  }
  return context;
}
