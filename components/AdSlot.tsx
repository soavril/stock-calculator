'use client';

interface AdSlotProps {
  /**
   * Slot position identifier for tracking
   */
  slot: 'top' | 'middle' | 'bottom';
  /**
   * Ad format - affects reserved height
   * - 'horizontal': Standard banner (90px)
   * - 'rectangle': Medium rectangle (250px)
   * - 'native': Native/in-feed style (120px)
   */
  format?: 'horizontal' | 'rectangle' | 'native';
}

const FORMAT_HEIGHTS: Record<string, number> = {
  horizontal: 90,
  rectangle: 250,
  native: 120,
};

export default function AdSlot({ slot, format = 'horizontal' }: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
  const height = FORMAT_HEIGHTS[format];

  return (
    <div
      className={`ad-slot ad-slot-${format}`}
      data-slot={slot}
      style={{ minHeight: height }}
      aria-hidden="true"
    >
      {adsEnabled ? (
        // Placeholder for actual AdSense code
        // Replace with: <ins className="adsbygoogle" ... />
        <div className="ad-slot-placeholder">
          <span className="ad-slot-label">Ad</span>
        </div>
      ) : (
        // Empty placeholder with same height for CLS prevention
        <div className="ad-slot-disabled" />
      )}
    </div>
  );
}
