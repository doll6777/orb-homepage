import type { Metadata } from 'next';
import AutoGallery from '../components/AutoGallery';
import SiteMotion from '../components/SiteMotion';

const treatmentAreas = [
  'Pain care',
  'Autonomic imbalance',
  'Stress',
  'Neurotic symptoms',
  'Weight management',
  'Heat metabolism',
  'Traffic accident aftercare',
];

const treatmentPillars = [
  {
    number: '01',
    title: 'Pain · Chuna',
    caption: 'Musculoskeletal pain and spinal-joint recovery',
  },
  {
    number: '02',
    title: 'Autonomic System',
    caption: 'QEEG and nervous-system fatigue assessment',
  },
  {
    number: '03',
    title: 'Stress · Neurotic Symptoms',
    caption: 'Sensitivity, brain fog, and emotional fatigue',
  },
  {
    number: '04',
    title: 'Weight · Metabolism',
    caption: 'Metabolic balance and weight care',
  },
];

const programs = [
  {
    number: '01',
    title: 'Pain · Chuna',
    image: '/orb-chuna-room.png',
    alt: 'Chuna treatment at ORB Korean Medicine Clinic',
    body:
      'From acute musculoskeletal pain to long-standing degenerative spine conditions, care is guided by the stage of the condition.',
  },
  {
    number: '02',
    title: 'Autonomic · QEEG',
    image: '/orb-qeeg-test.jpeg',
    alt: 'QEEG examination at ORB Korean Medicine Clinic',
    body:
      'Autonomic testing and QEEG-32FX help assess nervous-system fatigue and recovery signals more objectively.',
  },
  {
    number: '03',
    title: 'Stress · Neurotic Symptoms',
    image: '/orb-treatment-bed.jpeg',
    alt: 'Treatment room at ORB Korean Medicine Clinic',
    body:
      'ORB looks at sensitivity, brain fog, low mood, and stress-related discomfort as part of one recovery pattern.',
  },
  {
    number: '04',
    title: 'Weight · Metabolism',
    image: '/orb-acurex-blue.png',
    alt: 'Korean medicine treatment product',
    body:
      'Weight care is approached through energy regulation, homeostasis, and the balance of the gut environment.',
  },
];

const memberships = [
  'The Association of Korean Medicine',
  'Korean Society of Chuna Manual Medicine for Spine & Nerves',
  'The Society of Korean Medicine',
  'Korean Medicine Obesity Society',
  'Korean Society of Integrative Oncology',
  'Korean Medicine EEG Society',
  'Korean Medicine Information Cooperative',
];

const galleryImages = [
  {
    number: '01',
    src: '/orb-space-lobby-wide.jpg',
    alt: 'Wide view of the ORB lobby and waiting space',
    label: 'Lobby',
  },
  {
    number: '02',
    src: '/orb-space-reception.jpg',
    alt: 'Front desk at ORB Korean Medicine Clinic',
    label: 'Reception',
  },
  {
    number: '03',
    src: '/orb-space-lobby-detail.jpg',
    alt: 'Reception and waiting space at ORB Korean Medicine Clinic',
    label: 'Welcome',
  },
  {
    number: '04',
    src: '/orb-space-waiting.jpg',
    alt: 'Waiting area and amenities at ORB Korean Medicine Clinic',
    label: 'Waiting',
  },
  {
    number: '05',
    src: '/orb-space-corridor.jpg',
    alt: 'Corridor leading to the care rooms at ORB Korean Medicine Clinic',
    label: 'Corridor',
  },
  {
    number: '06',
    src: '/orb-space-consult.jpg',
    alt: 'Consultation and examination room at ORB Korean Medicine Clinic',
    label: 'Consult',
  },
  {
    number: '07',
    src: '/orb-space-treatment.jpg',
    alt: 'Treatment room at ORB Korean Medicine Clinic',
    label: 'Treatment',
  },
  {
    number: '08',
    src: '/orb-space-care-room.jpg',
    alt: 'Private care room at ORB Korean Medicine Clinic',
    label: 'Care Room',
  },
];

const naverPlaceUrl =
  'https://pcmap.place.naver.com/hospital/2005324011/home';
const kakaoMapUrl =
  'https://map.kakao.com/link/search/%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90%20%EB%A7%88%EA%B3%A1%EC%A0%90';
const googleMapUrl =
  'https://www.google.com/maps/search/?api=1&query=%EC%98%A4%EB%B8%8C%ED%95%9C%EC%9D%98%EC%9B%90+%EB%A7%88%EA%B3%A1%EC%A0%90+%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111';
const googleMapEmbedUrl =
  'https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8+%EA%B0%95%EC%84%9C%EA%B5%AC+%EB%A7%88%EA%B3%A1%EC%A4%91%EC%95%99%EB%A1%9C+111&output=embed';
const mapLinks = [
  { label: 'NAVER', name: 'Naver Map', href: naverPlaceUrl },
  { label: 'KAKAO', name: 'Kakao Map', href: kakaoMapUrl },
  { label: 'GOOGLE', name: 'Google Maps', href: googleMapUrl },
];
const phoneDisplay = '02-6959-5982';
const phoneHref = 'tel:0269595982';
const siteUrl = 'https://orb-korean-medicine-clinic.hyeranlee.chatgpt.site/en';

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'ORB Korean Medicine Clinic Magok',
  alternateName: '오브한의원 마곡점',
  url: siteUrl,
  telephone: phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: 'Seoul',
    addressLocality: 'Gangseo-gu',
    streetAddress: '111 Magokjungang-ro, Building 104, 2F, Units 238-239',
  },
  medicalSpecialty: [
    'Korean Medicine',
    'Pain Management',
    'Neuropsychiatry',
    'Rehabilitation',
  ],
  availableService: treatmentAreas,
};

export const metadata: Metadata = {
  title: 'English Guide',
  description:
    'English guide for ORB Korean Medicine Clinic Magok in Seoul. Care for pain, autonomic imbalance, stress, neurotic symptoms, weight management, heat metabolism, and traffic accident aftercare.',
  alternates: {
    canonical: '/en',
    languages: {
      ko: '/',
      en: '/en',
    },
  },
  openGraph: {
    title: 'ORB Korean Medicine Clinic Magok',
    description:
      'English guide for ORB Korean Medicine Clinic near Magongnaru Station Exit 5 in Seoul.',
    url: '/en',
    siteName: 'ORB Korean Medicine Clinic',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishPage() {
  return (
    <main className="site-shell" lang="en">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <header className="global-header" aria-label="ORB Korean Medicine Clinic">
        <a className="wordmark" href="/en#top" aria-label="ORB home">
          ORB
        </a>
        <div className="header-actions">
          <a href="/" hrefLang="ko" aria-label="View in Korean">
            KR
          </a>
          <a href="#directions">Directions</a>
          <a href="#contact">Reservation</a>
        </div>
      </header>

      <nav className="side-index" aria-label="Section navigation">
        <span aria-hidden="true" />
        <a href="#top">01</a>
        <a href="#areas">02</a>
        <a href="#programs">03</a>
        <a href="#space-gallery">04</a>
        <a href="#directions">05</a>
        <a href="#contact">06</a>
      </nav>

      <aside className="map-quick-links" aria-label="Map shortcuts">
        {mapLinks.map((link) => (
          <a
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ORB on ${link.name}`}
          >
            {link.label}
          </a>
        ))}
      </aside>

      <section className="snap-section treat-hero" id="top">
        <h1 className="sr-only">ORB Korean Medicine Clinic Magok</h1>
        <figure className="hero-photo">
          <img src="/orb-space-lobby-wide.jpg" alt="ORB Korean Medicine Clinic lobby" />
        </figure>
        <div className="scroll-cue" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="snap-section area-section" id="areas">
        <div className="area-intro">
          <p className="eyebrow">TREATMENT</p>
          <h2>What We Treat</h2>
        </div>
        <div className="area-grid">
          {treatmentPillars.map((area) => (
            <a href="#programs" className="area-item" key={area.title}>
              <span>{area.number}</span>
              <strong>{area.title}</strong>
              <small>{area.caption}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="programs" id="programs" aria-label="Treatment programs">
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
            We diagnose the origin,
            <br />
            then reset the direction of recovery.
          </h2>
        </div>
        <figure className="principle-photo">
          <img src="/orb-space-corridor.jpg" alt="ORB Korean Medicine Clinic corridor" />
        </figure>
      </section>

      <section className="snap-section gallery-section" id="space-gallery">
        <div className="gallery-heading">
          <p className="eyebrow">SPACE</p>
          <h2>Inside ORB</h2>
        </div>
        <AutoGallery
          images={galleryImages}
          ariaLabel="Automatic ORB interior photo carousel"
        />
      </section>

      <section className="snap-section visit-section" id="directions">
        <div className="visit-copy">
          <p className="eyebrow">LOCATION</p>
          <h2>Getting Here</h2>
          <address className="visit-address">
            111 Magokjungang-ro
            <br />
            Lotte Castle Le West, Building 104, 2F, Units 238–239
          </address>
          <dl className="route-details">
            <div>
              <dt>Subway</dt>
              <dd>136m on foot from Magongnaru Station Exit 5.</dd>
            </div>
            <div>
              <dt>Building</dt>
              <dd>Take the elevator to the second floor of Building 104.</dd>
            </div>
          </dl>
          <div className="map-actions" aria-label="Open location in maps">
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
            title="Map showing ORB Korean Medicine Clinic Magok"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="snap-section contact-section" id="contact">
        <div className="letter">
          <p className="eyebrow">RESERVATION</p>
          <h2>Visit ORB Magok</h2>
          <p>
            Contact ORB Korean Medicine Clinic Magok by phone or check the
            official Naver Place page.
          </p>
          <address className="clinic-address">
            111 Magokjungang-ro, Building 104, 2F, Units 238-239
            <br />
            Gangseo-gu, Seoul
            <br />
            136m from Magongnaru Station Exit 5
          </address>
          <div className="reservation-info">
            <span>Phone</span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <div className="outline-actions" aria-label="Reservation links">
            <a href={naverPlaceUrl} target="_blank" rel="noreferrer">
              Naver Place
            </a>
            <a href={phoneHref}>Call</a>
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
