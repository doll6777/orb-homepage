import type { MetadataRoute } from 'next';
import { treatments } from './lib/clinic';

const baseUrl = 'https://orbclinic.pages.dev';
const lastModified = new Date('2026-10-02T00:00:00+09:00');

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ko: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ko: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: { languages: { ko: `${baseUrl}/privacy`, en: `${baseUrl}/en/privacy` } },
    },
    {
      url: `${baseUrl}/en/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: { languages: { ko: `${baseUrl}/privacy`, en: `${baseUrl}/en/privacy` } },
    },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = treatments.flatMap((treatment) => {
    const ko = `${baseUrl}/treatments/${treatment.slug}`;
    const en = `${baseUrl}/en/treatments/${treatment.slug}`;
    return [
      {
        url: ko,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: { languages: { ko, en } },
      },
      {
        url: en,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: { languages: { ko, en } },
      },
    ];
  });

  return [...coreRoutes, ...treatmentRoutes];
}
