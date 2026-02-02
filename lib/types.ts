export type Market = 'KR' | 'US';

export interface FXState {
  rate: number;
  lastUpdated: Date | null;
  source: 'api' | 'manual' | 'fallback';
  isLoading: boolean;
  error: string | null;
}

export interface MarketContextType {
  market: Market;
  setMarket: (market: Market) => void;
  fxRate: number;
  setFxRate: (rate: number) => void;
  fxState: FXState;
  fetchFxRate: () => Promise<void>;
  setManualFxRate: (rate: number) => void;
}

export interface LossRecoveryResult {
  lossPercent: number;
  requiredGainPercent: number;
}

export interface AverageDownResult {
  newAveragePrice: number;
  totalInvested: number;
  totalQuantity: number;
  requiredGainPercent: number;
}

export type AveragingDirection = 'down' | 'up' | 'same';

export interface AveragingResult {
  newAveragePrice: number;
  totalInvested: number;
  totalQuantity: number;
  direction: AveragingDirection;
  // Break-even metrics (only available if market price provided)
  breakEvenBefore: number | null;
  breakEvenAfter: number | null;
  breakEvenDelta: number | null;
}

export interface AveragePriceResult {
  averagePrice: number;
  totalQuantity: number;
  totalInvested: number;
}

export interface TargetProfitResult {
  targetPrice: number;
  expectedProfit: number;
  returnPercent: number;
}

export interface PriceQuantityRow {
  id: string;
  price: number;
  quantity: number;
}
