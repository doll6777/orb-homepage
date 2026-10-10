import MobileMenu from './MobileMenu';

const navigation = [
  { label: 'Treatments', href: '/en#areas' },
  { label: 'First visit', href: '/en/first-visit' },
  { label: 'Our space', href: '/en#space-gallery' },
  { label: 'Directions', href: '/en#directions' },
];

export default function EnglishHeader({ koreanHref = '/' }: { koreanHref?: string }) {
  return (
    <header className="global-header clinic-header" aria-label="ORB Korean Medicine Clinic">
      <a className="wordmark" href="/en" aria-label="ORB Clinic home">
        <img src="/orb-logo-cream.png" alt="ORB Korean Medicine Clinic" width="365" height="114" />
      </a>
      <nav className="primary-nav" aria-label="Main navigation">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        <a href={koreanHref} hrefLang="ko" lang="ko" aria-label="View in Korean">한국어</a>
        <a className="header-booking" href="/en/first-visit#booking">How to book</a>
      </nav>
      <MobileMenu label="Mobile navigation">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        <a href={koreanHref} hrefLang="ko" lang="ko">한국어</a>
        <a href="/en/first-visit#booking">How to book</a>
      </MobileMenu>
    </header>
  );
}
