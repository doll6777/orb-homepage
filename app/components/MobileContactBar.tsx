const bookingUrl = 'https://m.booking.naver.com/booking/16/bizes/1731406?theme=place&lang=ko&area=ple';

export default function MobileContactBar({ english = false }: { english?: boolean }) {
  return (
    <div className="mobile-contact-space">
      <nav className="mobile-cta" aria-label={english ? 'Mobile reservation and contact' : '모바일 예약 및 문의'}>
        <a href={bookingUrl} target="_blank" rel="noreferrer">{english ? 'Naver Booking' : '네이버 예약'}</a>
        <a href="https://pf.kakao.com/_nXGxaX/chat" target="_blank" rel="noreferrer">{english ? 'KakaoTalk Chat' : '카카오톡 상담'}</a>
        <a href="tel:0269595982">{english ? 'Call' : '전화하기'}</a>
      </nav>
    </div>
  );
}
