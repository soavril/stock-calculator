# 주식 물타기 계산기 - 개발 현황

## 프로젝트 개요

한국 개인 투자자를 타겟으로 한 주식 계산기 웹사이트. Google Ads 수익화 목표.

- **기술 스택**: Next.js 16 App Router + TypeScript
- **디자인**: 모바일 퍼스트, UI 라이브러리 없음
- **언어**: 한국어 (lang="ko")

---

## 완료된 기능

### 핵심 구조
- [x] Next.js 프로젝트 셋업 (/src 없음)
- [x] TypeScript 설정
- [x] 글로벌 CSS (변수, 반응형)
- [x] MarketContext (시장 모드 + 환율 상태 관리)
- [x] 공통 컴포넌트 (NumberInput, CalculatorCard, MarketTabs, FXInput)

### 3개 메인 계산기
- [x] **물타기/불타기 계산기** (AveragingCalculator)
  - 평균가 계산
  - Before/After 본전 수익률 비교
  - 물타기/불타기/동일가 자동 감지
  - 현재가 입력 옵션 (접이식)
  - 한글화 완료

- [x] **손실 회복 계산기** (LossRecoveryCalculator)
  - 손실률 계산
  - 본전까지 필요 수익률
  - 손실률 vs 회복 수익률 참조 테이블
  - 한글화 완료

- [x] **매도가 계획** (ExitPricePlanner)
  - 목표가 직접 입력 / 목표 수익률 입력 모드 토글
  - 예상 수익/손실 계산
  - 한글화 완료

### 미국 주식 모드 기능
- [x] 시장 탭 토글 (국내 주식 / 미국 주식)
- [x] 실시간 환율 API (`/api/fx/route.ts`)
  - Frankfurter API + fallback
  - 1시간 캐싱
  - 수동 환율 편집 기능
  - 새로고침 버튼
- [x] USD + KRW 이중 표시
- [x] **원화 투자금액 → 주식 수량 자동 계산** (AveragingCalculator)
  - 버튼 토글로 통화 선택 (원화/달러)
  - 환율 적용하여 매수 가능 주식 수 표시

### SEO / Ads 준비
- [x] 메타데이터 (title, description, keywords, OG)
- [x] 개인정보처리방침 페이지 (`/privacy`)
- [x] 광고 슬롯 플레이스홀더 3개
- [x] CLS 방지 (결과 영역 항상 렌더링)

---

## 진행 중

### 앵커 네비게이션 시스템
- [x] AveragingCalculator에 `id="averaging"` 추가
- [x] CalculatorCard에 `id` prop 추가
- [x] LossRecoveryCalculator에 id 추가
- [x] ExitPricePlanner에 id 추가
- [x] 페이지 상단에 빠른 이동 링크
- [x] 모바일용 스크롤 투 탑 버튼

### CSS 추가 완료
- [x] `.currency-toggle-group` 스타일
- [x] `.currency-btn` 스타일
- [x] `.quick-nav`, `.quick-nav-link` 스타일
- [x] `.scroll-to-top` 스타일
- [x] `scroll-behavior: smooth` 추가

---

## 남은 작업

### 필수 (Ads 승인 전 완료) - 모두 완료 ✓
1. ~~앵커 네비게이션 구현 완료~~ ✓
2. ~~빌드 테스트 및 오류 수정~~ ✓
3. ~~robots.txt 추가~~ ✓
4. ~~파비콘~~ ✓ (SVG 아이콘)
5. ~~개인정보처리방침~~ ✓ (/privacy)
6. ~~이용약관~~ ✓ (/terms)
7. ~~문의하기~~ ✓ (/contact)
8. ~~공통 푸터 (법적 링크)~~ ✓

### 권장 개선사항

#### UX 개선
- [x] 숫자 입력 시 천단위 쉼표 자동 포맷팅
- [x] 입력 필드 클리어 버튼 (×)
- [x] 계산 결과 애니메이션 (값 변경 시 펄스 효과)
- [x] 다크 모드 지원 (시스템 설정 연동)
- [ ] PWA 지원 (오프라인 사용)

#### 기능 추가
- [ ] 계산 결과 공유 (링크 또는 이미지)
- [x] 계산 히스토리 저장 훅 (useLocalStorage, useCalculationHistory)
- [ ] 분할 매수 시뮬레이터 (N회 분할 시 평균가 변화)
- [ ] 목표가 알림 설정 (브라우저 알림)

#### SEO / 마케팅
- [x] 구조화된 데이터 (Schema.org JSON-LD)
- [x] Sitemap.xml (Next.js 자동 생성)
- [ ] 블로그 섹션 (투자 관련 팁)
- [ ] 소셜 미디어 공유 버튼
- [ ] OG 이미지 (소셜 미디어 썸네일)

#### 성능
- [ ] Lighthouse 점수 최적화
- [ ] 이미지 최적화 (next/image 활용)
- [ ] 폰트 최적화

#### 코드 품질
- [ ] 유닛 테스트 추가 (calc.ts)
- [ ] E2E 테스트 (Playwright)
- [ ] ESLint/Prettier 설정 강화

---

## 파일 구조

```
stock-calculator/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (메타데이터 템플릿)
│   ├── page.tsx                # 메인 허브 페이지
│   ├── globals.css             # 글로벌 스타일 (다크모드 포함)
│   ├── icon.svg                # 파비콘
│   ├── sitemap.ts              # 사이트맵 생성
│   ├── averaging-calculator/
│   │   └── page.tsx            # 물타기 계산기 (SEO 최적화)
│   ├── loss-recovery-calculator/
│   │   └── page.tsx            # 손실 회복 계산기 (SEO 최적화)
│   ├── exit-price-planner/
│   │   └── page.tsx            # 매도가 계획 (SEO 최적화)
│   ├── api/
│   │   └── fx/route.ts         # 환율 API
│   └── privacy/
│       └── page.tsx            # 개인정보처리방침
├── components/
│   ├── AveragingCalculator.tsx   # 물타기/불타기 계산기
│   ├── LossRecoveryCalculator.tsx # 손실 회복 계산기
│   ├── ExitPricePlanner.tsx      # 매도가 계획
│   ├── SharedLayout.tsx          # 공유 레이아웃 (네비게이션, 푸터)
│   ├── Navigation.tsx            # 메인 네비게이션
│   ├── CalculatorCard.tsx        # 카드 래퍼
│   ├── NumberInput.tsx           # 숫자 입력 (천단위, 클리어)
│   ├── MarketTabs.tsx            # 시장 탭
│   └── FXInput.tsx               # 환율 입력
├── lib/
│   ├── types.ts          # 타입 정의
│   ├── calc.ts           # 계산 로직
│   ├── format.ts         # 포맷팅 유틸
│   ├── MarketContext.tsx # 전역 상태
│   └── useLocalStorage.ts # localStorage 훅
├── public/
│   └── robots.txt        # 크롤러 설정
└── PLAN.md               # 이 파일
```

---

## SEO 최적화 (완료)

### URL 구조
| URL | 타겟 키워드 | 우선순위 |
|-----|------------|---------|
| `/` | 주식 계산기 | 1.0 |
| `/averaging-calculator` | 물타기 계산기, 평단가 계산기 | 0.9 |
| `/loss-recovery-calculator` | 손실 회복 계산기, 본전 계산기 | 0.9 |
| `/exit-price-planner` | 매도가 계산기, 수익 계산기 | 0.9 |

### 페이지별 최적화
- 개별 메타데이터 (title, description, keywords)
- Canonical URL 설정
- Open Graph 태그
- JSON-LD 구조화 데이터 (WebApplication)
- SEO 콘텐츠 섹션 (관련 정보, FAQ)

### 내부 링크
- 메인 허브에서 각 계산기로 연결
- SEO 콘텐츠에서 관련 계산기 상호 링크
- 네비게이션으로 전체 사이트 연결

---

## 메모

### 사용자 피드백 반영
- 통화 토글: 클릭 가능한 심볼 → 명시적 버튼 토글로 변경 (UX 개선)
- 기본 통화: 미국 주식 모드에서도 기본값 원화 (한국 사용자 중심)

### 기술적 결정
- UI 라이브러리 없이 순수 CSS (빠른 로딩, 번들 크기 최소화)
- 서버 컴포넌트 대신 클라이언트 컴포넌트 (인터랙티브 계산기 특성)
- API 환율: 1시간 캐싱으로 API 호출 최소화

---

---

## UX 개선 (물타기 계산기)

### Before → After

| 항목 | Before | After |
|------|--------|-------|
| 결과 표시 | 현재가 필수, "—" 많음 | 기본 결과 항상 표시 |
| 핵심 결과 | 여러 결과 동일 크기 | **새 평균가** 히어로로 강조 |
| 본전 비교 | 항상 표시 (비어있음) | 선택적, 유도 UI |
| 물타기 방향 | 텍스트만 | 뱃지 + 이모지 + 색상 |
| 사용자 안내 | 일반적 | 상황별 맞춤 팁 |

### 새 결과 구조
```
┌─────────────────────────┐
│  [히어로] 새 평균가      │ ← 가장 강조
│  📉 물타기               │
│  ₩45,000 (▼10%)         │
└─────────────────────────┘
┌─────────────────────────┐
│  총 수량: 150주          │ ← 필수 결과
│  총 투자금: ₩6,750,000   │
└─────────────────────────┘
┌─────────────────────────┐
│ 💡 현재가를 입력하면...  │ ← 선택적 (유도)
│    [본전 난이도 비교]    │
└─────────────────────────┘
```

---

## 광고 및 분석

### AdSlot 컴포넌트
- `components/AdSlot.tsx` - CLS 방지 광고 슬롯
- 환경 변수: `NEXT_PUBLIC_ADS_ENABLED=true`
- 포맷: horizontal (90px), rectangle (250px), native (120px)
- 모바일: middle 슬롯 숨김 (스팸 방지)

### 광고 배치
| 위치 | 슬롯 | 포맷 |
|------|------|------|
| 상단 (계산기 전) | top | horizontal |
| 중간 (결과 후) | middle | native |
| 하단 (푸터 전) | bottom | horizontal |

### Analytics
- `lib/analytics.ts` - 경량 분석 추상화
- 이벤트: `calculator_interaction`, `market_switch`, `fx_refresh`
- GA4 전환: `window.gtag()` 연동 준비 완료

*최종 업데이트: 2026-02-02 (AdSlot + Analytics 완료)*
