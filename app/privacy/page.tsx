import type { Metadata } from 'next';
import ClinicFooter from '../components/ClinicFooter';
import ClinicHeader from '../components/ClinicHeader';

export const metadata: Metadata = {
  title: '개인정보 처리 안내',
  description: '오브한의원 마곡점 홈페이지 개인정보 처리 안내입니다.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="interior-page policy-page">
      <ClinicHeader />
      <section className="policy-content">
        <p className="eyebrow">개인정보 안내</p>
        <h1>개인정보 처리 안내</h1>
        <p className="policy-updated">시행일: 2026년 10월 5일</p>

        <section>
          <h2>홈페이지 내 개인정보 수집</h2>
          <p>
            오브한의원 마곡점 홈페이지는 별도의 회원가입이나 개인정보 입력
            양식을 운영하지 않습니다. 예약과 상담은 네이버 예약, 카카오톡 및
            전화 등 외부 채널을 통해 진행되며 각 서비스의 개인정보 처리방침이
            적용됩니다.
          </p>
        </section>
        <section>
          <h2>방문 통계</h2>
          <p>
            홈페이지 이용 현황을 파악하고 서비스를 개선하기 위해 Google
            Analytics를 사용합니다. 이 과정에서 쿠키, 접속 환경, 방문 페이지와
            같은 이용 정보가 처리될 수 있으며 개인을 직접 식별하기 위한
            목적으로 사용하지 않습니다.
          </p>
          <p>
            현재 운영 홈페이지에서만 방문 통계를 수집하며 개발·미리보기 환경은
            수집 대상에서 제외합니다. <a href="/internal-traffic">방문 통계 제외 설정</a>에서
            현재 브라우저의 방문과 버튼 클릭 수집을 중단할 수 있습니다.
            설정은 이 브라우저에 저장되며 기존 통계에는 소급 적용되지 않습니다.
          </p>
        </section>
        <section>
          <h2>외부 서비스</h2>
          <p>
            홈페이지에는 네이버 예약·플레이스, 카카오톡, Google 지도 등 외부
            서비스로 연결되는 링크가 포함되어 있습니다. 외부 서비스 이용 시
            해당 사업자의 정책이 적용됩니다.
          </p>
        </section>
        <section>
          <h2>문의</h2>
          <p>
            홈페이지의 개인정보 처리에 관한 문의는 오브한의원 마곡점
            02-6959-5982로 연락해 주세요.
          </p>
        </section>
      </section>
      <ClinicFooter />
    </main>
  );
}
