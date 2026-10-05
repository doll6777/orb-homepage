import Link from 'next/link';
import SiteMotion from '../components/SiteMotion';
import {
  makeTreatmentJsonLd,
  type Treatment,
} from './treatment-data';

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';
const kakaoChatUrl = 'https://pf.kakao.com/_nXGxaX/chat';

export default function TreatmentPage({ treatment }: { treatment: Treatment }) {
  const jsonLd = makeTreatmentJsonLd(treatment);

  return (
    <main className="treatment-detail">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="detail-header">
        <Link className="wordmark" href="/" aria-label="오브한의원 홈">
          ORB
        </Link>
        <nav aria-label="상세 페이지 이동">
          <Link href="/#areas">진료 분야</Link>
          <Link href="/#directions">오는 길</Link>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            예약하기
          </a>
        </nav>
      </header>

      <section className="detail-hero">
        <figure>
          <img src={treatment.image} alt={treatment.imageAlt} />
        </figure>
        <div className="detail-hero-copy">
          <nav className="breadcrumbs" aria-label="현재 위치">
            <Link href="/">홈</Link>
            <span aria-hidden="true">/</span>
            <span>{treatment.title}</span>
          </nav>
          <p className="eyebrow">{treatment.eyebrow}</p>
          <h1>{treatment.pageTitle}</h1>
          <p>{treatment.lead}</p>
        </div>
      </section>

      <section className="detail-section detail-concerns">
        <div>
          <p className="eyebrow">WHEN TO VISIT</p>
          <h2>이런 불편을 상담합니다</h2>
        </div>
        <ul>
          {treatment.concerns.map((concern) => (
            <li key={concern}>{concern}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section detail-approach">
        <div className="detail-section-heading">
          <p className="eyebrow">CARE PROCESS</p>
          <h2>진료는 이렇게 진행합니다</h2>
        </div>
        <ol>
          {treatment.approach.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="detail-reservation">
        <div>
          <p className="eyebrow">RESERVATION</p>
          <h2>마곡나루역 5번 출구에서 136m</h2>
          <p>
            진료 및 검사 여부는 상담 후 개인별 상태에 따라 달라질 수 있습니다.
            방문 전 네이버 예약이나 전화로 일정을 확인해 주세요.
          </p>
        </div>
        <div className="detail-actions">
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            네이버 예약
          </a>
          <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
            카카오톡 상담
          </a>
          <a href="tel:0269595982">02-6959-5982</a>
        </div>
      </section>

      <footer className="detail-footer">
        <strong>오브한의원 마곡점</strong>
        <address>
          서울특별시 강서구 마곡중앙로 111 롯데캐슬 르웨스트 104동 2층
          238호, 239호 · 02-6959-5982
        </address>
        <Link href="/">홈으로 돌아가기</Link>
      </footer>

      <aside className="detail-mobile-cta" aria-label="모바일 예약 및 문의">
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          네이버 예약
        </a>
        <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
          카카오톡 상담
        </a>
        <a href="tel:0269595982">전화하기</a>
      </aside>
    </main>
  );
}
