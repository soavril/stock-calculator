import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import ExitPricePlanner from '@/components/ExitPricePlanner';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: '매도가 계산기 - 목표가에서 얼마를 벌 수 있을까?',
  description:
    '목표 매도가에서 실제로 얼마를 벌거나 잃는지 미리 계산해보세요. 수익률과 손익을 정확하게 파악하고 매도 타이밍을 계획하세요.',
  keywords: [
    '매도가 계산기',
    '목표가 계산기',
    '주식 수익 계산기',
    '매도 계획',
    '수익률 계산',
    'exit price calculator',
    'profit calculator',
  ],
  alternates: {
    canonical: `${BASE_URL}/exit-price-planner`,
  },
  openGraph: {
    title: '매도가 계산기 - 목표가에서 얼마를 벌 수 있을까?',
    description:
      '목표 매도가에서 예상 수익을 미리 계산해보세요. 현명한 매도 결정을 도와드립니다.',
    type: 'website',
    url: `${BASE_URL}/exit-price-planner`,
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '매도가 계산기',
  description: '목표 매도가에서의 예상 수익/손실을 계산합니다.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
};

export default function ExitPricePlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SharedLayout>
        <ExitPricePlanner />

        {/* SEO Content */}
        <section className="seo-content">
          <h2>매도 계획의 중요성</h2>
          <p>
            &quot;언제 팔 것인가&quot;는 &quot;언제 살 것인가&quot;만큼 중요합니다.
            목표 매도가를 미리 정해두면 감정적인 매매를 피하고
            계획적인 투자를 할 수 있습니다.
          </p>

          <h2>매도 전략 유형</h2>
          <ul>
            <li><strong>목표가 매도</strong>: 특정 가격 도달 시 매도</li>
            <li><strong>목표 수익률 매도</strong>: 원하는 수익률 달성 시 매도</li>
            <li><strong>분할 매도</strong>: 여러 가격대에 나누어 매도</li>
            <li><strong>손절매</strong>: 손실 한도 도달 시 매도</li>
          </ul>

          <h2>수익 계산 공식</h2>
          <p>
            예상 수익 = (목표 매도가 - 평균 매수가) × 보유 수량<br />
            수익률 = (목표 매도가 ÷ 평균 매수가 - 1) × 100%
          </p>

          <h2>세금 고려</h2>
          <p>
            실제 수익은 세금을 고려해야 합니다.
            국내 주식은 대주주가 아닌 경우 양도소득세가 면제되지만,
            미국 주식은 22%의 양도소득세(250만원 공제)가 부과됩니다.
          </p>
        </section>
      </SharedLayout>
    </>
  );
}
