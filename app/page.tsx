import type { Metadata } from 'next';
import Link from 'next/link';
import SharedLayout from '@/components/SharedLayout';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: '주식 계산기 - 수익률, 물타기, 손실 회복, 매도가 계산',
  description:
    '무료 주식 계산기 모음. 수익률 계산기, 물타기 계산기, 손실 회복 계산기, 매도가 계산기를 한곳에서. 현명한 투자 결정을 도와드립니다.',
  keywords: [
    '주식 계산기',
    '물타기 계산기',
    '평단가 계산기',
    '본전 계산기',
    '손실 회복 계산기',
    '매도가 계산기',
    '수익률 계산기',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: '주식 계산기 - 물타기, 손실 회복, 매도가 계산',
    description:
      '무료 주식 계산기 모음. 물타기, 손실 회복, 매도 계획을 한번에.',
    type: 'website',
    url: BASE_URL,
  },
};

const calculators = [
  {
    href: '/return-calculator',
    title: '수익률 계산기',
    description: '매수가와 매도가만 입력하면 수익률을 바로 계산합니다.',
    icon: '💰',
    features: ['수익/손실 계산', '수익률 % 확인', '수수료 반영'],
  },
  {
    href: '/averaging-calculator',
    title: '물타기/불타기 계산기',
    description: '추가 매수가 본전 난이도에 어떤 영향을 주는지 확인하세요.',
    icon: '📉',
    features: ['새 평균가 계산', '본전 수익률 비교', '물타기/불타기 감지'],
  },
  {
    href: '/loss-recovery-calculator',
    title: '손실 회복 계산기',
    description: '손실에서 회복하려면 얼마나 올라야 하는지 현실을 직시하세요.',
    icon: '📊',
    features: ['필요 수익률 계산', '손실률 분석', '참조 테이블'],
  },
  {
    href: '/exit-price-planner',
    title: '매도가 계획',
    description: '목표 매도가에서 실제 수익을 미리 계산해보세요.',
    icon: '🎯',
    features: ['예상 수익 계산', '목표가/수익률 모드', '손익 분석'],
  },
];

export default function HomePage() {
  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="hero">
        <h2 className="hero-title">투자, 계산부터 시작하세요</h2>
        <p className="hero-subtitle">
          물타기가 정말 도움이 될까? 본전까지 얼마나 걸릴까?<br />
          감이 아닌 숫자로 확인하세요.
        </p>
      </section>

      {/* Calculator Cards */}
      <section className="calculator-hub">
        {calculators.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="hub-card"
          >
            <span className="hub-card-icon">{calc.icon}</span>
            <h3 className="hub-card-title">{calc.title}</h3>
            <p className="hub-card-description">{calc.description}</p>
            <ul className="hub-card-features">
              {calc.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className="hub-card-cta">계산하기 →</span>
          </Link>
        ))}
      </section>

      {/* SEO Content */}
      <section className="seo-content">
        <h2>주식 계산기 사용법</h2>
        <p>
          주식 투자에서 감정적인 판단은 큰 손실로 이어질 수 있습니다.
          이 계산기들을 활용하여 객관적인 숫자를 확인하고 현명한 결정을 내리세요.
        </p>

        <h3>1. 수익률부터 확인하세요</h3>
        <p>
          <Link href="/return-calculator">수익률 계산기</Link>로 매수가와 매도가에서의 예상 수익을 바로 확인하세요.
          수수료까지 반영한 실수익을 계산할 수 있습니다.
        </p>

        <h3>2. 물타기 전에 확인하세요</h3>
        <p>
          물타기(평단 낮추기)를 하기 전에 <Link href="/averaging-calculator">물타기 계산기</Link>로
          새 평균가와 본전 난이도 변화를 확인하세요. 무조건적인 물타기는 손실을 키울 수 있습니다.
        </p>

        <h3>3. 현실을 직시하세요</h3>
        <p>
          <Link href="/loss-recovery-calculator">손실 회복 계산기</Link>로 본전까지 필요한 수익률을 확인하세요.
          30% 손실을 회복하려면 42.9% 상승이 필요합니다. 현실적인 기대를 갖는 것이 중요합니다.
        </p>

        <h3>4. 매도 계획을 세우세요</h3>
        <p>
          <Link href="/exit-price-planner">매도가 계획</Link>으로 목표 매도가에서의 예상 수익을 미리 계산하세요.
          매수보다 매도가 더 어렵습니다. 계획이 있으면 감정적 매매를 피할 수 있습니다.
        </p>
      </section>

    </SharedLayout>
  );
}
