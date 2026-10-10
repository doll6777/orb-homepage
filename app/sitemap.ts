import type { MetadataRoute } from 'next';

const baseUrl = 'https://orbclinic.pages.dev';
const treatmentPaths = [
  '/treatments/pain-chuna',
  '/treatments/autonomic-qeeg',
  '/treatments/stress-neurosis',
  '/treatments/weight-metabolism',
];
const informationPaths = [
  '/about',
  '/column',
  '/column/wet-qeeg-guide',
  '/column/qeeg-process',
  '/column/autonomic-top-down-bottom-up',
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

  const firstVisitPages: MetadataRoute.Sitemap = ['/first-visit', '/en/first-visit'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        ko: `${baseUrl}/first-visit`,
        en: `${baseUrl}/en/first-visit`,
      },
    },
  }));

  const informationPages: MetadataRoute.Sitemap = informationPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path.startsWith('/column') ? 'monthly' : 'yearly',
    priority: path === '/column' ? 0.8 : 0.7,
  }));

  return [...corePages, ...treatmentPages, ...informationPages, ...firstVisitPages];
}
