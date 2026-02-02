'use client';

import { useState, useMemo, useCallback } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateAveragePrice } from '@/lib/calc';
import {
  formatCurrency,
  formatKRWConverted,
  parseNumericInput,
  getCurrencySymbol,
} from '@/lib/format';
import type { PriceQuantityRow } from '@/lib/types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export default function AveragePriceCalculator() {
  const { market, fxRate } = useMarket();
  const [rows, setRows] = useState<PriceQuantityRow[]>([
    { id: generateId(), price: 0, quantity: 0 },
    { id: generateId(), price: 0, quantity: 0 },
  ]);
  const [inputValues, setInputValues] = useState<Record<string, { price: string; quantity: string }>>({});

  const result = useMemo(() => {
    return calculateAveragePrice(rows);
  }, [rows]);

  const updateRow = useCallback((id: string, field: 'price' | 'quantity', value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    const numericValue = parseNumericInput(value);
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: numericValue } : row
      )
    );
  }, []);

  const addRow = useCallback(() => {
    const newId = generateId();
    setRows((prev) => [...prev, { id: newId, price: 0, quantity: 0 }]);
  }, []);

  const removeRow = useCallback((id: string) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
    setInputValues((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [rows.length]);

  const currencySymbol = getCurrencySymbol(market);
  const hasValidInput = rows.some((r) => r.price > 0 && r.quantity > 0);

  return (
    <CalculatorCard
      title="Average Price Calculator"
      description="Calculate the weighted average price across multiple buy orders."
    >
      <div className="calculator-rows">
        {rows.map((row, index) => (
          <div key={row.id} className="calculator-row-group">
            <span className="row-number">#{index + 1}</span>
            <NumberInput
              label="Price"
              value={inputValues[row.id]?.price ?? ''}
              onChange={(val) => updateRow(row.id, 'price', val)}
              unit={currencySymbol}
              placeholder={market === 'KR' ? '50000' : '100.00'}
            />
            <NumberInput
              label="Quantity"
              value={inputValues[row.id]?.quantity ?? ''}
              onChange={(val) => updateRow(row.id, 'quantity', val)}
              placeholder="100"
            />
            {rows.length > 1 && (
              <button
                type="button"
                className="row-remove-btn"
                onClick={() => removeRow(row.id)}
                aria-label="Remove row"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="add-row-btn" onClick={addRow}>
        + Add Another Buy
      </button>

      {hasValidInput && result && (
        <div className="calculator-results">
          <div className="result-row highlight">
            <span className="result-label">Average Price</span>
            <span className="result-value">
              {formatCurrency(result.averagePrice, market)}
              {market === 'US' && (
                <span className="result-secondary">
                  {' '}({formatKRWConverted(result.averagePrice, fxRate)})
                </span>
              )}
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Quantity</span>
            <span className="result-value">{result.totalQuantity.toLocaleString()}</span>
          </div>
          <div className="result-row">
            <span className="result-label">Total Invested</span>
            <span className="result-value">
              {formatCurrency(result.totalInvested, market)}
              {market === 'US' && (
                <span className="result-secondary">
                  {' '}({formatKRWConverted(result.totalInvested, fxRate)})
                </span>
              )}
            </span>
          </div>
        </div>
      )}

      <div className="calculator-example">
        <strong>Example:</strong> If you bought 100 shares at{' '}
        {market === 'KR' ? '₩50,000' : '$100'} and 50 shares at{' '}
        {market === 'KR' ? '₩40,000' : '$80'}, your weighted average is{' '}
        {market === 'KR' ? '₩46,667' : '$93.33'}.
      </div>
    </CalculatorCard>
  );
}
