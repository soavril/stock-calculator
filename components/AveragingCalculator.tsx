'use client';

import { useState, useMemo } from 'react';
import CalculatorCard from './CalculatorCard';
import NumberInput from './NumberInput';
import { useMarket } from '@/lib/MarketContext';
import { calculateAveraging } from '@/lib/calc';
import { parseNumericInput } from '@/lib/format';

type InvestmentCurrency = 'USD' | 'KRW';

// Format number with thousand separators
function formatWithCommas(value: string): string {
  if (!value) return '';
  const parts = value.split('.');
  const formatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.length > 1 ? `${formatted}.${parts[1]}` : formatted;
}

export default function AveragingCalculator() {
  const { market, fxRate } = useMarket();
  const [currentAvgPrice, setCurrentAvgPrice] = useState('');
  const [currentQty, setCurrentQty] = useState('');
  const [additionalPrice, setAdditionalPrice] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentCurrency, setInvestmentCurrency] = useState<InvestmentCurrency>('KRW');
  const [marketPrice, setMarketPrice] = useState('');
  const [showMarketPrice, setShowMarketPrice] = useState(false);

  const avgPrice = parseNumericInput(currentAvgPrice);
  const qty = parseNumericInput(currentQty);
  const addPrice = parseNumericInput(additionalPrice);
  const investAmt = parseNumericInput(investmentAmount);
  const mktPrice = parseNumericInput(marketPrice);

  // Calculate quantity from investment amount
  const calculatedQty = useMemo(() => {
    if (market === 'KR') {
      return investAmt;
    }

    if (addPrice <= 0 || investAmt <= 0) return 0;

    if (investmentCurrency === 'USD') {
      return Math.floor(investAmt / addPrice);
    } else {
      const usdAmount = investAmt / fxRate;
      return Math.floor(usdAmount / addPrice);
    }
  }, [market, addPrice, investAmt, investmentCurrency, fxRate]);

  // Basic inputs check (for required results)
  const addQty = market === 'KR' ? investAmt : calculatedQty;
  const hasBasicInput = avgPrice > 0 && qty > 0 && addPrice > 0 && addQty > 0;
  const hasMarketPrice = showMarketPrice && mktPrice > 0;

  // Calculate result
  const result = useMemo(() => {
    if (!hasBasicInput) return null;
    return calculateAveraging(
      avgPrice,
      qty,
      addPrice,
      addQty,
      hasMarketPrice ? mktPrice : undefined
    );
  }, [hasBasicInput, avgPrice, qty, addPrice, addQty, hasMarketPrice, mktPrice]);

  // Direction text
  const directionInfo = useMemo(() => {
    if (!result) return null;

    if (result.direction === 'down') {
      return { text: '물타기', emoji: '📉', color: 'down' };
    } else if (result.direction === 'up') {
      return { text: '불타기', emoji: '📈', color: 'up' };
    }
    return { text: '동일가', emoji: '➡️', color: 'same' };
  }, [result]);

  // Price change percentage
  const priceChangePercent = useMemo(() => {
    if (!result || avgPrice <= 0) return null;
    return ((result.newAveragePrice - avgPrice) / avgPrice) * 100;
  }, [result, avgPrice]);

  // Format price based on market
  const formatPrice = (value: number) => {
    if (market === 'US') {
      return `$${value.toFixed(2)}`;
    }
    return `₩${Math.round(value).toLocaleString()}`;
  };

  return (
    <CalculatorCard
      id="averaging"
      title="물타기/불타기 계산기"
      description="추가 매수 시 새 평균가를 바로 확인하세요."
    >
      <div className="calculator-inputs">
        <NumberInput
          label="현재 평균 단가"
          value={currentAvgPrice}
          onChange={setCurrentAvgPrice}
          unit={market === 'KR' ? '₩' : '$'}
          placeholder={market === 'KR' ? '50000' : '5.00'}
          trackingId={{ calculator: 'averaging', field: 'avg_price' }}
        />
        <NumberInput
          label="현재 보유 수량"
          value={currentQty}
          onChange={setCurrentQty}
          placeholder="100"
          unit="주"
          trackingId={{ calculator: 'averaging', field: 'quantity' }}
        />
        <NumberInput
          label="추가 매수가"
          value={additionalPrice}
          onChange={setAdditionalPrice}
          unit={market === 'KR' ? '₩' : '$'}
          placeholder={market === 'KR' ? '40000' : '3.50'}
        />

        {/* Investment Amount with Currency Toggle (US mode) */}
        {market === 'US' ? (
          <div className="number-input">
            <label className="number-input-label">추가 투자 금액</label>
            <div className="currency-toggle-group">
              <button
                type="button"
                className={`currency-btn ${investmentCurrency === 'KRW' ? 'active' : ''}`}
                onClick={() => {
                  setInvestmentCurrency('KRW');
                  setInvestmentAmount('');
                }}
              >
                원화 (₩)
              </button>
              <button
                type="button"
                className={`currency-btn ${investmentCurrency === 'USD' ? 'active' : ''}`}
                onClick={() => {
                  setInvestmentCurrency('USD');
                  setInvestmentAmount('');
                }}
              >
                달러 ($)
              </button>
            </div>
            <div className="number-input-wrapper">
              <span className="number-input-unit">
                {investmentCurrency === 'KRW' ? '₩' : '$'}
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={formatWithCommas(investmentAmount)}
                onChange={(e) => {
                  const val = e.target.value.replace(/,/g, '');
                  if (val === '' || /^\d*\.?\d*$/.test(val)) {
                    setInvestmentAmount(val);
                  }
                }}
                placeholder={investmentCurrency === 'KRW' ? '1,000,000' : '500'}
                className="number-input-field"
              />
              {investmentAmount && (
                <button
                  type="button"
                  className="number-input-clear"
                  onClick={() => setInvestmentAmount('')}
                  aria-label="입력 지우기"
                  tabIndex={-1}
                >
                  ×
                </button>
              )}
            </div>
            {calculatedQty > 0 && addPrice > 0 && (
              <span className="investment-hint">
                → 약 {calculatedQty.toLocaleString()}주 매수 가능
                {investmentCurrency === 'KRW' && ` (환율 ${fxRate.toLocaleString()})`}
              </span>
            )}
          </div>
        ) : (
          <NumberInput
            label="추가 매수 수량"
            value={investmentAmount}
            onChange={setInvestmentAmount}
            placeholder="50"
            unit="주"
          />
        )}
      </div>

      {/* Results Section - Always visible */}
      <div className="calculator-results">

        {/* HERO RESULT: New Average Price */}
        <div className="result-hero">
          {!hasBasicInput ? (
            <div className="result-hero-empty">
              <span className="result-hero-icon">📊</span>
              <span className="result-hero-prompt">
                위 정보를 입력하면<br />새 평균가가 표시됩니다
              </span>
            </div>
          ) : result && (
            <>
              <div className="result-hero-header">
                <span className="result-hero-badge" data-direction={directionInfo?.color}>
                  {directionInfo?.emoji} {directionInfo?.text}
                </span>
              </div>
              <div className="result-hero-value">
                {formatPrice(result.newAveragePrice)}
                {market === 'US' && (
                  <span className="result-hero-sub">
                    ₩{Math.round(result.newAveragePrice * fxRate).toLocaleString()}
                  </span>
                )}
              </div>
              <div className="result-hero-change" data-direction={directionInfo?.color}>
                {formatPrice(avgPrice)} → {formatPrice(result.newAveragePrice)}
                {priceChangePercent !== null && (
                  <span className="result-hero-percent">
                    ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%)
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Required Results: Total Position */}
        <div className="result-group">
          <div className="result-row">
            <span className="result-label">총 수량</span>
            <span className="result-value">
              {hasBasicInput && result
                ? `${result.totalQuantity.toLocaleString()}주`
                : <span className="result-placeholder">—</span>
              }
            </span>
          </div>
          <div className="result-row">
            <span className="result-label">총 투자금</span>
            <span className="result-value">
              {hasBasicInput && result ? (
                market === 'US' ? (
                  <span className="result-dual">
                    <span className="result-primary">
                      ${result.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="result-sub">
                      ₩{Math.round(result.totalInvested * fxRate).toLocaleString()}
                    </span>
                  </span>
                ) : (
                  `₩${Math.round(result.totalInvested).toLocaleString()}`
                )
              ) : (
                <span className="result-placeholder">—</span>
              )}
            </span>
          </div>
        </div>

        {/* Optional Results: Break-even Analysis */}
        <div className="result-optional">
          {!showMarketPrice ? (
            <button
              type="button"
              className="result-optional-toggle"
              onClick={() => setShowMarketPrice(true)}
            >
              <span className="result-optional-icon">💡</span>
              <span className="result-optional-text">
                <strong>현재가를 입력하면</strong>
                <br />
                본전 난이도 변화를 확인할 수 있어요
              </span>
              <span className="result-optional-arrow">→</span>
            </button>
          ) : (
            <div className="result-breakeven">
              <div className="result-breakeven-header">
                <span className="result-breakeven-title">본전 난이도 비교</span>
                <button
                  type="button"
                  className="result-breakeven-close"
                  onClick={() => {
                    setShowMarketPrice(false);
                    setMarketPrice('');
                  }}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="result-breakeven-input">
                <NumberInput
                  label="현재 시장가"
                  value={marketPrice}
                  onChange={setMarketPrice}
                  unit={market === 'KR' ? '₩' : '$'}
                  placeholder={market === 'KR' ? '42000' : '3.50'}
                />
              </div>

              {hasBasicInput && hasMarketPrice && result ? (
                <div className="result-breakeven-rows">
                  <div className="result-row">
                    <span className="result-label">Before (현재)</span>
                    <span className="result-value">
                      {result.breakEvenBefore !== null
                        ? result.breakEvenBefore <= 0
                          ? <span className="profit">이미 수익</span>
                          : `+${result.breakEvenBefore.toFixed(1)}%`
                        : '—'
                      }
                    </span>
                  </div>
                  <div className="result-row">
                    <span className="result-label">After (추가매수 후)</span>
                    <span className="result-value">
                      {result.breakEvenAfter !== null
                        ? result.breakEvenAfter <= 0
                          ? <span className="profit">이미 수익</span>
                          : `+${result.breakEvenAfter.toFixed(1)}%`
                        : '—'
                      }
                    </span>
                  </div>
                  <div className="result-row result-row-highlight">
                    <span className="result-label">
                      {result.breakEvenDelta !== null && result.breakEvenDelta < 0
                        ? '본전이 쉬워짐'
                        : result.breakEvenDelta !== null && result.breakEvenDelta > 0
                          ? '본전이 어려워짐'
                          : '변화 없음'
                      }
                    </span>
                    <span
                      className={`result-value result-value-large ${
                        result.breakEvenDelta !== null && result.breakEvenDelta < 0
                          ? 'profit'
                          : result.breakEvenDelta !== null && result.breakEvenDelta > 0
                            ? 'loss'
                            : ''
                      }`}
                    >
                      {result.breakEvenDelta !== null
                        ? result.breakEvenDelta === 0
                          ? '0%p'
                          : `${result.breakEvenDelta > 0 ? '+' : ''}${result.breakEvenDelta.toFixed(1)}%p`
                        : '—'
                      }
                    </span>
                  </div>
                </div>
              ) : hasBasicInput ? (
                <div className="result-breakeven-prompt">
                  현재 시장가를 입력하세요
                </div>
              ) : (
                <div className="result-breakeven-prompt">
                  먼저 위의 기본 정보를 입력하세요
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary - contextual tips */}
      {hasBasicInput && result && (
        <div className="calculator-tip">
          {directionInfo?.color === 'down' && (
            <>
              <strong>💡 물타기 팁:</strong> 평균가가 낮아지면 본전까지 필요한 수익률도 줄어듭니다.
              단, 주가가 계속 하락하면 손실이 커질 수 있으니 신중하게 결정하세요.
            </>
          )}
          {directionInfo?.color === 'up' && (
            <>
              <strong>💡 불타기 팁:</strong> 상승 중인 주식에 추가 매수하면 평균가가 올라갑니다.
              수익 중이라면 괜찮지만, 고점 매수가 될 수 있으니 주의하세요.
            </>
          )}
          {directionInfo?.color === 'same' && (
            <>
              <strong>💡 동일가 매수:</strong> 현재 평균가와 같은 가격에 매수하면 평균가는 변하지 않습니다.
            </>
          )}
        </div>
      )}
    </CalculatorCard>
  );
}
