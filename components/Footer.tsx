import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-disclaimer">
        본 사이트는 계산 도구만 제공하며, 투자 조언을 제공하지 않습니다.
      </p>
      <nav className="footer-links" aria-label="법적 고지">
        <Link href="/privacy">개인정보처리방침</Link>
        <span className="footer-divider" aria-hidden="true">|</span>
        <Link href="/terms">이용약관</Link>
        <span className="footer-divider" aria-hidden="true">|</span>
        <Link href="/contact">문의하기</Link>
      </nav>
      <p className="footer-copyright">
        © {new Date().getFullYear()} 주식 계산기
      </p>
    </footer>
  );
}
