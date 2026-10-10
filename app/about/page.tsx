import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';
import ResponsiveImage from '../components/ResponsiveImage';

export const metadata: Metadata = {
  title: '병원 소개',
  description:
    '마곡나루역 오브한의원 마곡점의 진료 철학, 공간과 진료 환경을 소개합니다.',
  alternates: {
    canonical: '/about',
  },
};

const principles = [
  {
    label: '상담',
    title: '현재의 불편을 충분히 듣습니다',
    body: '증상이 시작된 시점과 변화 과정, 생활 리듬, 복용 중인 약과 이전 검사 내용을 확인합니다.',
  },
  {
    label: '확인',
    title: '필요한 진찰과 검사를 안내합니다',
    body: '모든 검사를 일률적으로 진행하지 않고 상담과 진찰을 바탕으로 필요한 항목을 설명합니다.',
  },
  {
    label: '설명',
    title: '진료 방향을 이해하기 쉽게 설명합니다',
    body: '진료 과정과 내원 계획, 생활에서 함께 살펴볼 내용을 현재 상태에 맞춰 안내합니다.',
  },
];

const memberships = [
  '대한한의사협회',
  '척추신경추나의학회',
  '대한한의학회',
  '대한한방비만학회',
  '대한통합암학회',
  '대한뇌파한의학회',
  '한의정보협동조합',
];

export default function AboutPage() {
  return (
    <main className="interior-page about-page">
      <ClinicHeader />
      <section className="interior-hero photo-hero">
        <figure>
          <ResponsiveImage src="/orb-space-lobby-wide.jpg" alt="오브한의원 마곡점 로비와 대기 공간" sizes="(max-width: 980px) 100vw, 54vw" priority />
        </figure>
        <div>
          <p className="eyebrow">병원 소개</p>
          <h1>현재의 불편을 충분히 듣고 필요한 진료 과정을 설명합니다.</h1>
          <p>
            통증과 움직임, 자율신경과 스트레스, 수면과 생활 리듬을 함께
            확인하며 각자의 상태에 맞는 진료 방향을 안내합니다.
          </p>
        </div>
      </section>

      <section className="about-intro content-section">
        <div>
          <p className="eyebrow">진료 원칙</p>
          <h2>상담부터 진료 후 안내까지</h2>
        </div>
        <p>
          사람마다 불편이 시작된 배경과 일상 환경이 다릅니다. 충분히 듣고,
          필요한 부분을 확인한 뒤 현재 상태에 맞는 진료 과정을 설명하는 것을
          기본으로 삼습니다.
        </p>
      </section>

      <section className="principle-cards">
        {principles.map((principle) => (
          <article key={principle.label}>
            <small>{principle.label}</small>
            <h2>{principle.title}</h2>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="about-environment content-section">
        <figure>
          <ResponsiveImage src="/orb-space-treatment.jpg" alt="오브한의원 독립 치료 공간" sizes="(max-width: 980px) 100vw, 50vw" />
        </figure>
        <div>
          <p className="eyebrow">진료 환경</p>
          <h2>진료에 집중할 수 있는 공간</h2>
          <p>
            상담과 검사를 위한 공간, 독립된 치료실과 차분한 대기 공간을
            마련했습니다. 마곡나루역 5번 출구에서 도보 136m이며 건물
            지하주차장 이용 시 2시간 무료 주차가 가능합니다.
          </p>
          <a className="text-link" href="/#space-gallery">공간 둘러보기 →</a>
        </div>
      </section>

      <section className="membership-section content-section">
        <div>
          <p className="eyebrow">학회 및 협회 활동</p>
          <h2>학회 및 협회 활동</h2>
        </div>
        <ul>
          {memberships.map((membership) => (
            <li key={membership}>{membership} 회원</li>
          ))}
        </ul>
      </section>
      <ClinicFooter />
    </main>
  );
}
