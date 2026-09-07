const treatments = [
  ['01', '통증'],
  ['02', '교통사고'],
  ['03', '체형 · 추나'],
  ['04', '여성 · 소화기'],
];

const hours = [
  ['월 · 수 · 금', '10:00 - 20:30'],
  ['화 · 목', '10:00 - 19:00'],
  ['토요일', '09:30 - 14:00'],
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="global-header" aria-label="오브한의원">
        <a className="wordmark" href="#top" aria-label="오브한의원 홈">
          ORB
        </a>
        <div className="header-actions">
          <a href="#location">예약하기</a>
          <button className="menu-button" aria-label="메뉴 열기">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className="side-index" aria-label="섹션 이동">
        <span aria-hidden="true" />
        <a href="#top">01</a>
        <a href="#treatments">02</a>
        <a href="#philosophy">03</a>
        <a href="#location">04</a>
      </nav>

      <section className="snap-section opening" id="top" aria-label="오브한의원 소개">
        <div className="hero-panel">
          <img src="/hero-room.jpg" alt="" className="hero-image" />
          <div className="scroll-cue" aria-hidden="true">
            <span>SCROLL</span>
            <i />
          </div>
        </div>

        <div className="treatment-grid" id="treatments">
          {treatments.map(([number, label]) => (
            <a href="#philosophy" className="treatment-column" key={number}>
              <span className="treatment-number">{number}</span>
              <i aria-hidden="true" />
              <strong>{label}</strong>
              <small>자세히 보기 <span>→</span></small>
            </a>
          ))}
        </div>
      </section>

      <section className="snap-section split-section" id="philosophy">
        <div className="photo-pane">
          <img src="/treatment-room.jpg" alt="따뜻한 빛이 들어오는 오브한의원 치료 공간" />
        </div>
        <div className="copy-pane">
          <p className="process">진단 <span /> 설명 <span /> 치료</p>
          <h2>
            오브한의원은
            <br />
            지금, 가장 필요한 치료에 집중합니다.
          </h2>
          <a href="#diagnostics" className="text-link">자세히 보기 <span>→</span></a>
        </div>
      </section>

      <section className="snap-section split-section reverse" id="diagnostics">
        <div className="copy-pane">
          <p className="eyebrow">DIAGNOSTICS</p>
          <h2>
            자율신경 검사
            <em>Autonomic Nervous System</em>
          </h2>
          <a href="#space" className="text-link">자세히 보기 <span>→</span></a>
        </div>
        <div className="photo-pane">
          <img src="/diagnostic-detail.jpg" alt="오브한의원의 진단 공간과 자연광" />
        </div>
      </section>

      <section className="snap-section space-section" id="space">
        <div className="space-copy">
          <p className="eyebrow">SPACE</p>
          <h2>공간</h2>
          <p>
            일회의 속도를 잠시 낮출 수 있는,
            <br />
            차분한 공간을 위해.
          </p>
        </div>
        <img className="space-main" src="/space-main.jpg" alt="오브한의원 내부 공간" />
        <div className="space-stack">
          <img src="/space-side-a.jpg" alt="오브한의원 대기 공간" />
          <img src="/space-side-b.jpg" alt="오브한의원 자연 소재 디테일" />
        </div>
      </section>

      <section className="snap-section split-section" id="team">
        <div className="photo-pane">
          <img src="/doctor-atmosphere.jpg" alt="오브한의원 진료 분위기" />
        </div>
        <div className="copy-pane">
          <p className="eyebrow">MEDICAL TEAM</p>
          <h2>의료진</h2>
          <a href="#location" className="text-link">자세히 보기 <span>→</span></a>
        </div>
      </section>

      <section className="snap-section location-section" id="location">
        <div className="location-copy">
          <p className="eyebrow">LOCATION</p>
          <h2>오시는 길</h2>
          <p>
            마곡나루역 5번 출구에서
            <br />
            136m, 오브한의원.
          </p>
          <div className="outline-actions" aria-label="예약 및 지도 링크">
            <a href="https://map.naver.com/" target="_blank" rel="noreferrer">네이버 지도</a>
            <a href="#top">예약하기</a>
            <a href="tel:02-0000-0000">전화하기</a>
          </div>
        </div>
        <div className="wayfinding" aria-label="마곡나루역 5번 출구에서 오브한의원까지 도보 136미터">
          <p>MAGONGNARU</p>
          <div>
            <strong>05</strong>
            <span>→</span>
            <strong>ORB</strong>
          </div>
          <dl>
            <dt>마곡나루역 5번 출구</dt>
            <dd>오브한의원</dd>
          </dl>
          <small>도보 136m</small>
        </div>
      </section>

      <footer className="snap-section site-footer">
        <div className="footer-brand">
          <strong>ORB</strong>
          <span>오브한의원</span>
        </div>
        <address>
          <b>Address</b>
          서울 강서구 마곡중앙로 111
          <br />
          104동 2층 238호, 239호
        </address>
        <div>
          <b>Phone</b>
          <a href="tel:02-0000-0000">02-0000-0000</a>
        </div>
        <div>
          <b>Treatment hours</b>
          {hours.map(([day, time]) => (
            <p key={day}>{day} {time}</p>
          ))}
        </div>
        <div className="footer-links">
          <a href="https://map.naver.com/" target="_blank" rel="noreferrer">Naver</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
          <small>© ORB Korean Medicine Clinic</small>
        </div>
      </footer>
    </main>
  );
}
