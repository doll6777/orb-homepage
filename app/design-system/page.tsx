import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ORB Design System Preview',
  robots: { index: false, follow: false },
};

const colors = [
  { name: 'Espresso', value: '#2D211B', className: 'espresso' },
  { name: 'Cocoa', value: '#60493D', className: 'cocoa' },
  { name: 'Oat', value: '#F5F0E7', className: 'oat' },
  { name: 'Paper', value: '#FBFAF6', className: 'paper' },
  { name: 'Sage', value: '#747966', className: 'sage' },
];

export default function DesignSystemPage() {
  return (
    <main className="ds-preview">
      <header className="ds-nav">
        <a href="/" className="ds-logo" aria-label="오브한의원 홈">
          ORB
        </a>
        <span>DESIGN SYSTEM 01</span>
        <a href="/column">실제 칼럼 화면 보기 →</a>
      </header>

      <section className="ds-hero">
        <div>
          <p className="ds-kicker">DESIGN DIRECTION · 2026</p>
          <h1>
            Warm Clinical
            <br />
            Editorial
          </h1>
        </div>
        <div className="ds-hero-note">
          <span>따뜻한 신뢰</span>
          <p>
            병원의 전문성은 분명하게, 환자가 느끼는 인상은 편안하게. 오브의
            실제 공간에서 가져온 색과 여백을 일관된 규칙으로 정리했습니다.
          </p>
        </div>
      </section>

      <section className="ds-section ds-colors">
        <header className="ds-section-heading">
          <span>01</span>
          <div>
            <p>COLOR</p>
            <h2>공간에서 가져온 다섯 가지 색</h2>
          </div>
          <p>
            브라운은 신뢰와 중심을, 아이보리는 충분한 여백을, 세이지는 안내와
            상태 표시를 담당합니다.
          </p>
        </header>
        <div className="ds-swatches">
          {colors.map((color) => (
            <article className={`ds-swatch ds-${color.className}`} key={color.name}>
              <strong>{color.name}</strong>
              <span>{color.value}</span>
            </article>
          ))}
        </div>
        <div className="ds-color-rules">
          <p><strong>70%</strong> Paper · Oat</p>
          <p><strong>25%</strong> Espresso · Cocoa</p>
          <p><strong>5%</strong> Sage accent</p>
        </div>
      </section>

      <section className="ds-section ds-type-section">
        <header className="ds-section-heading">
          <span>02</span>
          <div>
            <p>TYPOGRAPHY</p>
            <h2>차분하지만 또렷한 위계</h2>
          </div>
          <p>
            장식적인 서체를 섞지 않고 Pretendard 한 가족 안에서 크기와 굵기로
            정보의 순서를 만듭니다.
          </p>
        </header>
        <div className="ds-type-grid">
          <div className="ds-type-display">
            <small>DISPLAY · 64 / 1.15 · 700</small>
            <p>몸과 마음의 균형을<br />차분하게 살핍니다</p>
          </div>
          <div className="ds-type-copy">
            <small>BODY · 17 / 1.85 · 450</small>
            <p>
              증상 하나만 보지 않고 수면, 스트레스, 통증과 생활의 흐름을 함께
              살핍니다. 이해하기 쉬운 설명과 필요한 검사를 바탕으로 현재의
              상태를 차근차근 확인합니다.
            </p>
            <span>본문은 한 줄 60자 안팎 · 자간 -1.5%</span>
          </div>
        </div>
      </section>

      <section className="ds-section ds-components">
        <header className="ds-section-heading">
          <span>03</span>
          <div>
            <p>COMPONENTS</p>
            <h2>버튼과 안내 요소도 같은 목소리로</h2>
          </div>
          <p>
            둥근 장식 대신 얇은 선, 충분한 패딩, 분명한 대비를 사용합니다.
          </p>
        </header>
        <div className="ds-component-grid">
          <article className="ds-component-block">
            <small>BUTTONS</small>
            <div className="ds-button-row">
              <a className="ds-button-primary" href="#sample">네이버 예약</a>
              <a className="ds-button-secondary" href="#sample">전화 문의</a>
              <a className="ds-button-text" href="#sample">진료 안내 보기 →</a>
            </div>
          </article>
          <article className="ds-component-block">
            <small>LABELS</small>
            <div className="ds-chip-row">
              <span>통증 · 추나</span>
              <span>자율신경</span>
              <span>정량뇌파검사</span>
            </div>
          </article>
          <aside className="ds-notice">
            <span>진료 안내</span>
            <p>토요일 진료시간은 네이버 예약에서 확인해 주세요.</p>
            <a href="#sample">확인하기 →</a>
          </aside>
        </div>
      </section>

      <section className="ds-section ds-sample" id="sample">
        <header className="ds-section-heading">
          <span>04</span>
          <div>
            <p>LIVE SAMPLE</p>
            <h2>실제 화면에 적용하면</h2>
          </div>
          <p>
            사진은 밝게 살리고 텍스트는 단정하게 고정해, 카드마다 같은 브랜드로
            인식되도록 합니다.
          </p>
        </header>
        <div className="ds-sample-grid">
          <article className="ds-sample-card">
            <img src="/orb-qeeg-test.jpeg" alt="오브한의원 정량뇌파 검사 장면" />
            <div>
              <small>자율신경 · 뇌파검사</small>
              <h3>습식 정량뇌파 검사는 무엇을 확인할까요?</h3>
              <a href="/column/wet-qeeg-guide">칼럼 읽기 →</a>
            </div>
          </article>
          <article className="ds-sample-info">
            <span>오브한의원 마곡점</span>
            <h3>진료 전 궁금한 내용을<br />미리 확인해 보세요</h3>
            <p>
              검사 과정과 준비사항, 진료에서 확인하는 내용을 이해하기 쉬운
              의료정보로 정리했습니다.
            </p>
            <div>
              <a href="/column">의료 칼럼 보기</a>
              <a href="/first-visit">첫 방문 안내</a>
            </div>
          </article>
        </div>
      </section>

      <footer className="ds-footer">
        <span>ORB KOREAN MEDICINE CLINIC</span>
        <p>Warm · Clear · Trustworthy</p>
      </footer>
    </main>
  );
}
