import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';
import SiteMotion from '../components/SiteMotion';
import ResponsiveImage from '../components/ResponsiveImage';
import {
  makeTreatmentJsonLd,
  type Treatment,
} from './treatment-data';

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';
const kakaoChatUrl = 'https://pf.kakao.com/_nXGxaX/chat';

export default function TreatmentPage({ treatment }: { treatment: Treatment }) {
  const jsonLd = makeTreatmentJsonLd(treatment);
  const relatedColumns = treatment.slug === 'autonomic-qeeg'
    ? [
        {
          href: '/column/wet-qeeg-guide',
          label: '정량뇌파검사의 목적과 결과 해석',
        },
        {
          href: '/column/qeeg-process',
          label: '정량뇌파검사 전 준비와 진행 과정',
        },
        {
          href: '/column/autonomic-top-down-bottom-up',
          label: '자율신경의 불편을 뇌와 몸의 연결로 살펴보는 이유',
        },
      ]
    : treatment.slug === 'stress-neurosis'
      ? [
          {
            href: '/column/autonomic-top-down-bottom-up',
            label: '스트레스·수면·신체 긴장을 함께 살펴보는 진료 관점',
          },
        ]
      : [];

  return (
    <main className="treatment-detail">
      <SiteMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClinicHeader />

      <section className="detail-hero">
        <figure>
          <ResponsiveImage src={treatment.image} alt={treatment.imageAlt} sizes="(max-width: 980px) 100vw, 55vw" priority />
        </figure>
        <div className="detail-hero-copy">
          <nav className="breadcrumbs" aria-label="현재 위치">
            <a href="/">홈</a>
            <span aria-hidden="true">/</span>
            <span>{treatment.title}</span>
          </nav>
          <p className="eyebrow">진료 안내</p>
          <h1>{treatment.pageTitle}</h1>
          <p>{treatment.lead}</p>
        </div>
      </section>

      <section className="detail-section detail-concerns">
        <div>
          <p className="eyebrow">상담 대상</p>
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
          <p className="eyebrow">진료 과정</p>
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

      {relatedColumns.length > 0 ? (
        <section className="detail-section detail-concerns" aria-labelledby="treatment-reading-heading">
          <div>
            <p className="eyebrow">관련 의료 칼럼</p>
            <h2 id="treatment-reading-heading">상담 전에 읽어보세요</h2>
          </div>
          <ul className="contextual-links">
            {relatedColumns.map((column) => (
              <li key={column.href}><a href={column.href}>{column.label}</a></li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="detail-reservation">
        <div>
          <p className="eyebrow">예약 안내</p>
          <h2>마곡나루역 5번 출구에서 136m</h2>
          <p>
            진료 및 검사 여부는 상담 후 개인별 상태에 따라 달라질 수 있습니다.
            방문 전 네이버 예약이나 전화로 일정을 확인해 주세요. 준비물과
            주차 정보는{' '}
            <a className="contextual-link" href="/first-visit">첫 방문 안내</a>에서
            확인하실 수 있습니다.
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

      <ClinicFooter />
    </main>
  );
}
