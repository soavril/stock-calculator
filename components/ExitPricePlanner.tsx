'use client';

import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateTargetProfit } from '@/lib/calc';
import { parseNumericInput } from '@/lib/format';

type TargetMode = 'price' | 'percent';

export default function ExitPricePlanner() {
  const { market, fxRate } = useMarket();
  const [avgPrice, setAvgPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mode, setMode] = useState<TargetMode>('price');
  const [targetValue, setTargetValue] = useState('');

  const avg = parseNumericInput(avgPrice);
  const qty = parseNumericInput(quantity);
  const target = parseNumericInput(targetValue);

  const currencySymbol = market === 'KR' ? '₩' : '$';

  // Calculate based on mode
  const result = useMemo(() => {
    if (avg <= 0 || qty <= 0 || target <= 0) return null;

    if (mode === 'price') {
      // User enters target price directly
      const totalInvested = avg * qty;
      const exitValue = target * qty;
      const profit = exitValue - totalInvested;
      const returnPct = (profit / totalInvested) * 100;
      return {
        targetPrice: target,
        expectedProfit: profit,
        returnPercent: returnPct,
        totalInvested,
      };
    } else {
      // User enters target return %
      const calcResult = calculateTargetProfit(avg, qty, 'percent', target);
      if (!calcResult) return null;
      return {
        ...calcResult,
        totalInvested: avg * qty,
      };
    }
  }, [avg, qty, target, mode]);

  const hasValidInput = avg > 0 && qty > 0 && target > 0;

  // Format price based on market
  const formatPrice = (value: number) => {
    if (market === 'US') {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₩${Math.round(value).toLocaleString()}`;
  };

  // Dynamic summary
  const summaryText = useMemo(() => {
    if (!hasValidInput || !result) {
      return '포지션과 목표가를 입력하면 예상 수익을 확인할 수 있습니다.';
    }

    const targetFormatted = formatPrice(result.targetPrice);
    const profitFormatted = formatPrice(Math.abs(result.expectedProfit));

    if (result.expectedProfit > 0) {
      return `${targetFormatted}에 매도하면 ${profitFormatted} 수익 (+${result.returnPercent.toFixed(1)}%)`;
    } else if (result.expectedProfit < 0) {
      return `${targetFormatted}에 매도하면 ${profitFormatted} 손실 (${result.returnPercent.toFixed(1)}%). 더 높은 매도가를 고려해보세요.`;
    } else {
      return `${targetFormatted}에 매도하면 본전입니다.`;
    }
  }, [hasValidInput, result, market]);

  return (
    <CalculatorCard
      id="exit-planner"
      title="매도가 계획"
      description="목표 매도가에서 실제로 얼마를 벌거나 잃는지 확인하세요."
    >
      <div className="calculator-inputs">
        <NumberInput
          label="평균 매수가"
          value={avgPrice}
          onChange={setAvgPrice}
          unit={currencySymbol}
          placeholder={market === 'KR' ? '50000' : '5.00'}
        />
        <NumberInput
          label="보유 수량"
          value={quantity}
          onChange={setQuantity}
          placeholder="100"
          unit="주"
        />

        <div className="mode-toggle">
          <label className="mode-label">목표 설정 방식:</label>
          <div className="mode-buttons">
            <button
              type="button"
              className={`mode-btn ${mode === 'price' ? 'active' : ''}`}
              onClick={() => setMode('price')}
            >
              목표가
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === 'percent' ? 'active' : ''}`}
              onClick={() => setMode('percent')}
            >
              목표 수익률
            </button>
          </div>
        </div>

        {mode === 'price' ? (
          <NumberInput
            label="목표 매도가"
            value={targetValue}
            onChange={setTargetValue}
            unit={currencySymbol}
            placeholder={market === 'KR' ? '60000' : '6.00'}
          />
        ) : (
          <NumberInput
            label="목표 수익률"
            value={targetValue}
            onChange={setTargetValue}
            unit="%"
            placeholder="20"
          />
        )}
      </div>

      {/* Results - always rendered for CLS prevention */}
      <div className="calculator-results">
        <div className="result-row highlight">
          <span className="result-label">매도가</span>
          <span className="result-value">
            {!hasValidInput || !result ? (
              '—'
            ) : market === 'US' ? (
              <span className="result-dual">
                <span className="result-primary">${result.targetPrice.toFixed(2)}</span>
                <span className="result-sub">₩{Math.round(result.targetPrice * fxRate).toLocaleString()}</span>
              </span>
            ) : (
              `₩${Math.round(result.targetPrice).toLocaleString()}`
            )}
          </span>
        </div>

        <div className="result-row">
          <span className="result-label">
            {result && result.expectedProfit < 0 ? '예상 손실' : '예상 수익'}
          </span>
          <span
            className={`result-value ${
              result && result.expectedProfit > 0
                ? 'profit'
                : result && result.expectedProfit < 0
                  ? 'loss'
                  : ''
            }`}
          >
            {!hasValidInput || !result ? (
              '—'
            ) : market === 'US' ? (
              <span className="result-dual">
                <span className="result-primary">
                  {result.expectedProfit >= 0 ? '+' : ''}${result.expectedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="result-sub">
                  {result.expectedProfit >= 0 ? '+' : ''}₩{Math.round(result.expectedProfit * fxRate).toLocaleString()}
                </span>
              </span>
            ) : (
              `${result.expectedProfit >= 0 ? '+' : ''}₩${Math.round(result.expectedProfit).toLocaleString()}`
            )}
          </span>
        </div>

        <div className="result-row">
          <span className="result-label">수익률</span>
          <span
            className={`result-value ${
              result && result.returnPercent > 0
                ? 'profit'
                : result && result.returnPercent < 0
                  ? 'loss'
                  : ''
            }`}
          >
            {!hasValidInput || !result
              ? '—'
              : `${result.returnPercent >= 0 ? '+' : ''}${result.returnPercent.toFixed(1)}%`}
          </span>
        </div>

        <div className="result-row">
          <span className="result-label">본전 대비</span>
          <span className="result-value">
            {!hasValidInput || !result
              ? '—'
              : result.targetPrice > avg
                ? `+${(((result.targetPrice - avg) / avg) * 100).toFixed(1)}% 위`
                : result.targetPrice < avg
                  ? `${(((result.targetPrice - avg) / avg) * 100).toFixed(1)}% 아래`
                  : '본전'}
          </span>
        </div>
      </div>

      {/* Dynamic Summary */}
      <div className="calculator-example">{summaryText}</div>
    </CalculatorCard>
  );
}
