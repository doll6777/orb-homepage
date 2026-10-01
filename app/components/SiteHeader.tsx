import { clinic, type Locale } from '../lib/clinic';
import TrackedLink from './TrackedLink';

export default function SiteHeader({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const isEnglish = locale === 'en';
  const home = isEnglish ? '/en' : '/';

  return (
    <header className={`site-header${compact ? ' site-header-compact' : ''}`}>
      <a className="brand-mark" href={home} aria-label={isEnglish ? 'ORB home' : '오브한의원 홈'}>
        <span>ORB</span>
        <small>{isEnglish ? 'KOREAN MEDICINE' : '오브한의원'}</small>
      </a>
      <nav className="desktop-nav" aria-label={isEnglish ? 'Main navigation' : '주요 메뉴'}>
        <a href={`${home}#treatments`}>{isEnglish ? 'Treatments' : '진료 분야'}</a>
        <a href={`${home}#space`}>{isEnglish ? 'Space' : '공간'}</a>
        <a href={`${home}#directions`}>{isEnglish ? 'Directions' : '오시는 길'}</a>
      </nav>
      <div className="header-utilities">
        <a href={isEnglish ? '/' : '/en'} hrefLang={isEnglish ? 'ko' : 'en'}>
          {isEnglish ? 'KR' : 'EN'}
        </a>
        <TrackedLink
          className="header-booking"
          href={clinic.naverBookingUrl}
          target="_blank"
          rel="noreferrer"
          eventName="booking_click"
          eventLabel={isEnglish ? 'Header reservation' : '헤더 예약'}
        >
          {isEnglish ? 'Reserve' : '예약하기'}
        </TrackedLink>
      </div>
    </header>
  );
}
