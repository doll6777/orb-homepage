import AutoGallery from './components/AutoGallery';
import SiteMotion from './components/SiteMotion';

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
      '급성 통증부터 오래된 퇴행성 척추질환까지, 병기에 맞는 처치와 재활 방향을 안내합니다.',
  },
  {
    number: '02',
    title: '자율신경 · 뇌파검사',
    image: '/orb-qeeg-test.jpeg',
    alt: '정량뇌파검사 장면',
    body:
      '자율신경검사와 QEEG-32FX로 뇌의 피로도와 회복 신호를 확인합니다.',
  },
  {
    number: '03',
    title: '스트레스 · 신경증',
    image: '/orb-treatment-bed.jpeg',
    alt: '오브한의원 치료실 장면',
    body:
      '과민감, 브레인포그, 우울감으로 이어지는 불편함을 회복 흐름 안에서 살핍니다.',
  },
  {
    number: '04',
    title: '다이어트 · 열대사',
    image: '/orb-acurex-blue.png',
    alt: '약침 제품 이미지',
    body:
      '뇌의 에너지 센서, 항상성 회로, 장내 환경의 균형에서 접근합니다.',
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

const galleryImages = [
  {
    number: '01',
    src: '/orb-pdf-logo-wall.jpg',
    alt: '오브한의원 로고 월과 입구 공간',
    label: 'Logo Wall',
  },
  {
    number: '02',
    src: '/orb-pdf-lobby-wide.jpg',
    alt: '오브한의원 로비와 대기 공간',
    label: 'Lobby',
  },
  {
    number: '03',
    src: '/orb-pdf-wayfinding.jpg',
    alt: '오브한의원 안내 사인과 복도',
    label: 'Wayfinding',
  },
  {
    number: '04',
    src: '/orb-pdf-glass-room.jpg',
    alt: '오브한의원 상담실 유리 공간',
    label: 'Consult',
  },
  {
    number: '05',
    src: '/orb-pdf-treatment-room.jpg',
    alt: '오브한의원 치료 공간',
    label: 'Treatment',
  },
  {
    number: '06',
    src: '/orb-pdf-treatment-wide.jpg',
    alt: '오브한의원 치료실 전경',
    label: 'Care Room',
  },
  {
    number: '07',
    src: '/orb-pdf-therapy-room.jpg',
    alt: '오브한의원 관리 공간',
    label: 'Therapy',
  },
];

const naverPlaceUrl =
  'https://pcmap.place.naver.com/hospital/2005324011/home';
const phoneDisplay = '0507-1383-5982';
const phoneHref = 'tel:050713835982';
const siteUrl = 'https://orb-korean-medicine-clinic.hyeranlee.chatgpt.site';

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: '오브한의원 마곡점',
  alternateName: 'ORB Korean Medicine Clinic Magok',
  url: siteUrl,
  telephone: phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '서울',
    addressLocality: '강서구',
    streetAddress: '마곡중앙로 111 104동 2층 238호, 239호',
  },
  medicalSpecialty: [
    'Korean Medicine',
    'Pain Management',
    'Neuropsychiatry',
    'Rehabilitation',
  ],
  availableService: treatmentAreas,
};

export default function Home() {
  return (
    <main className="site-shell">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <header className="global-header" aria-label="오브한의원">
        <a className="wordmark" href="#top" aria-label="오브한의원 홈">
          ORB
        </a>
        <div className="header-actions">
          <a href="/en" hrefLang="en" aria-label="View in English">
            EN
          </a>
          <a href="#contact">예약하기</a>
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
          <p className="brand-kicker">ORIGIN · RESET · BALANCE</p>
          <h1>오브 치료의 기준</h1>
          <p>
            마곡 오브한의원은 1차의료기관 한의원에서 할 수 있는 최선의 치료를
            제안합니다.
          </p>
        </div>
        <figure className="hero-photo">
          <img src="/orb-pdf-lobby-front.jpg" alt="오브한의원 대기실 공간" />
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
        </div>
        <figure className="principle-photo">
          <img src="/orb-pdf-corridor.jpg" alt="오브한의원 복도와 유리 공간" />
        </figure>
      </section>

      <section className="snap-section gallery-section" id="space-gallery">
        <div className="gallery-heading">
          <p className="eyebrow">SPACE</p>
          <h2>공간 둘러보기</h2>
        </div>
        <AutoGallery
          images={galleryImages}
          ariaLabel="오브한의원 내부 사진 자동 슬라이더"
        />
      </section>

      <section className="snap-section contact-section" id="contact">
        <div className="letter">
          <p className="eyebrow">RESERVATION</p>
          <h2>예약 및 문의</h2>
          <p>
            오브한의원 마곡점은 전화 문의와 네이버 플레이스에서 확인하실 수
            있습니다.
          </p>
          <address className="clinic-address">
            서울 강서구 마곡중앙로 111
            <br />
            104동 2층 238호, 239호
            <br />
            마곡나루역 5번 출구에서 136m
          </address>
          <div className="reservation-info">
            <span>전화번호</span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <div className="outline-actions" aria-label="예약 및 문의">
            <a href={naverPlaceUrl} target="_blank" rel="noreferrer">
              네이버 페이지
            </a>
            <a href={phoneHref}>전화하기</a>
          </div>
        </div>
        <div className="membership">
          <p className="eyebrow">MEMBERSHIP</p>
          <ul>
            {memberships.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
