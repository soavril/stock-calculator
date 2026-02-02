'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/averaging-calculator', label: '물타기 계산기' },
  { href: '/loss-recovery-calculator', label: '손실 회복' },
  { href: '/exit-price-planner', label: '매도 계획' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="main-nav" aria-label="계산기 네비게이션">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-link ${pathname === item.href ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
