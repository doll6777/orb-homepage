import MobileContactBar from './MobileContactBar';

const naverPlaceUrl =
  'https://pcmap.place.naver.com/hospital/2005324011/home';
const kakaoChatUrl = 'https://pf.kakao.com/_nXGxaX/chat';

export default function ClinicFooter({ showContactBar = true }: { showContactBar?: boolean }) {
  return (
    <>
    <footer className="clinic-footer">
      <div className="footer-brand">
        <a className="wordmark" href="/">
          ORB
        </a>
        <strong>오브한의원 마곡점</strong>
        <p>Origin · Reset · Balance</p>
      </div>
      <address>
        서울특별시 강서구 마곡중앙로 111
        <br />
        롯데캐슬 르웨스트 104동 2층 238호, 239호
        <br />
        <a href="tel:0269595982">02-6959-5982</a>
      </address>
      <nav aria-label="하단 메뉴">
        <a href="/about">병원 소개</a>
        <a href="/first-visit">첫 방문 안내</a>
        <a href="/column">의료 칼럼</a>
        <a href={naverPlaceUrl} target="_blank" rel="noreferrer">
          네이버 플레이스
        </a>
        <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
          카카오톡 상담
        </a>
        <a href="/privacy">개인정보 처리 안내</a>
      </nav>
      <div className="footer-note">
        <p>
          홈페이지의 의료정보는 일반적인 건강정보이며 개인의 진단이나 치료를
          대신하지 않습니다.
        </p>
        <small>© 2026 ORB Korean Medicine Clinic. All rights reserved.</small>
      </div>
    </footer>
    {showContactBar ? <MobileContactBar /> : null}
    </>
  );
}
