import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';

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
    word: 'Origin',
    title: '불편의 시작을 살핍니다',
    body: '현재의 증상뿐 아니라 시작된 시점과 생활 리듬, 함께 나타나는 신체 신호를 확인합니다.',
  },
  {
    word: 'Reset',
    title: '회복의 기준을 다시 맞춥니다',
    body: '상담과 필요한 검사를 바탕으로 개인별 상태에 맞는 진료 방향을 설명합니다.',
  },
  {
    word: 'Balance',
    title: '일상으로 이어지는 균형을 생각합니다',
    body: '진료실 안의 처치에 그치지 않고 수면, 움직임과 생활 환경까지 함께 살핍니다.',
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
          <img src="/orb-space-lobby-wide.jpg" alt="오브한의원 마곡점 로비와 대기 공간" />
        </figure>
        <div>
          <p className="eyebrow">ABOUT ORB</p>
          <h1>몸의 신호를 함께 읽고<br />회복의 방향을 찾습니다.</h1>
          <p>
            오브한의원 마곡점은 통증과 움직임, 자율신경과 스트레스,
            수면과 생활 리듬을 서로 분리하지 않고 함께 살펴봅니다.
          </p>
        </div>
      </section>

      <section className="about-intro content-section">
        <div>
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Origin · Reset · Balance</h2>
        </div>
        <p>
          사람마다 불편이 시작된 배경과 일상 환경이 다릅니다. 충분히 듣고,
          필요한 부분을 확인한 뒤 현재 상태에 맞는 진료 과정을 설명하는 것을
          기본으로 삼습니다.
        </p>
      </section>

      <section className="principle-cards">
        {principles.map((principle, index) => (
          <article key={principle.word}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>{principle.word}</small>
            <h2>{principle.title}</h2>
            <p>{principle.body}</p>
          </article>
        ))}
      </section>

      <section className="about-environment content-section">
        <figure>
          <img src="/orb-space-treatment.jpg" alt="오브한의원 독립 치료 공간" />
        </figure>
        <div>
          <p className="eyebrow">CARE ENVIRONMENT</p>
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
          <p className="eyebrow">MEMBERSHIP</p>
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
