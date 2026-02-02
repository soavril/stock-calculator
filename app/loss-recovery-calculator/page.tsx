import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import LossRecoveryCalculator from '@/components/LossRecoveryCalculator';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mooltagi.com';

export const metadata: Metadata = {
  title: '손실 회복 계산기 - 본전까지 얼마나 올라야 할까?',
  description:
    '주식 손실에서 회복하려면 얼마나 상승해야 하는지 계산해보세요. 30% 손실을 회복하려면 42.9% 상승이 필요합니다. 현실적인 투자 판단을 도와드립니다.',
  keywords: [
    '손실 회복 계산기',
    '본전 계산기',
    '주식 손실 계산',
    '수익률 계산기',
    '손실 복구',
    'loss recovery calculator',
    'break even calculator',
  ],
  alternates: {
    canonical: `${BASE_URL}/loss-recovery-calculator`,
  },
  openGraph: {
    title: '손실 회복 계산기 - 본전까지 얼마나 올라야 할까?',
    description:
      '손실에서 회복하려면 얼마나 올라야 할까? 냉정한 현실 체크를 해보세요.',
    type: 'website',
    url: `${BASE_URL}/loss-recovery-calculator`,
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '손실 회복 계산기',
  description: '주식 손실에서 본전까지 필요한 수익률을 계산합니다.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
};

export default function LossRecoveryCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SharedLayout>
        <LossRecoveryCalculator />

        {/* SEO Content */}
        <section className="seo-content">
          <h2>손실과 회복의 비대칭성</h2>
          <p>
            주식 투자에서 손실과 회복은 대칭적이지 않습니다.
            50% 손실을 회복하려면 50%가 아닌 100% 상승이 필요합니다.
            이것이 &quot;손실 회피&quot;가 중요한 이유입니다.
          </p>

          <h2>주요 손실률별 필요 수익률</h2>
          <ul>
            <li><strong>-10%</strong> 손실 → <strong>+11.1%</strong> 필요</li>
            <li><strong>-20%</strong> 손실 → <strong>+25.0%</strong> 필요</li>
            <li><strong>-30%</strong> 손실 → <strong>+42.9%</strong> 필요</li>
            <li><strong>-50%</strong> 손실 → <strong>+100%</strong> 필요</li>
            <li><strong>-70%</strong> 손실 → <strong>+233%</strong> 필요</li>
          </ul>

          <h2>손실 회복 계산 공식</h2>
          <p>
            필요 수익률 = (평균 매수가 ÷ 현재가 - 1) × 100%<br />
            예: 10,000원에 매수 → 7,000원으로 하락 시<br />
            필요 수익률 = (10,000 ÷ 7,000 - 1) × 100% = 42.9%
          </p>
        </section>
      </SharedLayout>
    </>
  );
}
