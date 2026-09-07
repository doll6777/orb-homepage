import type { MetadataRoute } from 'next';

const baseUrl = 'https://orb-korean-medicine-clinic.hyeranlee.chatgpt.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
