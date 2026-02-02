'use client';

import { useId, useMemo, useRef, useCallback } from 'react';
import { trackCalculatorInteraction } from '@/lib/analytics';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
  min?: number;
  step?: string;
  /** Optional: track interactions for analytics */
  trackingId?: {
    calculator: 'averaging' | 'loss-recovery' | 'exit-planner' | 'return';
    field: string;
  };
}

// Format number with thousand separators for display
function formatDisplayValue(value: string): string {
  if (!value) return '';

  // Split by decimal point
  const parts = value.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousand separators to integer part
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Reconstruct with decimal if present
  if (parts.length > 1) {
    return `${formatted}.${decimalPart}`;
  }
  return formatted;
}

// Remove formatting to get raw number string
function parseInputValue(formatted: string): string {
  return formatted.replace(/,/g, '');
}

export default function NumberInput({
  label,
  value,
  onChange,
  unit,
  placeholder = '0',
  min = 0,
  step = 'any',
  trackingId,
}: NumberInputProps) {
  const id = useId();
  const hasTracked = useRef(false);

  // Display value with formatting
  const displayValue = useMemo(() => formatDisplayValue(value), [value]);

  // Track interaction once per session (debounced)
  const maybeTrack = useCallback(() => {
    if (trackingId && !hasTracked.current) {
      hasTracked.current = true;
      trackCalculatorInteraction(trackingId.calculator, trackingId.field);
    }
  }, [trackingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Remove commas to get raw value
    const rawVal = parseInputValue(inputVal);

    // Allow empty string or valid positive numbers
    if (rawVal === '' || /^\d*\.?\d*$/.test(rawVal)) {
      onChange(rawVal);
      maybeTrack();
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const hasValue = value.length > 0;

  return (
    <div className="number-input">
      <label htmlFor={id} className="number-input-label">
        {label}
      </label>
      <div className="number-input-wrapper">
        {unit && <span className="number-input-unit">{unit}</span>}
        <input
          type="text"
          inputMode="decimal"
          id={id}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className="number-input-field"
        />
        {hasValue && (
          <button
            type="button"
            className="number-input-clear"
            onClick={handleClear}
            aria-label="입력 지우기"
            tabIndex={-1}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
