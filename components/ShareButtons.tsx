'use client';

import { useState, useEffect, useCallback } from 'react';

interface ShareButtonsProps {
  title: string;
  description: string;
}

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: object) => void;
      };
    };
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || '';

export default function ShareButtons({ title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);

  // Lazy load Kakao SDK
  useEffect(() => {
    if (!KAKAO_APP_KEY || typeof window === 'undefined') return;
    if (window.Kakao?.isInitialized()) {
      setKakaoReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_APP_KEY);
        setKakaoReady(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed for SDK
    };
  }, []);

  const getCurrentUrl = useCallback(() => {
    if (typeof window === 'undefined') return '';
    return window.location.href;
  }, []);

  // KakaoTalk share
  const handleKakaoShare = useCallback(() => {
    if (!window.Kakao?.Share) {
      // Fallback: copy URL
      handleCopyUrl();
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: '', // No image to keep it simple
        link: {
          mobileWebUrl: getCurrentUrl(),
          webUrl: getCurrentUrl(),
        },
      },
      buttons: [
        {
          title: '계산하러 가기',
          link: {
            mobileWebUrl: getCurrentUrl(),
            webUrl: getCurrentUrl(),
          },
        },
      ],
    });
  }, [title, description, getCurrentUrl]);

  // Naver Band share
  const handleBandShare = useCallback(() => {
    const url = getCurrentUrl();
    const text = `${title} - ${description}`;
    const bandShareUrl = `https://band.us/plugin/share?body=${encodeURIComponent(text)}&route=${encodeURIComponent(url)}`;
    window.open(bandShareUrl, '_blank', 'width=500,height=600');
  }, [title, description, getCurrentUrl]);

  // Copy URL fallback
  const handleCopyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = getCurrentUrl();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [getCurrentUrl]);

  return (
    <div className="share-buttons">
      <span className="share-label">결과 공유하기</span>
      <div className="share-button-group">
        {/* KakaoTalk */}
        <button
          type="button"
          className="share-btn share-btn-kakao"
          onClick={handleKakaoShare}
          aria-label="카카오톡으로 공유"
          title={kakaoReady ? '카카오톡으로 공유' : 'URL 복사'}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.64 6.73-.14.53-.92 3.39-.95 3.63 0 0-.02.16.08.22.1.06.22.02.22.02.29-.04 3.35-2.2 3.88-2.58.68.1 1.39.15 2.13.15 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z"/>
          </svg>
          <span>카카오톡</span>
        </button>

        {/* Naver Band */}
        <button
          type="button"
          className="share-btn share-btn-band"
          onClick={handleBandShare}
          aria-label="네이버 밴드로 공유"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
          </svg>
          <span>밴드</span>
        </button>

        {/* Copy URL */}
        <button
          type="button"
          className="share-btn share-btn-copy"
          onClick={handleCopyUrl}
          aria-label="URL 복사"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span>{copied ? '복사됨!' : 'URL 복사'}</span>
        </button>
      </div>
    </div>
  );
}
