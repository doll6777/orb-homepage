const treatmentAreas = [
  '통증',
  '자율신경실조증',
  '스트레스',
  '신경증',
  '다이어트',
  '열대사장애',
  '교통사고 후유증',
];

const programs = [
  {
    number: '01',
    title: '통증 · 추나',
    image: '/orb-chuna-room.png',
    alt: '오브한의원 추나 치료 장면',
    body:
      '기초적인 근골격계 통증부터 오래된 퇴행성 척추질환까지 병기에 맞는 처치와 재활 정보를 안내합니다.',
  },
  {
    number: '02',
    title: '자율신경 · 뇌파검사',
    image: '/orb-qeeg-test.jpeg',
    alt: '정량뇌파검사 장면',
    body:
      '자율신경검사와 습식 정량뇌파진단기(QEEG-32FX)를 통해 뇌의 피로도를 객관적으로 확인합니다.',
  },
  {
    number: '03',
    title: '스트레스 · 신경증',
    image: '/orb-treatment-bed.jpeg',
    alt: '오브한의원 치료실 장면',
    body:
      '과민감, 브레인포그, 우울감, ADHD 양상까지 이어지는 불편함을 하나의 회복 흐름 안에서 살핍니다.',
  },
  {
    number: '04',
    title: '다이어트 · 열대사',
    image: '/orb-acurex-blue.png',
    alt: '약침 제품 이미지',
    body:
      '의지의 문제가 아니라 뇌의 에너지 센서와 항상성 회로, 장내 환경의 균형에서 접근합니다.',
  },
];

const memberships = [
  '대한한의사협회 회원',
  '척추신경추나의학회 회원',
  '대한한의학회 회원',
  '대한한방비만학회 회원',
  '대한통합암학회 회원',
  '대한뇌파한의학회 회원',
  '한의정보협동조합 회원',
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="global-header" aria-label="오브한의원">
        <a className="wordmark logo-link" href="#top" aria-label="오브한의원 홈">
          <img src="/orb-logo-cream.png" alt="오브한의원" />
        </a>
        <div className="header-actions">
          <a href="#contact">예약하기</a>
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
        <a href="#areas">02</a>
        <a href="#programs">03</a>
        <a href="#contact">04</a>
      </nav>

      <section className="snap-section treat-hero" id="top">
        <div className="hero-copy">
          <img className="hero-logo" src="/orb-logo-cream.png" alt="오브한의원" />
          <p className="brand-kicker">ORB KOREAN MEDICINE CLINIC</p>
          <h1>무엇을 치료하나요</h1>
          <p>
            다년간의 병, 의원 경력을 통해 1차의료기관 한의원에서 할 수 있는
            최선의 치료를 제안합니다.
          </p>
        </div>
        <figure className="hero-photo">
          <img src="/orb-space-lobby.png" alt="오브한의원 대기실 공간" />
        </figure>
        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="snap-section area-section" id="areas">
        <div className="area-intro">
          <p className="eyebrow">TREATMENT</p>
          <h2>무엇을 치료하나요</h2>
        </div>
        <div className="area-grid">
          {treatmentAreas.map((area, index) => (
            <a href="#programs" className="area-item" key={area}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{area}</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="programs" id="programs" aria-label="주요 치료 설명">
        {programs.map((program, index) => (
          <section
            className={`snap-section program-section ${index % 2 === 1 ? 'reverse' : ''}`}
            key={program.title}
          >
            <figure className="program-photo">
              <img src={program.image} alt={program.alt} />
            </figure>
            <div className="program-copy">
              <span>{program.number}</span>
              <h2>{program.title}</h2>
              <p>{program.body}</p>
            </div>
          </section>
        ))}
      </section>

      <section className="snap-section principle-section">
        <div className="principle-copy">
          <p className="eyebrow">ORIGIN · RESET · BALANCE</p>
          <h2>
            원인을 진단하고,
            <br />
            회복의 방향을 다시 맞춥니다.
          </h2>
          <p>
            체계적인 통증 치료와 신경질환의 뇌과학적 접근으로 균형 잡힌 몸을
            만들어 갑니다.
          </p>
        </div>
        <figure className="principle-photo">
          <img src="/orb-glass-space.png" alt="오브한의원 유리 파사드 공간" />
        </figure>
      </section>

      <section className="snap-section contact-section" id="contact">
        <div className="letter">
          <p className="eyebrow">FROM ORB</p>
          <h2>오브한의원장 드림</h2>
          <p>
            병의 원인(Origin)을 제대로 진단하고 치료(Reset)하며, 최종적으로
            균형(Balance) 잡힌 몸을 목표로 합니다.
          </p>
        </div>
        <div className="membership">
          <p className="eyebrow">MEMBERSHIP</p>
          <ul>
            {memberships.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="outline-actions" aria-label="예약 및 문의">
            <a href="https://map.naver.com/" target="_blank" rel="noreferrer">
              네이버 지도
            </a>
            <a href="tel:02-0000-0000">전화하기</a>
          </div>
        </div>
      </section>
    </main>
  );
}
