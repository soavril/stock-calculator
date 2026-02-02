'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Return a wrapped version of useState's setter function
  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

// History entry types
export interface CalculationHistoryEntry {
  id: string;
  type: 'averaging' | 'loss-recovery' | 'exit-planner';
  timestamp: number;
  inputs: Record<string, string | number>;
  result: Record<string, string | number | null>;
}

const MAX_HISTORY_ITEMS = 10;

export function useCalculationHistory() {
  const [history, setHistory] = useLocalStorage<CalculationHistoryEntry[]>('calc-history', []);

  const addEntry = useCallback((entry: Omit<CalculationHistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: CalculationHistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(updated);
  }, [history, setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return { history, addEntry, clearHistory };
}
