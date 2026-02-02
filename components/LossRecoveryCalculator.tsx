'use client';

import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateLossRecovery } from '@/lib/calc';
import { parseNumericInput } from '@/lib/format';

// Reference table data: common loss percentages and required gains
const LOSS_REFERENCE = [
  { loss: 10, gain: 11.1 },
  { loss: 20, gain: 25.0 },
  { loss: 30, gain: 42.9 },
  { loss: 50, gain: 100.0 },
  { loss: 70, gain: 233.3 },
];

export default function LossRecoveryCalculator() {
  const { market, fxRate } = useMarket();
  const [avgPrice, setAvgPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');

  const avg = parseNumericInput(avgPrice);
  const current = parseNumericInput(currentPrice);

  const result = useMemo(() => {
    return calculateLossRecovery(avg, current);
  }, [avg, current]);

  const currencySymbol = market === 'KR' ? '₩' : '$';
  const hasValidInput = avg > 0 && current > 0;
  const hasLoss = hasValidInput && current < avg;
  const priceDifference = hasValidInput ? avg - current : 0;

  // Format price based on market
  const formatPrice = (value: number) => {
    if (market === 'US') {
      return `$${value.toFixed(2)}`;
    }
    return `₩${Math.round(value).toLocaleString()}`;
  };

  // Dynamic explanation based on inputs
  const dynamicExplanation = useMemo(() => {
    if (!hasValidInput || !result) {
      return '평균 매수가와 현재가를 입력하면 본전까지 필요한 수익률을 확인할 수 있습니다.';
    }

    const avgFormatted = formatPrice(avg);
    const currentFormatted = formatPrice(current);

    if (current >= avg) {
      return `현재가(${currentFormatted})가 평균 매수가(${avgFormatted}) 이상입니다. 이미 수익 구간입니다.`;
    }

    if (result.requiredGainPercent === Infinity) {
      return '현재가가 0이면 회복이 불가능합니다.';
    }

    return `${avgFormatted}에 매수해서 현재 ${currentFormatted}입니다. ${result.lossPercent.toFixed(1)}% 손실 중이며, 본전이 되려면 현재가에서 +${result.requiredGainPercent.toFixed(1)}% 상승해야 합니다.`;
  }, [hasValidInput, result, avg, current, market]);

  return (
    <CalculatorCard
      id="loss-recovery"
      title="손실 회복 계산기"
      description="현실 직시: 손실에서 회복하려면 얼마나 올라야 하는지 확인하세요."
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
          label="현재가"
          value={currentPrice}
          onChange={setCurrentPrice}
          unit={currencySymbol}
          placeholder={market === 'KR' ? '40000' : '4.00'}
        />
      </div>

      {/* Results area - always rendered to prevent CLS */}
      <div className="calculator-results">
        {/* 1. Loss % */}
        <div className="result-row">
          <span className="result-label">현재 손실률</span>
          <span className={`result-value ${hasLoss ? 'loss' : ''}`}>
            {!hasValidInput
              ? '—'
              : hasLoss
                ? `-${result!.lossPercent.toFixed(1)}%`
                : '손실 없음'}
          </span>
        </div>

        {/* 2. Required Gain % */}
        <div className="result-row highlight">
          <span className="result-label">본전까지 필요 수익률</span>
          <span className="result-value">
            {!hasValidInput
              ? '—'
              : !hasLoss
                ? '0%'
                : result!.requiredGainPercent === Infinity
                  ? '∞'
                  : `+${result!.requiredGainPercent.toFixed(1)}%`}
          </span>
        </div>

        {/* 3. Break-even Price */}
        <div className="result-row">
          <span className="result-label">본전가</span>
          <span className="result-value">
            {!hasValidInput ? '—' : (
              market === 'US' ? (
                <span className="result-dual">
                  <span className="result-primary">${avg.toFixed(2)}</span>
                  <span className="result-sub">₩{Math.round(avg * fxRate).toLocaleString()}</span>
                </span>
              ) : (
                `₩${Math.round(avg).toLocaleString()}`
              )
            )}
          </span>
        </div>

        {/* 4. Price Difference Needed */}
        <div className="result-row">
          <span className="result-label">필요 상승폭</span>
          <span className="result-value">
            {!hasValidInput
              ? '—'
              : priceDifference <= 0
                ? formatPrice(0)
                : market === 'US' ? (
                  <span className="result-dual">
                    <span className="result-primary">${priceDifference.toFixed(2)}</span>
                    <span className="result-sub">₩{Math.round(priceDifference * fxRate).toLocaleString()}</span>
                  </span>
                ) : (
                  `₩${Math.round(priceDifference).toLocaleString()}`
                )}
          </span>
        </div>
      </div>

      {/* Reference Table */}
      <div className="reference-table-container">
        <p className="reference-table-title">손실률 vs 회복에 필요한 수익률</p>
        <table className="reference-table">
          <thead>
            <tr>
              <th>손실</th>
              {LOSS_REFERENCE.map((item) => (
                <td key={item.loss}>-{item.loss}%</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>필요 수익</th>
              {LOSS_REFERENCE.map((item) => (
                <td key={item.loss}>+{item.gain.toFixed(1)}%</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dynamic explanation */}
      <div className="calculator-example">
        {dynamicExplanation}
      </div>
    </CalculatorCard>
  );
}
