import type { MetadataRoute } from 'next';

const baseUrl = 'https://orbclinic.pages.dev';
const treatmentPaths = [
  '/treatments/pain-chuna',
  '/treatments/autonomic-qeeg',
  '/treatments/stress-neurosis',
  '/treatments/weight-metabolism',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          ko: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
  ];

  const treatmentPages: MetadataRoute.Sitemap = treatmentPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...corePages, ...treatmentPages];
}
