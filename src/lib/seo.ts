import { useEffect } from 'react';

const SITE_NAME = 'ULAGAT';
const SITE_URL = 'https://ulagat-krg.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

type SeoType = 'website' | 'article';

export interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: SeoType;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

function upsertStructuredData(data: Record<string, unknown>) {
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-ld="dynamic"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-ld', 'dynamic');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function normalizePath(path?: string) {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function useSeo(options: SeoOptions) {
  useEffect(() => {
    const path = normalizePath(options.path);
    const canonicalUrl = `${SITE_URL}${path}`;
    const image = options.image || DEFAULT_IMAGE;
    const robots = options.noindex ? 'noindex, nofollow' : 'index, follow';

    document.title = options.title;

    upsertMeta('name', 'description', options.description);
    upsertMeta('name', 'robots', robots);

    upsertMeta('property', 'og:type', options.type || 'website');
    upsertMeta('property', 'og:title', options.title);
    upsertMeta('property', 'og:description', options.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'kk_KZ');
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', options.title);
    upsertMeta('name', 'twitter:description', options.description);
    upsertMeta('name', 'twitter:image', image);

    upsertCanonical(canonicalUrl);

    if (options.structuredData) {
      upsertStructuredData(options.structuredData);
    }
  }, [options]);
}

export const seoSite = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  defaultImage: DEFAULT_IMAGE,
};
