'use client';

import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateTargetProfit } from '@/lib/calc';
import {
  formatCurrency,
  formatKRWConverted,
  formatPercent,
  parseNumericInput,
  getCurrencySymbol,
} from '@/lib/format';

type TargetMode = 'percent' | 'amount';

export default function TargetProfitCalculator() {
  const { market, fxRate } = useMarket();
  const [avgPrice, setAvgPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mode, setMode] = useState<TargetMode>('percent');
  const [targetValue, setTargetValue] = useState('');

  const result = useMemo(() => {
    return calculateTargetProfit(
      parseNumericInput(avgPrice),
      parseNumericInput(quantity),
      mode,
      parseNumericInput(targetValue)
    );
  }, [avgPrice, quantity, mode, targetValue]);

  const currencySymbol = getCurrencySymbol(market);
  const hasInput = avgPrice !== '' && quantity !== '' && targetValue !== '';

  return (
    <CalculatorCard
      title="Target Profit Calculator"
      description="Calculate the target price needed to achieve your desired profit (by % or amount)."
    >
      <div className="calculator-inputs">
        <NumberInput
          label="Average Buy Price"
          value={avgPrice}
          onChange={setAvgPrice}
          unit={currencySymbol}
          placeholder={market === 'KR' ? '50000' : '100.00'}
        />
        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          placeholder="100"
        />

        <div className="mode-toggle">
          <label className="mode-label">Target by:</label>
          <div className="mode-buttons">
            <button
              type="button"
              className={`mode-btn ${mode === 'percent' ? 'active' : ''}`}
              onClick={() => setMode('percent')}
            >
              Percentage
            </button>
            <button
              type="button"
              className={`mode-btn ${mode === 'amount' ? 'active' : ''}`}
              onClick={() => setMode('amount')}
            >
              Amount
            </button>
          </div>
        </div>

        {mode === 'percent' ? (
          <NumberInput
            label="Target Return %"
            value={targetValue}
            onChange={setTargetValue}
            unit="%"
            placeholder="20"
          />
        ) : (
          <NumberInput
            label="Target Profit Amount"
            value={targetValue}
            onChange={setTargetValue}
            unit={currencySymbol}
            placeholder={market === 'KR' ? '1000000' : '500'}
          />
        )}
      </div>

      {hasInput && result && (
        <div className="calculator-results">
          <div className="result-row highlight">
            <span className="result-label">Target Price</span>
            <span className="result-value">
              {formatCurrency(result.targetPrice, market)}
              {market === 'US' && (
                <span className="result-secondary">
                  {' '}({formatKRWConverted(result.targetPrice, fxRate)})
                </span>
              )}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Expected Profit</span>
            <span className="result-value profit">
              {formatCurrency(result.expectedProfit, market)}
              {market === 'US' && (
                <span className="result-secondary">
                  {' '}({formatKRWConverted(result.expectedProfit, fxRate)})
                </span>
              )}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Return %</span>
            <span className="result-value profit">
              {formatPercent(result.returnPercent)}
            </span>
          </div>
        </div>
      )}

      {hasInput && !result && (
        <div className="calculator-error">
          Please enter valid positive values.
        </div>
      )}

      <div className="calculator-example">
        <strong>Example:</strong> If you own 100 shares at{' '}
        {market === 'KR' ? '₩50,000' : '$100'} and want a 20% return, you need the stock
        to reach {market === 'KR' ? '₩60,000' : '$120'}.
      </div>
    </CalculatorCard>
  );
}
