import AutoGallery from './components/AutoGallery';
import ClinicFooter from './components/ClinicFooter';
import ClinicHeader from './components/ClinicHeader';
import SiteMotion from './components/SiteMotion';
import { columnPosts } from './column/column-data';

const treatmentAreas = [
  '통증',
  '자율신경실조증',
  '스트레스',
  '신경증',
  '다이어트',
  '열대사장애',
  '교통사고 후유증',
];

const treatmentPillars = [
  {
    number: '01',
    title: '통증 · 추나',
    caption: '근골격계 통증과 척추관절 회복',
    href: '/treatments/pain-chuna',
  },
  {
    number: '02',
    title: '자율신경',
    caption: '뇌파검사와 신경계 피로도 진단',
    href: '/treatments/autonomic-qeeg',
  },
  {
    number: '03',
    title: '스트레스 · 신경증',
    caption: '과민감, 브레인포그, 정서 피로',
    href: '/treatments/stress-neurosis',
  },
  {
    number: '04',
    title: '다이어트 · 열대사',
    caption: '대사 균형과 체중 관리',
    href: '/treatments/weight-metabolism',
  },
];

const programs = [
  {
    number: '01',
    title: '통증 · 추나',
    image: '/orb-chuna-room.png',
    alt: '오브한의원 추나 치료 장면',
    body:
      '급성 통증부터 오래된 퇴행성 척추질환까지, 병기에 맞는 처치와 재활 방향을 안내합니다.',
    href: '/treatments/pain-chuna',
  },
  {
    number: '02',
    title: '자율신경 · 뇌파검사',
    image: '/orb-qeeg-test.jpeg',
    alt: '정량뇌파검사 장면',
    body:
      '자율신경검사와 QEEG-32FX로 뇌의 피로도와 회복 신호를 확인합니다.',
    href: '/treatments/autonomic-qeeg',
  },
  {
    number: '03',
    title: '스트레스 · 신경증',
    image: '/orb-treatment-bed.jpeg',
    alt: '오브한의원 치료실 장면',
    body:
      '과민감, 브레인포그, 우울감으로 이어지는 불편함을 회복 흐름 안에서 살핍니다.',
    href: '/treatments/stress-neurosis',
  },
  {
    number: '04',
    title: '다이어트 · 열대사',
    image: '/orb-space-consult.jpg',
    alt: '오브한의원 상담 및 검사 공간',
    body:
      '뇌의 에너지 센서, 항상성 회로, 장내 환경의 균형에서 접근합니다.',
    href: '/treatments/weight-metabolism',
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
    src: '/orb-space-lobby-wide.jpg',
    alt: '오브한의원 로비와 대기 공간 전경',
    label: 'Lobby',
  },
  {
    number: '02',
    src: '/orb-space-reception.jpg',
    alt: '오브한의원 안내 데스크 정면',
    label: 'Reception',
  },
  {
    number: '03',
    src: '/orb-space-lobby-detail.jpg',
    alt: '오브한의원 안내 데스크와 대기 공간',
    label: 'Welcome',
  },
  {
    number: '04',
    src: '/orb-space-waiting.jpg',
    alt: '오브한의원 대기 공간과 편의 시설',
    label: 'Waiting',
  },
  {
    number: '05',
    src: '/orb-space-corridor.jpg',
    alt: '오브한의원 진료실로 이어지는 복도',
    label: 'Corridor',
  },
  {
    number: '06',
    src: '/orb-space-consult.jpg',
    alt: '오브한의원 상담 및 검사 공간',
    label: 'Consult',
  },
  {
    number: '07',
    src: '/orb-space-treatment.jpg',
    alt: '오브한의원 치료실 전경',
    label: 'Treatment',
  },
  {
    number: '08',
    src: '/orb-space-care-room.jpg',
    alt: '오브한의원 독립 치료 공간',
    label: 'Care Room',
  },
];

const naverPlaceUrl =
  'https://pcmap.place.naver.com/hospital/2005324011/home';
const naverBookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';
const kakaoMapUrl =
  'https://map.kakao.com/link/search/%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90%20%EB%A7%88%EA%B3%A1%EC%A0%90';
const kakaoChatUrl = 'https://pf.kakao.com/_nXGxaX/chat';
const googleMapUrl =
  'https://www.google.com/maps/search/?api=1&query=%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90+%EB%A7%88%EA%B3%A1%EC%A0%90+%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111';
const googleMapEmbedUrl =
  'https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111&output=embed';
const mapLinks = [
  { label: 'NAVER', name: '네이버 지도', href: naverPlaceUrl },
  { label: 'KAKAO', name: '카카오맵', href: kakaoMapUrl },
  { label: 'GOOGLE', name: '구글 지도', href: googleMapUrl },
];
const phoneDisplay = '02-6959-5982';
const phoneHref = 'tel:0269595982';
const siteUrl = 'https://orbclinic.pages.dev';

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: '오브한의원 마곡점',
      alternateName: 'ORB Korean Medicine Clinic Magok',
      inLanguage: 'ko-KR',
    },
    {
      '@type': 'MedicalClinic',
      '@id': `${siteUrl}/#clinic`,
      name: '오브한의원 마곡점',
      alternateName: 'ORB Korean Medicine Clinic Magok',
      description:
        '마곡나루역 5번 출구 인근에서 통증·추나, 자율신경·뇌파검사, 스트레스·신경증, 다이어트·열대사 진료를 안내하는 한의원입니다.',
      url: siteUrl,
      logo: `${siteUrl}/favicon-512.png`,
      image: `${siteUrl}/orb-space-lobby-wide.jpg`,
      telephone: '+82-2-6959-5982',
      hasMap: googleMapUrl,
      sameAs: [naverPlaceUrl, kakaoMapUrl, kakaoChatUrl],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KR',
        addressRegion: '서울특별시',
        addressLocality: '강서구',
        streetAddress: '마곡중앙로 111 롯데캐슬 르웨스트 104동 2층 238호, 239호',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-2-6959-5982',
        contactType: '예약 및 진료 문의',
        availableLanguage: ['Korean', 'English'],
      },
      areaServed: ['마곡동', '마곡나루역', '서울 강서구'],
      medicalSpecialty: [
        'Korean Medicine',
        'Pain Management',
        'Neuropsychiatry',
        'Rehabilitation',
      ],
      availableService: treatmentAreas.map((name) => ({
        '@type': 'Service',
        name,
      })),
    },
  ],
};

export default function Home() {
  return (
    <main className="site-shell">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <ClinicHeader />

      <nav className="side-index" aria-label="섹션 이동">
        <span aria-hidden="true" />
        <a href="#top">01</a>
        <a href="#areas">02</a>
        <a href="#programs">03</a>
        <a href="#space-gallery">04</a>
        <a href="#directions">05</a>
        <a href="#contact">06</a>
      </nav>

      <aside className="map-quick-links" aria-label="지도 바로가기">
        {mapLinks.map((link) => (
          <a
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noreferrer"
            aria-label={`${link.name}에서 오브한의원 보기`}
          >
            {link.label}
          </a>
        ))}
      </aside>

      <section className="snap-section treat-hero" id="top">
        <figure className="hero-photo">
          <img src="/orb-space-lobby-wide.jpg" alt="오브한의원 로비와 대기 공간" />
        </figure>
        <div className="hero-identity">
          <p>MAGOKNARU · ORB CLINIC</p>
          <h1>오브한의원 마곡점</h1>
          <span>마곡나루역 5번 출구에서 136m</span>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="snap-section area-section" id="areas">
        <div className="area-intro">
          <p className="eyebrow">TREATMENT</p>
          <h2>마곡나루역 오브한의원의 주요 진료</h2>
          <p className="area-description">
            오브한의원 마곡점은 마곡나루역 5번 출구에서 136m 거리에
            있습니다. 통증·추나, 자율신경·뇌파검사, 스트레스·신경증,
            다이어트·열대사 진료를 안내합니다.
          </p>
        </div>
        <div className="area-grid">
          {treatmentPillars.map((area) => (
            <a href={area.href} className="area-item" key={area.title}>
              <span>{area.number}</span>
              <strong>{area.title}</strong>
              <small>{area.caption}</small>
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
              <a className="program-detail-link" href={program.href}>
                진료 안내 보기 <span aria-hidden="true">→</span>
              </a>
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
          <img src="/orb-space-corridor.jpg" alt="오브한의원 진료실 복도" />
        </figure>
      </section>

      <section className="home-column-section" aria-labelledby="home-column-title">
        <div className="home-column-heading">
          <div>
            <p className="eyebrow">ORB MEDICAL COLUMN</p>
            <h2 id="home-column-title">몸의 신호를 이해하는 글</h2>
          </div>
          <a href="/column">의료 칼럼 전체보기 →</a>
        </div>
        <div className="home-column-grid">
          {columnPosts.map((post, index) => (
            <a href={`/column/${post.slug}`} key={post.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <time dateTime={post.publishedAt}>{post.displayDate}</time>
            </a>
          ))}
        </div>
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

      <section className="snap-section visit-section" id="directions">
        <div className="visit-copy">
          <p className="eyebrow">LOCATION</p>
          <h2>오는 길</h2>
          <address className="visit-address">
            서울 강서구 마곡중앙로 111
            <br />
            롯데캐슬 르웨스트 104동 2층 238호, 239호
          </address>
          <dl className="route-details">
            <div>
              <dt>지하철</dt>
              <dd>9호선·공항철도 마곡나루역 5번 출구에서 도보 136m</dd>
            </div>
            <div>
              <dt>건물 안내</dt>
              <dd>지하 2층 상가용 엘리베이터를 이용해 104동 2층으로 올라오세요.</dd>
            </div>
            <div>
              <dt>진료시간</dt>
              <dd>평일 10:30–20:20 · 휴게시간 14:10–15:00 · 토요일은 네이버 예약에서 확인</dd>
            </div>
            <div>
              <dt>주차</dt>
              <dd>건물 지하주차장 이용 시 2시간 무료입니다.</dd>
            </div>
          </dl>
          <div className="map-actions" aria-label="지도에서 위치 확인">
            {mapLinks.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                <span>{link.name}</span>
                <b aria-hidden="true">↗</b>
              </a>
            ))}
          </div>
        </div>
        <div className="map-panel">
          <iframe
            src={googleMapEmbedUrl}
            title="오브한의원 마곡점 위치 지도"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="snap-section contact-section" id="contact">
        <div className="letter">
          <p className="eyebrow">RESERVATION</p>
          <h2>예약 및 문의</h2>
          <p>
            오브한의원 마곡점은 네이버 예약, 카카오톡 상담 또는 전화로
            문의하실 수 있습니다.
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
            <a href={naverBookingUrl} target="_blank" rel="noreferrer">
              네이버 예약
            </a>
            <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
              카카오톡 상담
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
      <aside className="mobile-cta" aria-label="모바일 예약 및 문의">
        <a href={naverBookingUrl} target="_blank" rel="noreferrer">네이버 예약</a>
        <a href={kakaoChatUrl} target="_blank" rel="noreferrer">카카오톡 상담</a>
        <a href={phoneHref}>전화하기</a>
      </aside>
      <ClinicFooter />
    </main>
  );
}
