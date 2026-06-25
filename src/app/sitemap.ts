import { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export const dynamic = 'force-static';

const DOMAIN = 'https://berrybbyluxe.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.map((product) => ({
    url: `${DOMAIN}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categories = [
    'bedroom',
    'dining-set',
    'house-decoratives',
    'living-room',
    'office',
    'side-standing-lamps',
    'turkey',
    'bulbs',
    'ceiling-lighting',
    'chandeliers',
    'outdoor-lighting',
    'pendant-lighting',
    'switches-sockets',
    'wall-brackets',
  ];

  const categoryEntries = categories.map((slug) => ({
    url: `${DOMAIN}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/products',
    '/lookbook',
    '/about',
    '/services',
    '/contact',
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  return [...routes, ...categoryEntries, ...productEntries];
}