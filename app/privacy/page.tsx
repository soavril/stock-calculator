import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '주식 계산기 개인정보처리방침',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container">
      <article className="legal-content">
        <h1>개인정보처리방침</h1>
        <p className="legal-updated">최종 수정: 2026년 2월</p>

        <section>
          <h2>서비스 소개</h2>
          <p>
            주식 계산기(이하 &quot;본 사이트&quot;)는 개인 투자자를 위한
            <strong>무료 계산 도구</strong>를 제공합니다.
            본 사이트는 투자 조언을 제공하지 않으며, 모든 투자 결정은
            사용자 본인의 책임입니다.
          </p>
        </section>

        <section>
          <h2>수집하는 정보</h2>
          <p>
            <strong>개인정보를 수집하지 않습니다.</strong> 모든 계산은
            사용자의 브라우저에서 로컬로 처리되며, 입력 데이터나 계산 결과는
            서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2>쿠키 및 분석</h2>
          <p>본 사이트는 다음 목적으로 쿠키를 사용할 수 있습니다:</p>
          <ul>
            <li>기본 사이트 기능 제공</li>
            <li>익명 사용 통계 (페이지 조회수 등)</li>
            <li>광고 서비스 (Google AdSense)</li>
          </ul>
          <p>
            Google의 개인정보 맞춤 광고를 원하지 않으시면{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 광고 설정
            </a>
            에서 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>제3자 서비스</h2>
          <ul>
            <li><strong>Google AdSense</strong> — 광고 게재</li>
            <li><strong>Google Analytics</strong> — 익명 사용 통계</li>
          </ul>
          <p>
            이러한 서비스는 자체 개인정보처리방침을 적용합니다.
          </p>
        </section>

        <section>
          <h2>면책 조항</h2>
          <p>
            본 사이트는 <strong>계산 도구만 제공</strong>하며,
            어떠한 투자 조언도 제공하지 않습니다.
            계산 결과의 정확성을 보장하지 않으며,
            투자 결정으로 인한 손실에 대해 책임지지 않습니다.
          </p>
        </section>

        <section>
          <h2>문의</h2>
          <p>
            개인정보처리방침에 대한 문의사항이 있으시면{' '}
            <Link href="/contact">문의하기</Link> 페이지를 이용해주세요.
          </p>
        </section>

        <nav className="legal-nav">
          <Link href="/">← 계산기로 돌아가기</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/terms">이용약관</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/contact">문의하기</Link>
        </nav>
      </article>
    </div>
  );
}
