import type { Metadata } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.css';

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || 'G-J9Z8BXQGKQ';
const hasGoogleAnalyticsId = Boolean(
  googleAnalyticsId && /^G-[A-Z0-9]+$/.test(googleAnalyticsId),
);

export const metadata: Metadata = {
  metadataBase: new URL('https://orbclinic.pages.dev'),
  title: {
    default: '마곡나루역 한의원 | 오브한의원 마곡점',
    template: '%s | 오브한의원 마곡점',
  },
  description:
    '마곡나루역 5번 출구 136m 오브한의원 마곡점. 통증·추나, 자율신경·뇌파검사, 스트레스·신경증, 다이어트·열대사 진료와 예약·주차 정보를 안내합니다.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      ko: '/',
      en: '/en',
    },
  },
  openGraph: {
    title: '마곡나루역 한의원 | 오브한의원 마곡점',
    description:
      '마곡나루역 5번 출구 136m. 통증·추나, 자율신경·뇌파검사, 스트레스·신경증, 다이어트·열대사 진료 안내.',
    url: '/',
    siteName: '오브한의원 마곡점',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/orb-space-lobby-wide.jpg',
        alt: '오브한의원 마곡점 로비와 대기 공간',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      'naver-site-verification': '26b999aab138fd17209f1024cf45bdf683c32961',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {hasGoogleAnalyticsId && googleAnalyticsId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${googleAnalyticsId}');
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
