import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관',
  description: '주식 계산기 이용약관',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfService() {
  return (
    <div className="container">
      <article className="legal-content">
        <h1>이용약관</h1>
        <p className="legal-updated">최종 수정: 2026년 2월</p>

        <section>
          <h2>서비스 개요</h2>
          <p>
            주식 계산기(이하 &quot;본 사이트&quot;)는 개인 투자자를 위한
            <strong>무료 계산 도구</strong>를 제공하는 웹사이트입니다.
            본 사이트를 이용함으로써 아래 약관에 동의하는 것으로 간주됩니다.
          </p>
        </section>

        <section>
          <h2>서비스 범위</h2>
          <p>본 사이트는 다음 계산 도구를 제공합니다:</p>
          <ul>
            <li>물타기/불타기 계산기 (평균 매수가 계산)</li>
            <li>손실 회복 계산기 (본전 수익률 계산)</li>
            <li>매도가 계획 (예상 수익 계산)</li>
          </ul>
          <p>
            <strong>본 사이트는 계산 도구만 제공합니다.</strong>
            투자 조언, 종목 추천, 시장 분석 등의 서비스는 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2>면책 조항</h2>
          <p>
            <strong>투자 조언 아님:</strong> 본 사이트의 모든 콘텐츠와
            계산 결과는 정보 제공 목적으로만 사용되며, 투자 조언이 아닙니다.
          </p>
          <p>
            <strong>정확성 미보장:</strong> 계산 결과의 정확성을 보장하지 않습니다.
            모든 계산 결과는 참고용으로만 사용하시기 바랍니다.
          </p>
          <p>
            <strong>손실 책임:</strong> 본 사이트의 정보를 활용한 투자 결정으로
            발생하는 손실에 대해 어떠한 책임도 지지 않습니다.
            모든 투자 결정은 사용자 본인의 책임입니다.
          </p>
        </section>

        <section>
          <h2>사용자 의무</h2>
          <ul>
            <li>본 사이트를 합법적인 목적으로만 사용해야 합니다.</li>
            <li>계산 결과를 투자 결정의 유일한 근거로 삼지 마십시오.</li>
            <li>중요한 투자 결정 전에는 전문가와 상담하시기 바랍니다.</li>
          </ul>
        </section>

        <section>
          <h2>지적 재산권</h2>
          <p>
            본 사이트의 디자인, 로고, 콘텐츠는 저작권법의 보호를 받습니다.
            무단 복제, 배포, 수정을 금지합니다.
          </p>
        </section>

        <section>
          <h2>약관 변경</h2>
          <p>
            본 약관은 사전 통지 없이 변경될 수 있습니다.
            변경된 약관은 본 페이지에 게시된 시점부터 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2>문의</h2>
          <p>
            이용약관에 대한 문의사항이 있으시면{' '}
            <Link href="/contact">문의하기</Link> 페이지를 이용해주세요.
          </p>
        </section>

        <nav className="legal-nav">
          <Link href="/">← 계산기로 돌아가기</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/privacy">개인정보처리방침</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/contact">문의하기</Link>
        </nav>
      </article>
    </div>
  );
}
