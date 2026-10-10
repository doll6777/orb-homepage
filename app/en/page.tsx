import type { Metadata } from 'next';
import AutoGallery from '../components/AutoGallery';
import SiteMotion from '../components/SiteMotion';
import ResponsiveImage from '../components/ResponsiveImage';
import EnglishHeader from '../components/EnglishHeader';
import EnglishFooter from '../components/EnglishFooter';

const treatmentAreas = [
  'Pain care',
  'Autonomic imbalance',
  'Stress',
  'Weight management',
  'Traffic accident aftercare',
];

const treatmentPillars = [
  {
    number: '01',
    id: 'pain-chuna',
    title: 'Pain · Chuna',
    caption: 'Muscle and joint pain · Hands-on treatment',
  },
  {
    number: '02',
    id: 'autonomic-qeeg',
    title: 'Autonomic · QEEG',
    caption: 'Symptom consultation · Brainwave assessment',
  },
  {
    number: '03',
    id: 'stress-care',
    title: 'Stress-related concerns',
    caption: 'A consultation about symptoms and daily life',
  },
  {
    number: '04',
    id: 'weight-care',
    title: 'Weight management',
    caption: 'Discuss your goals and treatment options',
  },
];

const programs = [
  {
    number: '01',
    id: 'pain-chuna',
    title: 'Pain · Chuna',
    image: '/orb-chuna-room.png',
    alt: 'Chuna treatment at ORB Korean Medicine Clinic',
    body:
      'Discuss neck, back, muscle or joint pain with the clinician. Chuna is a hands-on manual treatment used in Korean medicine. The consultation helps determine which treatment options are appropriate for you.',
  },
  {
    number: '02',
    id: 'autonomic-qeeg',
    title: 'Autonomic · QEEG',
    image: '/orb-qeeg-test.jpeg',
    alt: 'QEEG examination at ORB Korean Medicine Clinic',
    body:
      'Talk through your symptoms and medical history. If appropriate, the clinician may recommend autonomic testing or quantitative electroencephalography (QEEG), which records and analyses brainwave activity. Ask about preparation and fees before your visit.',
  },
  {
    number: '03',
    id: 'stress-care',
    title: 'Stress-related concerns',
    image: '/orb-treatment-bed.jpeg',
    alt: 'Treatment room at ORB Korean Medicine Clinic',
    body:
      'A consultation gives you space to explain stress-related discomfort, brain fog or changes in mood, and how these affect your daily life. The clinician reviews your concerns and discusses suitable next steps.',
  },
  {
    number: '04',
    id: 'weight-care',
    title: 'Weight management',
    image: '/orb-space-consult.jpg',
    alt: 'Consultation and examination room at ORB Korean Medicine Clinic',
    body:
      'Discuss your weight-management goals, eating patterns, current medicines and health history. The clinician can explain the available options, their suitability and costs before you decide on care.',
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
  { label: 'NAVER', name: 'Naver Map', href: naverPlaceUrl },
  { label: 'KAKAO', name: 'Kakao Map', href: kakaoMapUrl },
  { label: 'GOOGLE', name: 'Google Maps', href: googleMapUrl },
];
const phoneDisplay = '+82-2-6959-5982';
const phoneHref = 'tel:+82269595982';
const siteUrl = 'https://orbclinic.pages.dev/en';

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': 'https://orbclinic.pages.dev/#clinic',
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
  medicalSpecialty: [
    'Korean Medicine',
    'Pain Management',
    'Neuropsychiatry',
    'Rehabilitation',
  ],
  availableService: treatmentAreas.map((name) => ({ '@type': 'Service', name })),
};

export const metadata: Metadata = {
  title: { absolute: 'Korean Medicine Clinic in Magok, Seoul | ORB' },
  description:
    'Visit ORB Korean Medicine Clinic in Magok, Gangseo-gu, Seoul. Explore pain and Chuna care, QEEG, first-visit information, booking options and directions from Magoknaru Station.',
  alternates: {
    canonical: '/en',
    languages: {
      ko: '/',
      en: '/en',
    },
  },
  openGraph: {
    title: 'Korean Medicine Clinic in Magok, Seoul | ORB',
    description:
      'Treatments, first-visit guidance and booking options for ORB Korean Medicine Clinic near Magoknaru Station Exit 5 in Seoul.',
    url: '/en',
    siteName: 'ORB Korean Medicine Clinic',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishPage() {
  return (
    <main className="site-shell english-page" lang="en">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
      />
      <EnglishHeader />

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
        <figure className="hero-photo">
          <ResponsiveImage src="/orb-space-lobby-wide.jpg" alt="ORB Korean Medicine Clinic lobby" sizes="100vw" priority />
        </figure>
        <div className="hero-identity">
          <p>MAGOK · GANGSEO-GU · SEOUL</p>
          <h1>ORB Korean Medicine Clinic</h1>
          <span>Pain &amp; Chuna · Autonomic &amp; QEEG · Stress · Weight care<br />136m from Magoknaru Station Exit 5</span>
          <div className="english-hero-actions">
            <a href="/en/first-visit">Your first visit ↗</a>
            <a href="/en/first-visit#booking">How to book ↗</a>
          </div>
        </div>
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
            <a href={`#${area.id}`} className="area-item" key={area.title}>
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
            id={program.id}
          >
            <figure className="program-photo">
              <ResponsiveImage src={program.image} alt={program.alt} sizes="(max-width: 980px) 100vw, 55vw" />
            </figure>
            <div className="program-copy">
              <span>{program.number}</span>
              <h2>{program.title}</h2>
              <p>{program.body}</p>
              <a className="contextual-link" href="/en/first-visit">Plan your first visit →</a>
            </div>
          </section>
        ))}
      </section>

      <section className="snap-section principle-section">
        <div className="principle-copy">
          <p className="eyebrow">ORIGIN · RESET · BALANCE</p>
          <h2>
            Care starts with
            <br />
            your concerns.
          </h2>
        </div>
        <figure className="principle-photo">
          <ResponsiveImage src="/orb-space-corridor.jpg" alt="ORB Korean Medicine Clinic corridor" sizes="(max-width: 980px) 100vw, 50vw" />
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
              <dd>136m on foot from Magoknaru Station Exit 5.</dd>
            </div>
            <div>
              <dt>Building</dt>
              <dd>Use the commercial elevator from B2 to the second floor of Building 104.</dd>
            </div>
            <div>
              <dt>Weekdays</dt>
              <dd>Mon–Fri 10:30–20:20 · Break 14:10–15:00 · Last check-in 19:40</dd>
            </div>
            <div>
              <dt>Saturday</dt>
              <dd>13:00–18:00 · Last check-in 17:20 · No break</dd>
            </div>
            <div>
              <dt>Closed</dt>
              <dd>Closed Sundays. For public holidays, contact the clinic or check Naver Place (Korean) before visiting.</dd>
            </div>
            <div>
              <dt>Parking</dt>
              <dd>Two hours of complimentary parking are available in the building garage.</dd>
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
            New to the clinic? Read our <a className="contextual-link" href="/en/first-visit#booking">booking guide</a> before choosing a time.
            Please confirm language assistance with the clinic before booking.
          </p>
          <p className="english-booking-note">
            Naver Booking opens in Korean. KakaoTalk may require an account or the app.
            From outside Korea, call +82-2-6959-5982.
          </p>
          <address className="clinic-address">
            111 Magokjungang-ro, Building 104, 2F, Units 238-239
            <br />
            Gangseo-gu, Seoul
            <br />
            136m from Magoknaru Station Exit 5
          </address>
          <div className="reservation-info">
            <span>Phone</span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
          <div className="outline-actions" aria-label="Reservation links">
            <a href={naverBookingUrl} target="_blank" rel="noreferrer">
              Naver Booking (Korean)
            </a>
            <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
              KakaoTalk Chat
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
      <EnglishFooter />
    </main>
  );
}
