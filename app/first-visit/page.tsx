import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';
import { firstVisitQuestions, firstVisitSteps } from './visit-data';

export const metadata: Metadata = {
  title: '첫 방문 안내',
  description:
    '오브한의원 마곡점 첫 방문 안내. 예약, 접수, 상담과 검사, 진료 및 주차 정보를 확인하세요.',
  alternates: {
    canonical: '/first-visit',
    languages: { ko: '/first-visit', en: '/en/first-visit' },
  },
};

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

export default function FirstVisitPage() {
  return (
    <main className="interior-page first-visit-page">
      <ClinicHeader />
      <section className="interior-hero compact-hero">
        <div>
          <p className="eyebrow">첫 방문 안내</p>
          <h1>처음 방문하시는 분께</h1>
          <p>
            편안하게 진료받으실 수 있도록 예약부터 진료 후 안내까지의 흐름을
            미리 알려드립니다.
            <br />
            <a className="contextual-link" href="/en/first-visit" hrefLang="en" lang="en">First visit guide in English →</a>
          </p>
        </div>
      </section>

      <section className="visit-steps content-section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">진료 순서</p>
            <h2>첫 방문 진료 과정</h2>
          </div>
          <p>
            검사 종류와 진료 과정은 현재의 불편과 건강 상태에 따라 달라질 수
            있습니다.
          </p>
        </div>
        <ol>
          {firstVisitSteps.map((step, index) => (
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
          <p className="eyebrow">자주 묻는 질문</p>
          <h2 id="visit-faq-heading">방문 전에 확인해 주세요</h2>
        </div>
        <dl>
          {firstVisitQuestions.map(({ id, question, answer }) => (
            <div key={id}>
              <dt>{question}</dt>
              <dd>{answer}</dd>
            </div>
          ))}
          <div>
            <dt>방문 전에 무엇을 준비하나요?</dt>
            <dd>
              최근 검사 결과, 영상 자료, 복용 중인 약 목록이 있다면 가져와 주세요.
              검사별 준비 사항은 예약 시 안내받은 내용을 우선해 주세요.
              정량뇌파검사를 앞두셨다면{' '}
              <a className="contextual-link" href="/column/qeeg-process">검사 전 준비와 진행 과정</a>을
              미리 살펴보실 수 있습니다. 복용 중인 약은 임의로 중단하지 말고
              의료진과 먼저 상의해 주세요.
            </dd>
          </div>
          <div>
            <dt>예약을 변경하려면 어떻게 하나요?</dt>
            <dd>일정 변경이 필요한 경우 예약 채널이나 전화로 미리 알려 주세요.</dd>
          </div>
        </dl>
      </section>

      <section className="first-visit-cta">
        <div>
          <p className="eyebrow">예약 안내</p>
          <h2>방문 일정을 확인해 보세요</h2>
          <p>마곡나루역 5번 출구에서 136m · 02-6959-5982</p>
        </div>
        <a href={bookingUrl} target="_blank" rel="noreferrer">네이버 예약</a>
      </section>
      <ClinicFooter />
    </main>
  );
}
