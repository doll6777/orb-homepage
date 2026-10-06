import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '오브한의원 마곡점',
    short_name: '오브한의원',
    description:
      '마곡나루역 5번 출구 인근 오브한의원 마곡점의 진료·예약·오시는 길 안내',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0e7',
    theme_color: '#2d211b',
    icons: [
      {
        src: '/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
