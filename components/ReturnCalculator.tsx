'use client';

import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateReturn } from '@/lib/calc';
import { parseNumericInput } from '@/lib/format';

export default function ReturnCalculator() {
  const { market, fxRate } = useMarket();
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showFee, setShowFee] = useState(false);
  const [feePercent, setFeePercent] = useState('');

  const buy = parseNumericInput(buyPrice);
  const sell = parseNumericInput(sellPrice);
  const qty = parseNumericInput(quantity);
  const fee = parseNumericInput(feePercent);

  const hasInput = buy > 0 && sell > 0 && qty > 0;

  const result = useMemo(() => {
    if (!hasInput) return null;
    return calculateReturn(buy, sell, qty, showFee ? fee : 0);
  }, [hasInput, buy, sell, qty, showFee, fee]);

  // Determine profit or loss
  const isProfit = result && result.profitLoss > 0;
  const isLoss = result && result.profitLoss < 0;
  const isBreakeven = result && result.profitLoss === 0;

  // Format price based on market
  const formatPrice = (value: number) => {
    if (market === 'US') {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₩${Math.round(value).toLocaleString()}`;
  };

  // Format large numbers with appropriate suffix
  const formatAmount = (value: number) => {
    const absValue = Math.abs(value);
    if (market === 'US') {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    // Korean: show in 만원 if large enough
    if (absValue >= 10000) {
      const man = value / 10000;
      return `₩${man.toLocaleString('ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}만`;
    }
    return `₩${Math.round(value).toLocaleString()}`;
  };

  return (
    <CalculatorCard
      id="return"
      title="주식 수익률 계산기"
      description="매수가와 매도가를 입력하면 수익률을 바로 계산합니다."
    >
      <div className="calculator-inputs">
        <NumberInput
          label="매수가 (샀을 때)"
          value={buyPrice}
          onChange={setBuyPrice}
          unit={market === 'KR' ? '₩' : '$'}
          placeholder={market === 'KR' ? '50000' : '150.00'}
          trackingId={{ calculator: 'return', field: 'buy_price' }}
        />
        <NumberInput
          label="매도가 (팔 때)"
          value={sellPrice}
          onChange={setSellPrice}
          unit={market === 'KR' ? '₩' : '$'}
          placeholder={market === 'KR' ? '55000' : '165.00'}
          trackingId={{ calculator: 'return', field: 'sell_price' }}
        />
        <NumberInput
          label="수량"
          value={quantity}
          onChange={setQuantity}
          unit="주"
          placeholder="100"
          trackingId={{ calculator: 'return', field: 'quantity' }}
        />
      </div>

      {/* Results Section */}
      <div className="calculator-results">
        {/* HERO RESULT */}
        <div className="result-hero">
          {!hasInput ? (
            <div className="result-hero-empty">
              <span className="result-hero-icon">💰</span>
              <span className="result-hero-prompt">
                매수가와 매도가를 입력하면<br />수익률이 표시됩니다
              </span>
            </div>
          ) : result && (
            <>
              <div className="result-hero-header">
                <span
                  className="result-hero-badge"
                  data-direction={isProfit ? 'profit' : isLoss ? 'loss' : 'even'}
                >
                  {isProfit && '📈 수익'}
                  {isLoss && '📉 손실'}
                  {isBreakeven && '➡️ 본전'}
                </span>
              </div>
              <div
                className={`result-hero-value ${isProfit ? 'profit' : isLoss ? 'loss' : ''}`}
              >
                {isProfit && '+'}{formatAmount(result.profitLoss)}
                {market === 'US' && (
                  <span className="result-hero-sub">
                    {isProfit && '+'}₩{Math.round(result.profitLoss * fxRate).toLocaleString()}
                  </span>
                )}
              </div>
              <div
                className={`result-hero-percent-large ${isProfit ? 'profit' : isLoss ? 'loss' : ''}`}
              >
                {isProfit && '+'}{result.returnPercent.toFixed(2)}%
              </div>
            </>
          )}
        </div>

        {/* Details */}
        {hasInput && result && (
          <div className="result-group">
            <div className="result-row">
              <span className="result-label">총 매수금액</span>
              <span className="result-value">
                {market === 'US' ? (
                  <span className="result-dual">
                    <span className="result-primary">{formatPrice(result.totalBuy)}</span>
                    <span className="result-sub">₩{Math.round(result.totalBuy * fxRate).toLocaleString()}</span>
                  </span>
                ) : (
                  formatPrice(result.totalBuy)
                )}
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">총 매도금액</span>
              <span className="result-value">
                {market === 'US' ? (
                  <span className="result-dual">
                    <span className="result-primary">{formatPrice(result.totalSell)}</span>
                    <span className="result-sub">₩{Math.round(result.totalSell * fxRate).toLocaleString()}</span>
                  </span>
                ) : (
                  formatPrice(result.totalSell)
                )}
              </span>
            </div>
          </div>
        )}

        {/* Optional: Fee Section */}
        <div className="result-optional">
          {!showFee ? (
            <button
              type="button"
              className="result-optional-toggle"
              onClick={() => setShowFee(true)}
            >
              <span className="result-optional-icon">💸</span>
              <span className="result-optional-text">
                <strong>수수료 계산</strong>
                <br />
                증권사 수수료를 반영한 실수익을 계산해요
              </span>
              <span className="result-optional-arrow">→</span>
            </button>
          ) : (
            <div className="result-breakeven">
              <div className="result-breakeven-header">
                <span className="result-breakeven-title">수수료 계산</span>
                <button
                  type="button"
                  className="result-breakeven-close"
                  onClick={() => {
                    setShowFee(false);
                    setFeePercent('');
                  }}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="result-breakeven-input">
                <NumberInput
                  label="수수료율 (매수+매도 합산)"
                  value={feePercent}
                  onChange={setFeePercent}
                  unit="%"
                  placeholder="0.015"
                />
                <span className="fee-hint">
                  * 일반적으로 매수 0.015% + 매도 0.015% = 약 0.03%
                </span>
              </div>

              {hasInput && result && fee > 0 && (
                <div className="result-breakeven-rows">
                  <div className="result-row">
                    <span className="result-label">수수료</span>
                    <span className="result-value loss">
                      -{formatPrice(result.feeAmount)}
                    </span>
                  </div>
                  <div className="result-row result-row-highlight">
                    <span className="result-label">
                      <strong>실수익</strong>
                    </span>
                    <span
                      className={`result-value result-value-large ${
                        result.netProfitLoss > 0 ? 'profit' : result.netProfitLoss < 0 ? 'loss' : ''
                      }`}
                    >
                      {result.netProfitLoss > 0 && '+'}{formatAmount(result.netProfitLoss)}
                      <span className="result-percent-inline">
                        ({result.netProfitLoss > 0 && '+'}{result.netReturnPercent.toFixed(2)}%)
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contextual Tips */}
      {hasInput && result && (
        <div className="calculator-tip">
          {isProfit && result.returnPercent >= 10 && (
            <>
              <strong>💡 팁:</strong> 10% 이상 수익이라면 분할 매도를 고려해보세요.
              일부는 익절하고, 나머지는 더 높은 목표가를 노릴 수 있습니다.
            </>
          )}
          {isProfit && result.returnPercent < 10 && (
            <>
              <strong>💡 팁:</strong> 수익 중입니다. 목표 수익률에 도달했다면
              계획대로 매도하는 것이 좋습니다.
            </>
          )}
          {isLoss && result.returnPercent > -10 && (
            <>
              <strong>💡 팁:</strong> 소폭 손실입니다. 손절할지, 물타기로
              평균가를 낮출지 신중하게 판단하세요.
            </>
          )}
          {isLoss && result.returnPercent <= -10 && (
            <>
              <strong>💡 주의:</strong> 10% 이상 손실입니다.
              본전까지 {Math.abs(result.returnPercent / (1 + result.returnPercent / 100)).toFixed(1)}% 상승이 필요합니다.
            </>
          )}
          {isBreakeven && (
            <>
              <strong>💡 본전:</strong> 수익도 손실도 없습니다.
              수수료를 고려하면 소폭 손실일 수 있습니다.
            </>
          )}
        </div>
      )}
    </CalculatorCard>
  );
}
