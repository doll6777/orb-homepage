import Link from 'next/link';

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
      <Link className="wordmark" href="/" aria-label="오브한의원 홈">
        ORB
      </Link>

      <nav className="primary-nav" aria-label="주요 메뉴">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/en" hrefLang="en" aria-label="View in English">
          EN
        </Link>
        <a className="header-booking" href={bookingUrl} target="_blank" rel="noreferrer">
          예약하기
        </a>
      </nav>

      <details className="mobile-menu">
        <summary>MENU</summary>
        <nav aria-label="모바일 메뉴">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/en" hrefLang="en">
            English
          </Link>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            네이버 예약
          </a>
        </nav>
      </details>
    </header>
  );
}
