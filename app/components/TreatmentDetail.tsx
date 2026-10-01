import ResponsivePicture from './ResponsivePicture';
import SiteHeader from './SiteHeader';
import TrackedLink from './TrackedLink';
import { clinic, treatmentPath, treatments, type Locale, type Treatment } from '../lib/clinic';

const detailCopy = {
  ko: {
    home: '홈',
    treatments: '진료 분야',
    concerns: '이런 불편을 살핍니다',
    process: '진료는 이렇게 이어집니다',
    noteTitle: '진료 전 참고해 주세요',
    note: '검사와 치료의 필요 여부는 문진과 진찰 후 결정됩니다. 같은 증상이라도 개인의 상태에 따라 진료 내용은 달라질 수 있습니다.',
    related: '다른 진료 분야',
    bookingTitle: '현재의 불편을 이야기해 주세요.',
    bookingBody: '네이버 예약에서 가능한 시간을 확인하거나 전화로 문의하실 수 있습니다.',
    booking: '네이버 예약',
    call: '전화 문의',
    back: '전체 진료 분야 보기',
    privacy: '개인정보처리방침',
  },
  en: {
    home: 'Home',
    treatments: 'Treatments',
    concerns: 'Concerns we review',
    process: 'How a visit proceeds',
    noteTitle: 'Before your visit',
    note: 'The need for tests and treatment is determined after consultation and examination. Care may differ between patients even when symptoms appear similar.',
    related: 'Other treatment areas',
    bookingTitle: 'Tell us what has been troubling you.',
    bookingBody: 'Check available appointments on Naver or call the clinic for assistance.',
    booking: 'Book on Naver',
    call: 'Call the clinic',
    back: 'View all treatments',
    privacy: 'Privacy',
  },
} as const;

export default function TreatmentDetail({ treatment, locale }: { treatment: Treatment; locale: Locale }) {
  const text = detailCopy[locale];
  const isEnglish = locale === 'en';
  const home = isEnglish ? '/en' : '/';
  const related = treatments.filter((item) => item.slug !== treatment.slug);

  return (
    <main className={`site-shell detail-page locale-${locale}`} lang={locale}>
      <SiteHeader locale={locale} compact />
      <section className="detail-hero">
        <div className="detail-hero-copy">
          <nav className="breadcrumbs" aria-label={isEnglish ? 'Breadcrumb' : '현재 위치'}>
            <a href={home}>{text.home}</a><span>/</span><a href={`${home}#treatments`}>{text.treatments}</a>
          </nav>
          <p className="eyebrow">TREATMENT {treatment.number}</p>
          <h1>{treatment.title[locale]}</h1>
          <p>{treatment.summary[locale]}</p>
        </div>
        <ResponsivePicture
          className="detail-hero-image"
          image={treatment.image}
          alt={treatment.imageAlt[locale]}
          eager
          position={treatment.imagePosition}
        />
      </section>

      <section className="detail-intro">
        <p>{treatment.intro[locale]}</p>
      </section>

      <section className="detail-columns">
        <article>
          <p className="eyebrow">01 · CONCERNS</p>
          <h2>{text.concerns}</h2>
          <ul className="detail-list">
            {treatment.concerns[locale].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
        <article>
          <p className="eyebrow">02 · PROCESS</p>
          <h2>{text.process}</h2>
          <ol className="process-list">
            {treatment.care[locale].map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
            ))}
          </ol>
        </article>
      </section>

      <aside className="medical-note">
        <strong>{text.noteTitle}</strong>
        <p>{text.note}</p>
      </aside>

      <section className="related-section">
        <div className="section-heading">
          <p className="eyebrow">RELATED</p>
          <h2>{text.related}</h2>
        </div>
        <div className="related-grid">
          {related.map((item) => (
            <a href={treatmentPath(locale, item.slug)} key={item.slug}>
              <span>{item.number}</span>
              <strong>{item.shortTitle[locale]}</strong>
              <i aria-hidden="true">→</i>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-section detail-contact">
        <p className="eyebrow">RESERVATION</p>
        <h2>{text.bookingTitle}</h2>
        <p>{text.bookingBody}</p>
        <div className="primary-actions primary-actions-centered">
          <TrackedLink className="button button-light" href={clinic.naverBookingUrl} target="_blank" rel="noreferrer" eventName="booking_click" eventLabel={text.booking}>{text.booking}<span>↗</span></TrackedLink>
          <TrackedLink className="button button-outline-light" href={clinic.phoneHref} eventName="phone_click" eventLabel={text.call}>{text.call}</TrackedLink>
        </div>
        <a className="back-link" href={`${home}#treatments`}>← {text.back}</a>
      </section>

      <footer className="site-footer">
        <div><strong>ORB</strong><span>{isEnglish ? clinic.nameEn : clinic.nameKo}</span></div>
        <address>{isEnglish ? clinic.addressEn : clinic.addressKo}<br />{clinic.phoneDisplay}</address>
        <div className="footer-meta"><a href={isEnglish ? '/en/privacy' : '/privacy'}>{text.privacy}</a><span>© ORB Korean Medicine Clinic.</span></div>
      </footer>

      <aside className="mobile-cta" aria-label={isEnglish ? 'Appointment actions' : '예약 바로가기'}>
        <TrackedLink href={clinic.naverBookingUrl} target="_blank" rel="noreferrer" eventName="booking_click" eventLabel={text.booking}>{text.booking}</TrackedLink>
        <TrackedLink href={clinic.phoneHref} eventName="phone_click" eventLabel={text.call}>{text.call}</TrackedLink>
      </aside>
    </main>
  );
}
