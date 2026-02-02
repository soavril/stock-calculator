'use client';

import { useState } from 'react';
import { useMarket } from '@/lib/MarketContext';
import { trackFxRefresh } from '@/lib/analytics';

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function FXInput() {
  const { market, fxState, fetchFxRate, setManualFxRate } = useMarket();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Only show in US mode
  if (market !== 'US') {
    return null;
  }

  const handleEditClick = () => {
    setInputValue(fxState.rate.toString());
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed) && parsed > 0) {
      setManualFxRate(parsed);
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleRefresh = () => {
    fetchFxRate();
    trackFxRefresh();
  };

  const sourceLabel =
    fxState.source === 'api'
      ? 'Live'
      : fxState.source === 'manual'
        ? 'Manual'
        : 'Default';

  return (
    <div className="fx-input-container">
      <div className="fx-rate-display">
        <span className="fx-label">USD/KRW</span>
        {isEditing ? (
          <input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            className="fx-input-field fx-input-editing"
            autoFocus
          />
        ) : (
          <button
            type="button"
            className="fx-rate-value"
            onClick={handleEditClick}
            title="Click to edit"
          >
            {fxState.rate.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </button>
        )}
        <span className={`fx-source fx-source-${fxState.source}`}>
          {sourceLabel}
        </span>
      </div>

      <div className="fx-meta">
        {fxState.isLoading ? (
          <span className="fx-loading">Updating...</span>
        ) : (
          <>
            {fxState.lastUpdated && (
              <span className="fx-timestamp">
                Updated {formatTime(fxState.lastUpdated)}
              </span>
            )}
            <button
              type="button"
              className="fx-refresh-btn"
              onClick={handleRefresh}
              disabled={fxState.isLoading}
              title="Refresh rate"
            >
              ↻
            </button>
          </>
        )}
      </div>

      {fxState.error && <span className="fx-error">{fxState.error}</span>}
    </div>
  );
}
