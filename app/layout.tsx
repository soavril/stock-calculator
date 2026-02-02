import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mooltagi.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '주식 계산기 - 물타기, 손실 회복, 매도가 계산',
    template: '%s | 주식 계산기',
  },
  description:
    '무료 주식 계산기 모음. 물타기, 손실 회복, 매도가 계산을 한곳에서.',
  keywords: [
    '주식 계산기',
    '물타기 계산기',
    '평단가 계산기',
    '본전 계산기',
    '손실 회복 계산기',
    '매도가 계산기',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '주식 계산기',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="89930549ccf3c7594523fb7ef1eb1788e1ba4120" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5547434174125750"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
