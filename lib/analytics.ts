/**
 * Minimal analytics abstraction
 *
 * Easily swap to GA4, Plausible, or other providers later.
 * Currently logs to console in development.
 *
 * ## To integrate GA4:
 * 1. Add GA4 script to layout.tsx:
 *    <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" />
 *
 * 2. Replace trackEvent implementation:
 *    window.gtag('event', eventName, eventParams);
 *
 * 3. Replace trackPageView implementation:
 *    window.gtag('config', 'G-XXXXXXX', { page_path: path });
 */

type EventName =
  | 'calculator_interaction'
  | 'market_switch'
  | 'fx_refresh'
  | 'ad_click'
  | 'page_view';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Check if we're in browser and analytics is enabled
const isEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  // Always enable in production, or if explicitly enabled
  return process.env.NODE_ENV === 'production' ||
         process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';
};

// Check if gtag exists (GA4)
const hasGtag = (): boolean => {
  return typeof window !== 'undefined' && typeof (window as unknown as { gtag?: unknown }).gtag === 'function';
};

/**
 * Track a custom event
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
  if (!isEnabled()) {
    // Development: log to console for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, params || {});
    }
    return;
  }

  // GA4 integration
  if (hasGtag()) {
    (window as unknown as { gtag: (cmd: string, event: string, params?: EventParams) => void })
      .gtag('event', eventName, params);
    return;
  }

  // Fallback: could add other providers here (Plausible, etc.)
}

/**
 * Track page view
 */
export function trackPageView(path: string): void {
  trackEvent('page_view', { page_path: path });
}

/**
 * Track calculator input change
 */
export function trackCalculatorInteraction(
  calculatorType: 'averaging' | 'loss-recovery' | 'exit-planner',
  field: string
): void {
  trackEvent('calculator_interaction', {
    calculator: calculatorType,
    field,
  });
}

/**
 * Track market switch (KR/US)
 */
export function trackMarketSwitch(market: 'KR' | 'US'): void {
  trackEvent('market_switch', { market });
}

/**
 * Track FX refresh
 */
export function trackFxRefresh(): void {
  trackEvent('fx_refresh');
}
