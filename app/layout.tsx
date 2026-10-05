import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim() || 'G-J9Z8BXQGKQ';
const hasGoogleAnalyticsId = Boolean(
  googleAnalyticsId && /^G-[A-Z0-9]+$/.test(googleAnalyticsId),
);

export const metadata: Metadata = {
  metadataBase: new URL('https://orb-korean-medicine-clinic.hyeranlee.chatgpt.site'),
  title: {
    default: '오브한의원 마곡점 | 마곡 오브한의원',
    template: '%s | 오브한의원 마곡점',
  },
  description:
    '마곡나루역 5번 출구 인근 오브한의원 마곡점. 통증, 자율신경실조증, 스트레스, 신경증, 다이어트, 열대사장애, 교통사고 후유증 진료 안내.',
  alternates: {
    canonical: '/',
    languages: {
      ko: '/',
      en: '/en',
    },
  },
  openGraph: {
    title: '오브한의원 마곡점 | ORB Korean Medicine Clinic',
    description:
      '마곡나루역 5번 출구 인근 오브한의원 마곡점 치료 안내.',
    url: '/',
    siteName: '오브한의원 마곡점',
    locale: 'ko_KR',
    type: 'website',
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
      <body className={`${notoSansKr.variable} antialiased`}>{children}</body>
    </html>
  );
}
