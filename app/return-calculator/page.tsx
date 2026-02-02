import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import ReturnCalculator from '@/components/ReturnCalculator';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mooltagi.com';

export const metadata: Metadata = {
  title: '주식 수익률 계산기 - 손익 계산, 수익률 확인',
  description:
    '주식 수익률을 간편하게 계산하세요. 매수가, 매도가, 수량만 입력하면 수익금과 수익률을 바로 확인할 수 있습니다. 수수료 계산도 가능합니다.',
  keywords: [
    '주식 수익률 계산기',
    '주식 손익 계산기',
    '주식 수익 계산',
    '주식 손실 계산',
    '주식 수익률',
    '주식 계산기',
    '투자 수익률',
  ],
  openGraph: {
    title: '주식 수익률 계산기',
    description: '매수가와 매도가로 수익률을 바로 계산하세요.',
    url: `${BASE_URL}/return-calculator`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/return-calculator`,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '주식 수익률 계산기',
  description:
    '주식 매수가와 매도가를 입력하여 수익금과 수익률을 계산하는 무료 온라인 도구',
  url: `${BASE_URL}/return-calculator`,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  featureList: [
    '수익/손실 금액 계산',
    '수익률 퍼센트 계산',
    '수수료 반영 실수익 계산',
    '미국 주식 원화 환산',
  ],
};

export default function ReturnCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SharedLayout>
        <ReturnCalculator />

        {/* SEO Content */}
        <section className="seo-content">
          <h2>주식 수익률 계산기란?</h2>
          <p>
            주식 수익률 계산기는 주식을 매수한 가격과 매도할 가격을 입력하면
            예상 수익금과 수익률을 바로 계산해주는 도구입니다.
            복잡한 계산 없이 투자 성과를 빠르게 확인할 수 있습니다.
          </p>

          <h3>수익률 계산 공식</h3>
          <p>
            수익률은 다음과 같이 계산됩니다:
          </p>
          <ul>
            <li><strong>수익금</strong> = (매도가 - 매수가) × 수량</li>
            <li><strong>수익률</strong> = (수익금 ÷ 총 매수금액) × 100%</li>
          </ul>

          <h3>수수료 계산</h3>
          <p>
            실제 투자에서는 증권사 수수료가 발생합니다.
            일반적으로 매수와 매도 각각 약 0.015%의 수수료가 부과되며,
            이를 반영한 실수익을 확인할 수 있습니다.
          </p>

          <h3>손실과 회복의 비대칭성</h3>
          <p>
            주식 투자에서 손실과 회복은 비대칭적입니다.
            예를 들어 50% 손실을 회복하려면 100%의 수익이 필요합니다.
            이 계산기로 현재 상황을 정확히 파악하세요.
          </p>

          <h3>관련 계산기</h3>
          <ul>
            <li>
              <a href="/averaging-calculator">물타기 계산기</a> - 추가 매수 시 평균가 계산
            </li>
            <li>
              <a href="/loss-recovery-calculator">손실 회복 계산기</a> - 본전까지 필요한 수익률
            </li>
            <li>
              <a href="/exit-price-planner">매도가 계획</a> - 목표 수익률에 맞는 매도가
            </li>
          </ul>
        </section>
      </SharedLayout>
    </>
  );
}
