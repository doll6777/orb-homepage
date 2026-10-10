import type { Metadata } from 'next';
import EnglishFooter from '../../components/EnglishFooter';
import EnglishHeader from '../../components/EnglishHeader';

const description =
  'Plan your first visit to ORB Korean Medicine Clinic in Magok, Seoul. Find booking contacts, language assistance guidance, preparation, costs and parking information.';

export const metadata: Metadata = {
  title: { absolute: 'Your First Visit in Magok, Seoul | ORB Clinic' },
  description,
  alternates: {
    canonical: '/en/first-visit',
    languages: {
      ko: '/first-visit',
      en: '/en/first-visit',
    },
  },
  openGraph: {
    title: 'Your First Visit in Magok, Seoul | ORB Clinic',
    description,
    url: '/en/first-visit',
    siteName: 'ORB Korean Medicine Clinic',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
    type: 'website',
  },
};

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';
const kakaoChatUrl = 'https://pf.kakao.com/_nXGxaX/chat';

const steps = [
  {
    title: 'Book a visit',
    body: 'Contact the clinic through Naver, KakaoTalk or phone to check appointment availability and language assistance.',
  },
  {
    title: 'Check in',
    body: 'Share your main concerns, when they began, current medications and any previous test results.',
  },
  {
    title: 'Consultation',
    body: 'Discuss your symptoms and daily routine. The clinician will explain whether any examinations or tests are needed.',
  },
  {
    title: 'Care and guidance',
    body: 'Care is guided by your individual condition, with advice on follow-up visits and daily habits.',
  },
];

export default function EnglishFirstVisitPage() {
  return (
    <main className="interior-page first-visit-page english-page" lang="en">
      <EnglishHeader koreanHref="/first-visit" />

      <section className="interior-hero compact-hero">
        <div>
          <p className="eyebrow">YOUR FIRST VISIT</p>
          <h1>Before you visit ORB</h1>
          <p>
            A guide to booking, preparing and finding our clinic in Magok, Seoul.
            Please confirm the availability of assistance in your preferred
            language with the clinic before booking.
          </p>
        </div>
      </section>

      <section className="visit-steps content-section" aria-labelledby="visit-process-heading">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">WHAT TO EXPECT</p>
            <h2 id="visit-process-heading">Your visit, step by step</h2>
          </div>
          <p>
            Examinations, tests and care may vary depending on your concerns and
            health condition.
          </p>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="visit-preparation content-section" aria-labelledby="visit-faq-heading">
        <div>
          <p className="eyebrow">BEFORE YOUR VISIT</p>
          <h2 id="visit-faq-heading">Frequently asked questions</h2>
        </div>
        <dl>
          <div>
            <dt>How long will my first visit take?</dt>
            <dd>
              The time needed depends on your consultation and whether tests are
              planned. Describe your concerns when booking and ask the clinic
              for an estimated visit length.
            </dd>
          </div>
          <div>
            <dt>What about costs, payment and insurance?</dt>
            <dd>
              Ask the clinic about estimated fees, accepted payment methods and
              whether any insurance coverage applies to the planned care.
              Confirm the actual services and costs after consultation. Check
              reimbursement and any required documents with your own insurer.
            </dd>
          </div>
          <div>
            <dt>What should I prepare?</dt>
            <dd>
              Bring recent test results, medical images and a list of current
              medications if available. Follow the preparation instructions
              provided by the clinic for any planned tests. Do not stop taking
              medication on your own; discuss any changes with your clinician
              first.
            </dd>
          </div>
          <div>
            <dt>How can I change my appointment?</dt>
            <dd>
              Please contact the clinic in advance through your original booking
              channel or by phone if your plans change.
            </dd>
          </div>
          <div>
            <dt>Is parking available?</dt>
            <dd>
              Two hours of free parking are available in the Lotte Castle
              Le West underground parking area. See{' '}
              <a className="contextual-link" href="/en#directions">
                our address and directions
              </a>{' '}
              before setting off.
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="visit-preparation content-section"
        id="booking"
        aria-labelledby="booking-heading"
      >
        <div>
          <p className="eyebrow">BOOKING &amp; LANGUAGE</p>
          <h2 id="booking-heading">Contact us before you book</h2>
        </div>
        <dl>
          <div>
            <dt>Language assistance</dt>
            <dd>
              Please tell the clinic your preferred language and confirm whether
              assistance is available for your visit before booking.
            </dd>
          </div>
          <div>
            <dt>Naver booking</dt>
            <dd>
              The current Naver booking interface is in Korean.{' '}
              <a className="contextual-link" href={bookingUrl} target="_blank" rel="noreferrer">
                Open Naver booking (Korean)
              </a>
              .
            </dd>
          </div>
          <div>
            <dt>KakaoTalk</dt>
            <dd>
              You may need the KakaoTalk app and an account to use the chat.{' '}
              <a className="contextual-link" href={kakaoChatUrl} target="_blank" rel="noreferrer">
                Contact the clinic on KakaoTalk
              </a>
              .
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a className="contextual-link" href="tel:+82269595982">
                +82-2-6959-5982
              </a>
            </dd>
          </div>
          <div>
            <dt>A message you can use</dt>
            <dd>
              Hello, I would like to ask about an appointment on [date]. My
              preferred language is [language]. Is language assistance
              available? I would like a consultation for [concern]. Could you
              confirm the expected visit length, estimated cost and accepted
              payment methods?
            </dd>
          </div>
        </dl>
      </section>

      <section className="first-visit-cta" aria-labelledby="directions-heading">
        <div>
          <p className="eyebrow">FIND ORB</p>
          <h2 id="directions-heading">Plan your journey</h2>
          <p>136 m from Magoknaru Station Exit 5 in Magok, Seoul.</p>
        </div>
        <a href="/en#directions">View address &amp; directions</a>
      </section>

      <EnglishFooter />
    </main>
  );
}
