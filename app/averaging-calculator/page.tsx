import type { Metadata } from 'next';
import SharedLayout from '@/components/SharedLayout';
import AveragingCalculator from '@/components/AveragingCalculator';
import AdSlot from '@/components/AdSlot';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: '물타기 계산기 - 추가 매수가 본전에 도움이 될까?',
  description:
    '물타기(평단 낮추기) 또는 불타기(추가 매수)가 본전 난이도에 어떤 영향을 주는지 계산해보세요. 새 평균가와 필요 수익률 변화를 확인할 수 있습니다.',
  keywords: [
    '물타기 계산기',
    '평단가 계산기',
    '주식 물타기',
    '평균 단가 계산',
    '추가 매수 계산기',
    '불타기 계산기',
    'averaging down calculator',
  ],
  alternates: {
    canonical: `${BASE_URL}/averaging-calculator`,
  },
  openGraph: {
    title: '물타기 계산기 - 추가 매수가 본전에 도움이 될까?',
    description:
      '물타기가 정말 도움이 될까? 새 평균가와 본전 난이도 변화를 직접 계산해보세요.',
    type: 'website',
    url: `${BASE_URL}/averaging-calculator`,
  },
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '물타기 계산기',
  description: '물타기/불타기 시 새 평균가와 본전까지 필요한 수익률 변화를 계산합니다.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
};

export default function AveragingCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SharedLayout>
        {/* Ad: Top */}
        <AdSlot slot="top" format="horizontal" />

        <AveragingCalculator />

        {/* Ad: Middle (after calculator) */}
        <AdSlot slot="middle" format="native" />

        {/* SEO Content */}
        <section className="seo-content">
          <h2>물타기란?</h2>
          <p>
            물타기는 보유 중인 주식의 평균 매수가를 낮추기 위해 현재가보다 낮은 가격에
            추가 매수하는 전략입니다. 평균 단가가 낮아지면 본전까지 필요한 수익률도 줄어듭니다.
          </p>
          <h2>물타기 vs 불타기</h2>
          <p>
            <strong>물타기</strong>: 현재가가 평균가보다 낮을 때 추가 매수 → 평균가 하락<br />
            <strong>불타기</strong>: 현재가가 평균가보다 높을 때 추가 매수 → 평균가 상승
          </p>
          <h2>물타기 주의사항</h2>
          <p>
            물타기는 주가가 반등할 것이라는 확신이 있을 때만 유효합니다.
            계속 하락하는 주식에 물타기를 하면 손실이 더 커질 수 있습니다.
            이 계산기로 본전 난이도 변화를 확인하고 신중하게 결정하세요.
          </p>
        </section>

        {/* Ad: Bottom (before footer) */}
        <AdSlot slot="bottom" format="horizontal" />
      </SharedLayout>
    </>
  );
}
