import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';

export const metadata: Metadata = {
  title: '첫 방문 안내',
  description:
    '오브한의원 마곡점 첫 방문 안내. 예약, 접수, 상담과 검사, 진료 및 주차 정보를 확인하세요.',
  alternates: {
    canonical: '/first-visit',
  },
};

const bookingUrl =
  'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

const steps = [
  {
    title: '예약',
    body: '네이버 예약, 카카오톡 상담 또는 전화로 원하는 일정을 확인합니다.',
  },
  {
    title: '접수와 문진',
    body: '현재 불편과 시작 시점, 복용 중인 약과 이전 검사 내용을 확인합니다.',
  },
  {
    title: '상담과 상태 확인',
    body: '증상과 생활 리듬을 상담하고 필요한 진찰 및 검사 여부를 안내합니다.',
  },
  {
    title: '진료와 안내',
    body: '현재 상태에 맞는 진료를 진행하고 이후의 내원 및 생활 관리 방향을 설명합니다.',
  },
];

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
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="visit-preparation content-section">
        <div>
          <p className="eyebrow">방문 전 확인</p>
          <h2>방문 전에 확인해 주세요</h2>
        </div>
        <dl>
          <div>
            <dt>준비하면 좋은 자료</dt>
            <dd>최근 검사 결과, 영상 자료, 복용 중인 약 목록이 있다면 가져와 주세요.</dd>
          </div>
          <div>
            <dt>검사 예정인 경우</dt>
            <dd>검사별 준비 사항은 예약 시 안내받은 내용을 우선해 주세요.</dd>
          </div>
          <div>
            <dt>예약 변경</dt>
            <dd>일정 변경이 필요한 경우 예약 채널이나 전화로 미리 알려 주세요.</dd>
          </div>
          <div>
            <dt>주차</dt>
            <dd>롯데캐슬 르웨스트 지하주차장 이용 시 2시간 무료입니다.</dd>
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
