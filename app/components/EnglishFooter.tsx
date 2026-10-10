import MobileContactBar from './MobileContactBar';

export default function EnglishFooter() {
  return (
    <>
      <footer className="clinic-footer">
        <div className="footer-brand">
          <a className="wordmark" href="/en">ORB</a>
          <strong>ORB Korean Medicine Clinic Magok</strong>
          <p>Origin · Reset · Balance</p>
        </div>
        <address>
          111 Magokjungang-ro, Gangseo-gu, Seoul<br />
          Lotte Castle Le West, Building 104, 2F, Units 238–239<br />
          <a href="tel:+82269595982">+82-2-6959-5982</a>
        </address>
        <nav aria-label="Footer navigation">
          <a href="/en#areas">Treatments</a>
          <a href="/en/first-visit">Your first visit</a>
          <a href="/en/first-visit#booking">How to book</a>
          <a href="/en#directions">Directions &amp; opening hours</a>
          <a href="/privacy" hrefLang="ko">Privacy information (Korean)</a>
        </nav>
        <div className="footer-note">
          <p>Please confirm language assistance with the clinic before booking.</p>
          <p>Website information is general and does not replace an individual medical consultation.</p>
          <small>© 2026 ORB Korean Medicine Clinic. All rights reserved.</small>
        </div>
      </footer>
      <MobileContactBar english />
    </>
  );
}
