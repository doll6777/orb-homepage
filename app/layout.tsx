import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '무엇을 치료하나요 | 오브한의원',
  description: '통증, 자율신경실조증, 스트레스, 신경증, 다이어트, 열대사장애, 교통사고 후유증을 다루는 오브한의원 치료 안내.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} antialiased`}>{children}</body>
    </html>
  );
}
