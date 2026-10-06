const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

const navigation = [
  { label: '병원 소개', href: '/about' },
  { label: '진료 안내', href: '/#areas' },
  { label: '첫 방문', href: '/first-visit' },
  { label: '의료 칼럼', href: '/column' },
  { label: '오시는 길', href: '/#directions' },
];

export default function ClinicHeader() {
  return (
    <header className="global-header clinic-header" aria-label="오브한의원">
      <a className="wordmark" href="/" aria-label="오브한의원 홈">
        <img
          src="/orb-logo-cream.png"
          alt="오브한의원"
          width="365"
          height="114"
        />
      </a>

      <nav className="primary-nav" aria-label="주요 메뉴">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a href="/en" hrefLang="en" aria-label="View in English">
          EN
        </a>
        <a className="header-booking" href={bookingUrl} target="_blank" rel="noreferrer">
          예약하기
        </a>
      </nav>

      <details className="mobile-menu">
        <summary>MENU</summary>
        <nav aria-label="모바일 메뉴">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a href="/en" hrefLang="en">
            English
          </a>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            네이버 예약
          </a>
        </nav>
      </details>
    </header>
  );
}
