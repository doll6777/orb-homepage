import type { Metadata } from 'next';
import ClinicHeader from '../components/ClinicHeader';
import ClinicFooter from '../components/ClinicFooter';
import InternalTrafficControls from './InternalTrafficControls';

export const metadata: Metadata = {
  title: '방문 통계 제외 설정',
  description: '이 브라우저의 홈페이지 방문을 이용 통계에서 제외하는 설정입니다.',
  alternates: { canonical: '/internal-traffic' },
  robots: { index: false, follow: false },
};

export default function InternalTrafficPage() {
  return (
    <main className="interior-page policy-page">
      <ClinicHeader />
      <section className="policy-content">
        <p className="eyebrow">방문 통계 설정</p>
        <h1>내 접속은 통계에서 제외하기</h1>
        <p>홈페이지를 관리하거나 점검하는 본인·직원용 설정입니다. 이 설정 페이지 자체는 방문 통계에 기록하지 않습니다.</p>
        <InternalTrafficControls />
        <section>
          <h2>각 기기와 브라우저에서 한 번씩</h2>
          <p>이 설정은 현재 홈페이지 주소의 브라우저 저장소에만 보관됩니다. 맥북 Chrome에서 설정해도 iPhone, Safari, 다른 Chrome 프로필이나 시크릿 창에는 적용되지 않습니다. 업무에 사용하는 각 브라우저에서 이 페이지를 열고 제외를 켜 주세요.</p>
          <p>사이트 데이터를 삭제하거나 브라우저를 초기화하면 설정이 사라질 수 있습니다. 직원 이름이나 IP 주소는 입력하거나 전송하지 않습니다.</p>
        </section>
        <section>
          <h2>앞으로의 접속부터 적용됩니다</h2>
          <p>이미 수집된 통계는 삭제하지 않습니다. 설정 후 열려 있던 홈페이지 탭은 새로고침해 주세요. 제외를 해제해도 지나간 방문을 소급해서 기록하지 않습니다.</p>
        </section>
      </section>
      <ClinicFooter showContactBar={false} />
    </main>
  );
}
