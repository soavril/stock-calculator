import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '문의하기',
  description: '주식 계산기 문의 및 연락처',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="container">
      <article className="legal-content">
        <h1>문의하기</h1>

        <section>
          <h2>서비스 소개</h2>
          <p>
            주식 계산기는 개인 투자자를 위한 <strong>무료 계산 도구</strong>를
            제공하는 웹사이트입니다. 물타기 계산, 손실 회복률 계산,
            매도가 계획 등의 기능을 제공합니다.
          </p>
          <p>
            <strong>참고:</strong> 본 사이트는 계산 도구만 제공하며,
            투자 조언을 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2>연락처</h2>
          <p>
            문의사항, 버그 리포트, 기능 제안이 있으시면
            아래 이메일로 연락해주세요.
          </p>
          <p className="contact-email">
            <strong>이메일:</strong> contact@example.com
          </p>
          <p className="contact-note">
            * 투자 조언, 종목 추천 등에 대한 문의에는 답변드리지 않습니다.
          </p>
        </section>

        <section>
          <h2>자주 묻는 질문</h2>

          <div className="faq-item">
            <h3>Q. 계산 결과가 정확한가요?</h3>
            <p>
              계산 로직은 일반적인 공식을 사용하지만,
              세금, 수수료 등은 반영되지 않습니다.
              참고용으로만 사용해주세요.
            </p>
          </div>

          <div className="faq-item">
            <h3>Q. 무료인가요?</h3>
            <p>
              네, 모든 계산 기능은 무료입니다.
              광고 수익으로 운영됩니다.
            </p>
          </div>

          <div className="faq-item">
            <h3>Q. 데이터가 저장되나요?</h3>
            <p>
              아니요, 모든 계산은 브라우저에서 로컬로 처리됩니다.
              입력한 데이터는 서버로 전송되지 않습니다.
            </p>
          </div>
        </section>

        <nav className="legal-nav">
          <Link href="/">← 계산기로 돌아가기</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/privacy">개인정보처리방침</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/terms">이용약관</Link>
        </nav>
      </article>
    </div>
  );
}
