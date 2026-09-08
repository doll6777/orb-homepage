import type { Metadata } from 'next';

const treatmentAreas = [
  'Pain care',
  'Autonomic imbalance',
  'Stress',
  'Neurotic symptoms',
  'Weight management',
  'Heat metabolism',
  'Traffic accident aftercare',
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
    src: '/hero-room.jpg',
    alt: 'Warm interior light and ORB logo wall',
    label: 'Entrance',
  },
  {
    number: '02',
    src: '/space-main.jpg',
    alt: 'Natural material details inside ORB Korean Medicine Clinic',
    label: 'Quiet Room',
  },
  {
    number: '03',
    src: '/space-side-a.jpg',
    alt: 'Waiting space at ORB Korean Medicine Clinic',
    label: 'Waiting',
  },
  {
    number: '04',
    src: '/space-side-b.jpg',
    alt: 'Table and object detail at ORB Korean Medicine Clinic',
    label: 'Detail',
  },
  {
    number: '05',
    src: '/treatment-room.jpg',
    alt: 'Treatment space at ORB Korean Medicine Clinic',
    label: 'Treatment',
  },
];

const naverPlaceUrl =
  'https://pcmap.place.naver.com/hospital/2005324011/home';
const phoneDisplay = '0507-1383-5982';
const phoneHref = 'tel:050713835982';
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
          <a href="#contact">Reservation</a>
        </div>
      </header>

      <nav className="side-index" aria-label="Section navigation">
        <span aria-hidden="true" />
        <a href="#top">01</a>
        <a href="#areas">02</a>
        <a href="#programs">03</a>
        <a href="#contact">04</a>
      </nav>

      <section className="snap-section treat-hero" id="top">
        <div className="hero-copy">
          <img className="hero-logo" src="/orb-logo-cream.png" alt="ORB Korean Medicine Clinic" />
          <p className="brand-kicker">ORIGIN · RESET · BALANCE</p>
          <h1>ORB Care Standard</h1>
          <p>
            ORB Korean Medicine Clinic Magok offers thoughtful primary Korean
            medicine care in Seoul.
          </p>
        </div>
        <figure className="hero-photo">
          <img src="/orb-space-lobby.png" alt="ORB Korean Medicine Clinic lobby" />
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
          {treatmentAreas.map((area, index) => (
            <a href="#programs" className="area-item" key={area}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{area}</strong>
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
          <img src="/orb-glass-space.png" alt="ORB Korean Medicine Clinic glass entrance" />
        </figure>
      </section>

      <section className="snap-section gallery-section" id="space-gallery">
        <div className="gallery-heading">
          <p className="eyebrow">SPACE</p>
          <h2>Inside ORB</h2>
          <p>Scroll horizontally to view the clinic interior.</p>
        </div>
        <div className="space-slider" aria-label="ORB interior photo slider">
          {galleryImages.map((image) => (
            <figure className="gallery-slide" key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>
                <span>{image.number}</span>
                <strong>{image.label}</strong>
              </figcaption>
            </figure>
          ))}
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
