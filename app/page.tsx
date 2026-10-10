import AutoGallery from './components/AutoGallery';
import ClinicFooter from './components/ClinicFooter';
import ClinicHeader from './components/ClinicHeader';
import SiteMotion from './components/SiteMotion';
import ResponsiveImage from './components/ResponsiveImage';
import { columnPosts } from './column/column-data';
import { firstVisitQuestions, firstVisitSteps } from './first-visit/visit-data';

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
    label: '통증 · 추나',
    title: '목·어깨·허리가 불편해요',
    image: '/orb-space-care-room.jpg',
    alt: '오브한의원 독립 치료 공간',
    body:
      '불편한 부위와 움직임, 통증이 시작된 시점을 확인하고 진료와 재활 방향을 상담합니다.',
    href: '/treatments/pain-chuna',
  },
  {
    label: '자율신경 · 뇌파검사',
    title: '자율신경·뇌파검사가 궁금해요',
    image: '/orb-qeeg-test.jpeg',
    alt: '정량뇌파검사 장면',
    body:
      '검사 과정과 준비 사항을 살펴보세요. 어떤 검사가 필요한지는 상담과 진찰 후 안내합니다.',
    href: '/treatments/autonomic-qeeg',
  },
  {
    label: '스트레스 · 신경증',
    title: '잠과 스트레스가 고민이에요',
    image: '/orb-treatment-bed.jpeg',
    alt: '오브한의원 치료실 장면',
    body:
      '수면과 기분의 변화, 긴장과 피로 등 일상에서 겪는 불편을 함께 상담합니다.',
    href: '/treatments/stress-neurosis',
  },
  {
    label: '다이어트 · 열대사',
    title: '체중 관리를 시작하고 싶어요',
    image: '/orb-space-consult.jpg',
    alt: '오브한의원 상담 및 검사 공간',
    body:
      '체중 변화와 식사, 수면, 활동 습관을 확인하고 현재 상태에 맞는 관리 방향을 상담합니다.',
    href: '/treatments/weight-metabolism',
  },
];

const clinicFacts = [
  {
    title: '평일 진료',
    body: '월–금 10:30–20:20',
  },
  {
    title: '휴게 · 접수',
    body: '휴게 14:10–15:00 · 접수 19:40 마감',
  },
  {
    title: '토요일 진료',
    body: '13:00–18:00 · 접수 17:20 마감',
  },
  {
    title: '휴진 안내',
    body: '일요일 정기휴무 · 공휴일 일정 별도 안내',
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
      url: `${siteUrl}/`,
      name: '오브한의원 마곡점',
      alternateName: [
        '오브한의원',
        '마곡 오브한의원',
        'ORB Korean Medicine Clinic Magok',
        'orbclinic.pages.dev',
      ],
      inLanguage: 'ko-KR',
      publisher: {
        '@id': `${siteUrl}/#clinic`,
      },
    },
    {
      '@type': 'MedicalClinic',
      '@id': `${siteUrl}/#clinic`,
      name: '오브한의원 마곡점',
      alternateName: 'ORB Korean Medicine Clinic Magok',
      description:
        '마곡나루역 5번 출구 인근에서 통증·추나, 자율신경·뇌파검사, 스트레스·신경증, 다이어트·열대사 진료를 안내하는 한의원입니다.',
      url: `${siteUrl}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon-512.png`,
        contentUrl: `${siteUrl}/favicon-512.png`,
        width: 512,
        height: 512,
      },
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
        availableLanguage: ['Korean'],
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:30',
          closes: '20:20',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '13:00',
          closes: '18:00',
        },
      ],
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
    <main className="site-shell home-page">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <ClinicHeader />

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
          <ResponsiveImage src="/orb-space-lobby-wide.jpg" alt="오브한의원 로비와 대기 공간" sizes="100vw" priority />
        </figure>
        <div className="hero-identity">
          <p>마곡나루역 5번 출구에서 136m</p>
          <h1>오브한의원 마곡점</h1>
          <span>통증·추나 · 자율신경·뇌파 · 스트레스·신경증 · 체중 관리</span>
          <div className="home-hero-actions" aria-label="첫 방문 및 예약">
            <a href={naverBookingUrl} target="_blank" rel="noreferrer">네이버 예약하기</a>
            <a href="#first-visit">첫 방문 안내</a>
          </div>
        </div>
      </section>

      <section className="clinic-facts" aria-label="진료 기본 정보">
        {clinicFacts.map((fact) => (
          <div key={fact.title}>
            <strong>{fact.title}</strong>
            <span>{fact.body}</span>
          </div>
        ))}
      </section>

      <section className="care-section" id="areas" aria-labelledby="care-title">
        <div className="care-heading">
          <p className="eyebrow">진료 안내</p>
          <h2 id="care-title">어떤 불편으로 오셨나요?</h2>
          <p>
            나에게 필요한 진료를 먼저 살펴보세요. 어떤 진료를 선택할지
            고민된다면 예약 전에 문의하실 수 있습니다.
          </p>
        </div>
        <div className="care-grid">
          {programs.map((program) => (
            <article className="care-card" key={program.title}>
              <a href={program.href} aria-label={`${program.title} — ${program.label} 진료 안내`}>
                <figure>
                  <ResponsiveImage src={program.image} alt={program.alt} sizes="(max-width: 700px) calc(100vw - 48px), 42vw" />
                </figure>
                <div>
                  <small>{program.label}</small>
                  <h3>{program.title}</h3>
                  <p>{program.body}</p>
                  <span>{program.label} 진료 알아보기 <b aria-hidden="true">→</b></span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <p className="care-help">
          어떤 진료가 필요한지 잘 모르겠다면{' '}
          <a href={kakaoChatUrl} target="_blank" rel="noreferrer">카카오톡으로 먼저 문의해 주세요 <span aria-hidden="true">↗</span></a>
        </p>
      </section>

      <section className="principle-section home-care-process" aria-labelledby="home-process-title">
        <div className="principle-copy">
          <p className="eyebrow">첫 진료는 이렇게</p>
          <h2 id="home-process-title">먼저 듣고,<br />필요한 진료를 설명합니다.</h2>
          <p>
            현재의 불편과 시작된 시점, 생활 리듬을 함께 확인합니다.
            모든 검사를 일률적으로 진행하지 않습니다.
          </p>
          <ol className="home-care-steps">
            {firstVisitSteps.slice(1).map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.body}</p></div>
              </li>
            ))}
          </ol>
          <a className="contextual-link" href="/about">오브한의원 진료 원칙 더 보기 →</a>
        </div>
        <figure className="principle-photo">
          <ResponsiveImage src="/orb-chuna-room.png" alt="오브한의원에서 추나 진료를 진행하는 모습" sizes="(max-width: 980px) calc(100vw - 48px), 46vw" />
          <figcaption>오브한의원 추나 진료 장면</figcaption>
        </figure>
      </section>

      <section className="home-first-visit" id="first-visit" aria-labelledby="home-visit-title">
        <div className="home-visit-heading">
          <p className="eyebrow">예약 전 확인하세요</p>
          <h2 id="home-visit-title">처음이라<br />궁금한 것들</h2>
          <p>검사와 비용, 방문 준비까지.<br />예약 전에 필요한 안내를 살펴보세요.</p>
          <a className="contextual-link" href="/first-visit">첫 방문 안내 전체 보기 →</a>
        </div>
        <div className="home-visit-questions">
          {firstVisitQuestions.map((item, index) => (
            <details key={item.id} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="home-visit-next">
          <div>
            <h3>방문 일정을 정하셨나요?</h3>
            <p>네이버에서 예약하거나, 궁금한 점을 카카오톡으로 문의해 주세요.</p>
          </div>
          <div className="home-booking-actions" aria-label="첫 방문 예약 및 문의">
            <a href={naverBookingUrl} target="_blank" rel="noreferrer">네이버 예약하기 <span aria-hidden="true">↗</span></a>
            <a href={kakaoChatUrl} target="_blank" rel="noreferrer">예약 전 카카오 문의 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="home-column-section" aria-labelledby="home-column-title">
        <div className="home-column-heading">
          <div>
            <p className="eyebrow">의료 칼럼</p>
            <h2 id="home-column-title">진료실에서 자주 설명하는 내용을 정리했습니다</h2>
          </div>
          <a href="/column">의료 칼럼 전체보기 →</a>
        </div>
        <div className="home-column-grid">
          {columnPosts.map((post) => (
            <a href={`/column/${post.slug}`} key={post.slug}>
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
          <p className="eyebrow">한의원 내부</p>
          <h2>공간 둘러보기</h2>
        </div>
        <AutoGallery
          images={galleryImages}
          ariaLabel="오브한의원 내부 사진 자동 슬라이더"
        />
      </section>

      <section className="snap-section visit-section" id="directions">
        <div className="visit-copy">
          <p className="eyebrow">위치 및 주차</p>
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
              <dt>평일 진료</dt>
              <dd>월–금 10:30–20:20 · 휴게시간 14:10–15:00 · 접수마감 19:40</dd>
            </div>
            <div>
              <dt>토요일 진료</dt>
              <dd>13:00–18:00 · 접수마감 17:20 · 휴게시간 없음</dd>
            </div>
            <div>
              <dt>휴진 안내</dt>
              <dd>일요일 정기휴무 · 공휴일 일정은 네이버 플레이스에서 별도 안내합니다.</dd>
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
          <p className="eyebrow">진료 예약</p>
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
          <p className="eyebrow">학회 및 협회 활동</p>
          <ul>
            {memberships.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <ClinicFooter />
    </main>
  );
}
