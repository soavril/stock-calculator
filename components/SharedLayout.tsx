'use client';

import { ReactNode } from 'react';
import { MarketProvider } from '@/lib/MarketContext';
import Navigation from './Navigation';
import MarketTabs from './MarketTabs';
import FXInput from './FXInput';
import Footer from './Footer';

interface SharedLayoutProps {
  children: ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <MarketProvider>
      <div className="container">
        <header>
          <h1 className="site-title">
            <a href="/">주식 계산기</a>
          </h1>
          <Navigation />
        </header>

        <div className="market-controls">
          <MarketTabs />
          <FXInput />
        </div>

        <main>{children}</main>

        <Footer />
      </div>
    </MarketProvider>
  );
}
