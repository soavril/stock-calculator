import type {
  LossRecoveryResult,
  AverageDownResult,
  AveragePriceResult,
  TargetProfitResult,
  PriceQuantityRow,
  AveragingResult,
  AveragingDirection,
} from './types';

/**
 * Loss Recovery Calculator
 * Calculates loss % and required gain % to break even
 */
export function calculateLossRecovery(
  averagePrice: number,
  currentPrice: number
): LossRecoveryResult | null {
  // Edge cases
  if (averagePrice <= 0 || currentPrice < 0) {
    return null;
  }
  if (currentPrice === 0) {
    // Total loss, infinite gain required
    return {
      lossPercent: 100,
      requiredGainPercent: Infinity,
    };
  }

  const lossPercent = (1 - currentPrice / averagePrice) * 100;
  const requiredGainPercent = (averagePrice / currentPrice - 1) * 100;

  return {
    lossPercent,
    requiredGainPercent,
  };
}

/**
 * Average Down Calculator
 * Calculates new average price and required gain after adding shares
 */
export function calculateAverageDown(
  currentAvgPrice: number,
  currentQty: number,
  additionalPrice: number,
  additionalQty: number,
  currentMarketPrice: number
): AverageDownResult | null {
  // Edge cases
  if (
    currentAvgPrice <= 0 ||
    currentQty <= 0 ||
    additionalPrice <= 0 ||
    additionalQty <= 0
  ) {
    return null;
  }

  const currentInvested = currentAvgPrice * currentQty;
  const additionalInvested = additionalPrice * additionalQty;
  const totalInvested = currentInvested + additionalInvested;
  const totalQuantity = currentQty + additionalQty;
  const newAveragePrice = totalInvested / totalQuantity;

  // Required gain to break even from current market price
  let requiredGainPercent = 0;
  if (currentMarketPrice > 0) {
    requiredGainPercent = (newAveragePrice / currentMarketPrice - 1) * 100;
  } else if (currentMarketPrice === 0) {
    requiredGainPercent = Infinity;
  }

  return {
    newAveragePrice,
    totalInvested,
    totalQuantity,
    requiredGainPercent: Math.max(0, requiredGainPercent),
  };
}

/**
 * Averaging Calculator (Down / Up)
 * Calculates new average and break-even changes when adding to position
 */
export function calculateAveraging(
  currentAvgPrice: number,
  currentQty: number,
  additionalPrice: number,
  additionalQty: number,
  currentMarketPrice?: number
): AveragingResult | null {
  if (
    currentAvgPrice <= 0 ||
    currentQty <= 0 ||
    additionalPrice <= 0 ||
    additionalQty <= 0
  ) {
    return null;
  }

  const currentInvested = currentAvgPrice * currentQty;
  const additionalInvested = additionalPrice * additionalQty;
  const totalInvested = currentInvested + additionalInvested;
  const totalQuantity = currentQty + additionalQty;
  const newAveragePrice = totalInvested / totalQuantity;

  // Determine direction
  let direction: AveragingDirection = 'same';
  if (additionalPrice < currentAvgPrice) {
    direction = 'down';
  } else if (additionalPrice > currentAvgPrice) {
    direction = 'up';
  }

  // Calculate break-even metrics if market price is provided
  let breakEvenBefore: number | null = null;
  let breakEvenAfter: number | null = null;
  let breakEvenDelta: number | null = null;

  if (currentMarketPrice && currentMarketPrice > 0) {
    // Break-even before: gain needed from market price to reach current avg
    breakEvenBefore = ((currentAvgPrice / currentMarketPrice) - 1) * 100;
    // Break-even after: gain needed from market price to reach new avg
    breakEvenAfter = ((newAveragePrice / currentMarketPrice) - 1) * 100;
    // Delta: how much the required gain changed (negative = easier)
    breakEvenDelta = breakEvenAfter - breakEvenBefore;
  }

  return {
    newAveragePrice,
    totalInvested,
    totalQuantity,
    direction,
    breakEvenBefore,
    breakEvenAfter,
    breakEvenDelta,
  };
}

/**
 * Average Price Calculator
 * Calculates weighted average across multiple buys
 */
export function calculateAveragePrice(
  rows: PriceQuantityRow[]
): AveragePriceResult | null {
  const validRows = rows.filter((r) => r.price > 0 && r.quantity > 0);

  if (validRows.length === 0) {
    return null;
  }

  let totalInvested = 0;
  let totalQuantity = 0;

  for (const row of validRows) {
    totalInvested += row.price * row.quantity;
    totalQuantity += row.quantity;
  }

  if (totalQuantity === 0) {
    return null;
  }

  return {
    averagePrice: totalInvested / totalQuantity,
    totalQuantity,
    totalInvested,
  };
}

/**
 * Target Profit Calculator
 * Calculates target price from either target % or target amount
 */
export function calculateTargetProfit(
  averagePrice: number,
  quantity: number,
  mode: 'percent' | 'amount',
  targetValue: number
): TargetProfitResult | null {
  // Edge cases
  if (averagePrice <= 0 || quantity <= 0 || targetValue < 0) {
    return null;
  }

  const totalInvested = averagePrice * quantity;
  let targetPrice: number;
  let expectedProfit: number;
  let returnPercent: number;

  if (mode === 'percent') {
    // targetValue is the desired return %
    returnPercent = targetValue;
    targetPrice = averagePrice * (1 + returnPercent / 100);
    expectedProfit = targetPrice * quantity - totalInvested;
  } else {
    // targetValue is the desired profit amount
    expectedProfit = targetValue;
    const targetTotal = totalInvested + expectedProfit;
    targetPrice = targetTotal / quantity;
    returnPercent = (expectedProfit / totalInvested) * 100;
  }

  return {
    targetPrice,
    expectedProfit,
    returnPercent,
  };
}
