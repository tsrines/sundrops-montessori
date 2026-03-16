import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sundropsmontessori.com';

  const routes = [
    '',
    '/about-us/',
    '/infant-care/',
    '/toddler-programs/',
    '/preschool-and-kindergarten/',
    '/elementary-school/',
    '/middle-school/',
    '/bridge-campus/',
    '/daniel-island-campus/',
    '/palmetto-campus/',
    '/farm-campus/',
    '/tours/',
    '/faqs/',
    '/contact/',
    '/careers/',
    '/calendar-embed',
    '/field-trip-permission/',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority:
      route === ''
        ? 1
        : route.includes('campus') || route.includes('care') || route.includes('program') || route.includes('school')
          ? 0.8
          : 0.6,
  }));
}
