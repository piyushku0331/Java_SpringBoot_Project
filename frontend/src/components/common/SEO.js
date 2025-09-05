import { useEffect } from 'react';

function setTag(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setTitle(title) {
  if (title) document.title = title;
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  og = {},
  twitter = {},
  noIndex = false,
  schema,
}) {
  useEffect(() => {
    setTitle(title);
    setTag('description', description);
    setTag('keywords', keywords);
    setTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical
    setLink('canonical', canonical);

    // Open Graph
    setTag('og:title', og.title || title, 'property');
    setTag('og:description', og.description || description, 'property');
    setTag('og:type', og.type || 'website', 'property');
    setTag('og:image', og.image, 'property');
    setTag('og:url', og.url || canonical, 'property');

    // Twitter
    setTag('twitter:card', twitter.card || 'summary');
    setTag('twitter:title', twitter.title || title);
    setTag('twitter:description', twitter.description || description);
    setTag('twitter:image', twitter.image);

    // JSON-LD Structured Data
    const existing = document.getElementById('ld-json');
    if (existing) existing.remove();
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, canonical, JSON.stringify(og), JSON.stringify(twitter), noIndex, JSON.stringify(schema)]);

  return null;
}


