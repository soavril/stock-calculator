import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개',
  description: '주식 계산기 서비스 소개 - 개인 투자자를 위한 무료 계산 도구',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="container">
      <article className="legal-content">
        <h1>서비스 소개</h1>

        <section>
          <h2>주식 계산기란?</h2>
          <p>
            주식 계산기는 개인 투자자를 위한 <strong>무료 온라인 계산 도구</strong>입니다.
            복잡한 투자 계산을 쉽고 빠르게 할 수 있도록 도와드립니다.
          </p>
          <p>
            감정적인 투자 결정 대신, 숫자로 객관적인 상황을 파악하는 것이
            현명한 투자의 첫걸음이라고 믿습니다.
          </p>
        </section>

        <section>
          <h2>제공하는 도구</h2>
          <ul>
            <li>
              <strong>수익률 계산기</strong> - 매수가와 매도가로 예상 수익을 계산
            </li>
            <li>
              <strong>물타기/불타기 계산기</strong> - 추가 매수 시 새 평균가와 본전 난이도 변화 확인
            </li>
            <li>
              <strong>손실 회복 계산기</strong> - 본전까지 필요한 수익률 계산
            </li>
            <li>
              <strong>매도가 계획</strong> - 목표 수익률에 맞는 매도가 계산
            </li>
          </ul>
        </section>

        <section>
          <h2>서비스 특징</h2>
          <ul>
            <li>
              <strong>완전 무료</strong> - 모든 기능을 무료로 이용할 수 있습니다.
            </li>
            <li>
              <strong>회원가입 불필요</strong> - 로그인 없이 바로 사용 가능합니다.
            </li>
            <li>
              <strong>데이터 비저장</strong> - 모든 계산은 브라우저에서 로컬로 처리되며,
              입력한 정보는 서버로 전송되지 않습니다.
            </li>
            <li>
              <strong>모바일 최적화</strong> - 스마트폰에서도 편리하게 사용할 수 있습니다.
            </li>
            <li>
              <strong>미국 주식 지원</strong> - 실시간 환율을 적용한 원화 환산 기능을 제공합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2>만든 이유</h2>
          <p>
            주식 투자를 하다 보면 &quot;물타기를 해야 할까?&quot;, &quot;본전까지 얼마나 올라야 하지?&quot;
            같은 계산이 자주 필요합니다. 매번 엑셀을 열거나 복잡한 계산을 하는 대신,
            간단히 숫자만 입력하면 바로 결과를 볼 수 있는 도구가 있으면 좋겠다고 생각했습니다.
          </p>
          <p>
            특히 손실 상황에서 감정적으로 판단하기 쉬운데, 숫자로 현실을 직시하면
            더 나은 결정을 내릴 수 있습니다. 예를 들어, 50% 손실을 회복하려면
            100%의 수익이 필요하다는 사실을 알면 무리한 물타기를 피할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>주의사항</h2>
          <p>
            본 사이트는 <strong>계산 도구만 제공</strong>하며,
            투자 조언이나 종목 추천을 하지 않습니다.
            계산 결과는 참고용이며, 세금, 수수료 등은 반영되지 않을 수 있습니다.
            모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
          </p>
        </section>

        <section>
          <h2>문의</h2>
          <p>
            버그 리포트, 기능 제안, 기타 문의사항이 있으시면
            <Link href="/contact"> 문의하기 페이지</Link>를 통해 연락해주세요.
          </p>
        </section>

        <nav className="legal-nav">
          <Link href="/">← 계산기로 돌아가기</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/privacy">개인정보처리방침</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/terms">이용약관</Link>
          <span className="legal-nav-divider">|</span>
          <Link href="/contact">문의하기</Link>
        </nav>
      </article>
    </div>
  );
}
