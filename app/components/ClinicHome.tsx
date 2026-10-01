import AutoGallery from './AutoGallery';
import ResponsivePicture from './ResponsivePicture';
import SiteHeader from './SiteHeader';
import SiteMotion from './SiteMotion';
import TrackedLink from './TrackedLink';
import {
  SITE_URL,
  clinic,
  gallery,
  treatmentPath,
  treatments,
  type Locale,
} from '../lib/clinic';

const copy = {
  ko: {
    kicker: 'MAGOKNARU · ORB CLINIC',
    title: '오브한의원 마곡점',
    heroBody: '통증과 움직임, 자율신경과 뇌파, 스트레스와 대사까지. 현재의 불편을 차분히 살피고 진료의 방향을 함께 찾습니다.',
    booking: '네이버 예약',
    call: '전화 문의',
    station: '마곡나루역 5번 출구에서 136m',
    facts: [
      ['평일 진료', '10:30 – 20:20', '휴게시간 14:10 – 15:00'],
      ['가까운 역', '마곡나루역 5번 출구', '도보 약 1분 · 136m'],
      ['주차 안내', '건물 지하주차장', '내원 시 2시간 무료'],
    ],
    treatmentEyebrow: 'TREATMENTS',
    treatmentTitle: '진료의 시작은\n상태를 이해하는 일부터',
    treatmentBody: '증상 하나만 보지 않고 발생 시점과 생활의 흐름, 검사와 진찰 내용을 함께 살핍니다.',
    detail: '자세히 보기',
    philosophyEyebrow: 'OUR APPROACH',
    philosophyTitle: '원인을 살피고,\n회복의 방향을 맞춥니다.',
    philosophyBody: '오브한의원은 설명할 수 있는 진료를 지향합니다. 필요한 검사를 선택하고 결과를 함께 확인하며, 현재 상태에 맞는 다음 단계를 안내합니다.',
    principles: [
      ['Origin', '불편이 시작된 배경과 반복되는 패턴을 확인합니다.'],
      ['Reset', '긴장된 신경계와 움직임의 균형을 다시 살핍니다.'],
      ['Balance', '회복이 일상으로 이어질 수 있도록 관리 방향을 조정합니다.'],
    ],
    spaceEyebrow: 'SPACE',
    spaceTitle: '차분하게 머물 수 있는 공간',
    spaceBody: '상담부터 치료까지 편안하게 이어질 수 있도록 독립된 진료 공간을 마련했습니다.',
    galleryLabel: '오브한의원 내부 공간 사진',
    previous: '이전 공간 사진',
    next: '다음 공간 사진',
    locationEyebrow: 'VISIT',
    locationTitle: '마곡나루역에서\n가볍게 걸어오세요.',
    addressTitle: '주소',
    transitTitle: '지하철',
    transit: '9호선·공항철도 마곡나루역 5번 출구에서 도보 136m',
    buildingTitle: '건물 안에서',
    building: '지하 2층에서 상가용 엘리베이터를 이용해 104동 2층으로 올라오세요.',
    parkingTitle: '주차',
    parking: '지하주차장 이용 시 2시간 무료입니다. 상가용과 입주민용 엘리베이터 입구가 구분되어 있습니다.',
    hoursTitle: '진료시간',
    weekday: '월–금 10:30 – 20:20',
    breakTime: '휴게시간 14:10 – 15:00 · 접수마감 19:40',
    saturday: '토요일 진료시간은 네이버 예약에서 확인',
    sunday: '매주 일요일 휴진',
    mapTitle: '지도에서 보기',
    naverMap: '네이버 지도',
    kakaoMap: '카카오맵',
    googleMap: '구글 지도',
    contactEyebrow: 'RESERVATION',
    contactTitle: '진료 예약과 문의',
    contactBody: '네이버 예약에서 가능한 시간을 확인하거나 전화로 문의해 주세요.',
    privacy: '개인정보처리방침',
    rights: '© ORB Korean Medicine Clinic.',
  },
  en: {
    kicker: 'MAGOKNARU · ORB CLINIC',
    title: 'ORB Korean Medicine Clinic',
    heroBody: 'From pain and movement to autonomic health, stress, and metabolism, we take time to understand your current concerns and explain the next steps.',
    booking: 'Book on Naver',
    call: 'Call the clinic',
    station: '136m from Magongnaru Station Exit 5',
    facts: [
      ['Weekday hours', '10:30 – 20:20', 'Break 14:10 – 15:00'],
      ['Nearest station', 'Magongnaru Exit 5', 'About a one-minute walk'],
      ['Parking', 'Underground parking', 'Two hours free for patients'],
    ],
    treatmentEyebrow: 'TREATMENTS',
    treatmentTitle: 'Care begins by\nunderstanding your condition',
    treatmentBody: 'We consider when symptoms began, daily patterns, examination findings, and relevant test results together.',
    detail: 'Learn more',
    philosophyEyebrow: 'OUR APPROACH',
    philosophyTitle: 'Understand the origin.\nFind the direction of recovery.',
    philosophyBody: 'ORB aims for care that can be clearly explained. We select relevant assessments, review findings with you, and discuss the next step for your current condition.',
    principles: [
      ['Origin', 'We review the background and recurring pattern of your concerns.'],
      ['Reset', 'We reassess nervous-system tension and movement balance.'],
      ['Balance', 'We adjust care so recovery can continue in daily life.'],
    ],
    spaceEyebrow: 'SPACE',
    spaceTitle: 'A calm setting for your visit',
    spaceBody: 'Private consultation and treatment rooms support a comfortable flow throughout your appointment.',
    galleryLabel: 'Interior photos of ORB Korean Medicine Clinic',
    previous: 'Previous clinic photo',
    next: 'Next clinic photo',
    locationEyebrow: 'VISIT',
    locationTitle: 'A short walk from\nMagongnaru Station',
    addressTitle: 'Address',
    transitTitle: 'Subway',
    transit: '136m from Exit 5 of Magongnaru Station on Line 9 and the Airport Railroad',
    buildingTitle: 'Inside the building',
    building: 'From B2, take the commercial elevator to the second floor of Building 104.',
    parkingTitle: 'Parking',
    parking: 'Two hours of underground parking are provided. Commercial and residential elevator entrances are separate.',
    hoursTitle: 'Hours',
    weekday: 'Mon–Fri 10:30 – 20:20',
    breakTime: 'Break 14:10 – 15:00 · Last reception 19:40',
    saturday: 'Check Naver Booking for Saturday hours',
    sunday: 'Closed every Sunday',
    mapTitle: 'Open in maps',
    naverMap: 'Naver Map',
    kakaoMap: 'Kakao Map',
    googleMap: 'Google Maps',
    contactEyebrow: 'RESERVATION',
    contactTitle: 'Appointments and inquiries',
    contactBody: 'Check available appointments on Naver or call the clinic.',
    privacy: 'Privacy',
    rights: '© ORB Korean Medicine Clinic.',
  },
} as const;

function clinicJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: locale === 'ko' ? clinic.nameKo : clinic.nameEn,
    alternateName: locale === 'ko' ? clinic.nameEn : clinic.nameKo,
    url: `${SITE_URL}${locale === 'en' ? '/en' : ''}`,
    telephone: clinic.phoneDisplay,
    image: `${SITE_URL}/images/clinic/hero-lobby-wide.webp`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: locale === 'ko' ? '서울' : 'Seoul',
      addressLocality: locale === 'ko' ? '강서구' : 'Gangseo-gu',
      streetAddress:
        locale === 'ko'
          ? '마곡중앙로 111 104동 2층 238호, 239호'
          : '111 Magokjungang-ro, Building 104, 2F, Units 238-239',
    },
    hasMap: clinic.googleMapUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:30',
        closes: '20:20',
      },
    ],
    sameAs: [clinic.naverPlaceUrl, 'https://blog.naver.com/orbmed'],
    availableService: treatments.map((treatment) => treatment.title[locale]),
  };
}

export default function ClinicHome({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const isEnglish = locale === 'en';
  const localizedGallery = gallery.map((item) => ({
    image: item.image,
    label: item.label[locale],
    alt: item.alt[locale],
  }));

  return (
    <main className={`site-shell locale-${locale}`} lang={locale}>
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd(locale)) }}
      />
      <SiteHeader locale={locale} />

      <section className="hero-section" id="top">
        <div className="hero-content reveal" data-inview>
          <p className="eyebrow">{text.kicker}</p>
          <h1>{text.title}</h1>
          <p className="hero-lede">{text.heroBody}</p>
          <div className="primary-actions">
            <TrackedLink
              className="button button-solid"
              href={clinic.naverBookingUrl}
              target="_blank"
              rel="noreferrer"
              eventName="booking_click"
              eventLabel={text.booking}
            >
              {text.booking}<span aria-hidden="true">↗</span>
            </TrackedLink>
            <TrackedLink
              className="button button-ghost"
              href={clinic.phoneHref}
              eventName="phone_click"
              eventLabel={text.call}
            >
              {text.call}
            </TrackedLink>
          </div>
          <p className="hero-station"><span aria-hidden="true">●</span>{text.station}</p>
        </div>
        <ResponsivePicture
          className="hero-visual"
          image="hero-lobby"
          alt={isEnglish ? 'Lobby and waiting area at ORB Korean Medicine Clinic' : '오브한의원 로비와 대기 공간'}
          eager
          position="center center"
        />
      </section>

      <section className="fact-strip" aria-label={isEnglish ? 'Clinic information' : '주요 진료 정보'}>
        {text.facts.map(([label, value, note]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </div>
        ))}
      </section>

      <section className="content-section treatments-section reveal" id="treatments">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{text.treatmentEyebrow}</p>
            <h2>{text.treatmentTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
          </div>
          <p>{text.treatmentBody}</p>
        </div>
        <div className="treatment-grid">
          {treatments.map((treatment) => (
            <a className="treatment-card" href={treatmentPath(locale, treatment.slug)} key={treatment.slug}>
              <ResponsivePicture
                image={treatment.image}
                alt={treatment.imageAlt[locale]}
                position={treatment.imagePosition}
              />
              <div className="treatment-card-copy">
                <span>{treatment.number}</span>
                <h3>{treatment.title[locale]}</h3>
                <p>{treatment.summary[locale]}</p>
                <b>{text.detail}<i aria-hidden="true">→</i></b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="philosophy-section reveal">
        <div className="philosophy-lead">
          <p className="eyebrow">{text.philosophyEyebrow}</p>
          <h2>{text.philosophyTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
          <p>{text.philosophyBody}</p>
        </div>
        <ResponsivePicture
          className="philosophy-image"
          image="detail-flower"
          alt={isEnglish ? 'Floral detail in the ORB lobby' : '오브한의원 로비의 플라워 디테일'}
          position="center center"
        />
        <ol className="principle-list">
          {text.principles.map(([title, body], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{title}</strong><p>{body}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-section reveal" id="space">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{text.spaceEyebrow}</p>
            <h2>{text.spaceTitle}</h2>
          </div>
          <p>{text.spaceBody}</p>
        </div>
        <AutoGallery
          images={localizedGallery}
          ariaLabel={text.galleryLabel}
          previousLabel={text.previous}
          nextLabel={text.next}
        />
      </section>

      <section className="visit-section reveal" id="directions">
        <div className="visit-intro">
          <p className="eyebrow">{text.locationEyebrow}</p>
          <h2>{text.locationTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        </div>
        <div className="visit-layout">
          <div className="visit-details">
            <dl>
              <div><dt>{text.addressTitle}</dt><dd>{isEnglish ? clinic.addressEn : clinic.addressKo}</dd></div>
              <div><dt>{text.transitTitle}</dt><dd>{text.transit}</dd></div>
              <div><dt>{text.buildingTitle}</dt><dd>{text.building}</dd></div>
              <div><dt>{text.parkingTitle}</dt><dd>{text.parking}</dd></div>
            </dl>
            <div className="hours-card">
              <span>{text.hoursTitle}</span>
              <strong>{text.weekday}</strong>
              <p>{text.breakTime}</p>
              <p>{text.saturday}</p>
              <p>{text.sunday}</p>
            </div>
          </div>
          <div className="map-column">
            <iframe
              src={clinic.googleMapEmbedUrl}
              title={isEnglish ? 'Map showing ORB Korean Medicine Clinic' : '오브한의원 마곡점 위치 지도'}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-links" aria-label={text.mapTitle}>
              <TrackedLink href={clinic.naverPlaceUrl} target="_blank" rel="noreferrer" eventName="map_click" eventLabel={text.naverMap}>{text.naverMap}<span>↗</span></TrackedLink>
              <TrackedLink href={clinic.kakaoMapUrl} target="_blank" rel="noreferrer" eventName="map_click" eventLabel={text.kakaoMap}>{text.kakaoMap}<span>↗</span></TrackedLink>
              <TrackedLink href={clinic.googleMapUrl} target="_blank" rel="noreferrer" eventName="map_click" eventLabel={text.googleMap}>{text.googleMap}<span>↗</span></TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section reveal" id="contact">
        <p className="eyebrow">{text.contactEyebrow}</p>
        <h2>{text.contactTitle}</h2>
        <p>{text.contactBody}</p>
        <a className="contact-phone" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
        <div className="primary-actions primary-actions-centered">
          <TrackedLink className="button button-light" href={clinic.naverBookingUrl} target="_blank" rel="noreferrer" eventName="booking_click" eventLabel={text.booking}>{text.booking}<span>↗</span></TrackedLink>
          <TrackedLink className="button button-outline-light" href={clinic.phoneHref} eventName="phone_click" eventLabel={text.call}>{text.call}</TrackedLink>
        </div>
      </section>

      <footer className="site-footer">
        <div><strong>ORB</strong><span>{isEnglish ? clinic.nameEn : clinic.nameKo}</span></div>
        <address>{isEnglish ? clinic.addressEn : clinic.addressKo}<br />{clinic.phoneDisplay}</address>
        <div className="footer-meta"><a href={isEnglish ? '/en/privacy' : '/privacy'}>{text.privacy}</a><span>{text.rights}</span></div>
      </footer>

      <aside className="mobile-cta" aria-label={isEnglish ? 'Appointment actions' : '예약 바로가기'}>
        <TrackedLink href={clinic.naverBookingUrl} target="_blank" rel="noreferrer" eventName="booking_click" eventLabel={text.booking}>{text.booking}</TrackedLink>
        <TrackedLink href={clinic.phoneHref} eventName="phone_click" eventLabel={text.call}>{text.call}</TrackedLink>
      </aside>
    </main>
  );
}
