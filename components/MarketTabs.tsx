'use client';

import { useMarket } from '@/lib/MarketContext';
import { trackMarketSwitch } from '@/lib/analytics';
import type { Market } from '@/lib/types';

export default function MarketTabs() {
  const { market, setMarket } = useMarket();

  const handleTabClick = (m: Market) => {
    setMarket(m);
    trackMarketSwitch(m);
  };

  return (
    <div className="market-tabs">
      <button
        type="button"
        className={`market-tab ${market === 'KR' ? 'active' : ''}`}
        onClick={() => handleTabClick('KR')}
        aria-pressed={market === 'KR'}
      >
        국내 주식
      </button>
      <button
        type="button"
        className={`market-tab ${market === 'US' ? 'active' : ''}`}
        onClick={() => handleTabClick('US')}
        aria-pressed={market === 'US'}
      >
        미국 주식
      </button>
    </div>
  );
}
