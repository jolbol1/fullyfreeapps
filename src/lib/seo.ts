import { site } from '@/lib/site';

/** Head tags for a page. Child routes override the root's by name/property. */
export function seo({
  title,
  description,
  path,
  image = '/og.png',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${site.url}${path}`;
  const imageUrl = `${site.url}${image}`;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({ '@context': 'https://schema.org', ...data }),
  };
}
