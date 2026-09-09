'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { breadcrumbSchema } from '@/lib/schema';

interface Crumb {
  name: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] === 'fr' ? 'fr' : 'en';
  const isFr = locale === 'fr';

  // Prefix any relative crumb URL with the current locale; absolute URLs
  // (http/https) pass through unchanged.
  const withLocale = (url: string) => {
    if (/^https?:\/\//.test(url)) return url;
    if (url.startsWith(`/${locale}`)) return url;
    return `/${locale}${url === '/' ? '' : url}`;
  };

  const all = [
    { name: isFr ? 'Accueil' : 'Home', url: `/${locale}` },
    ...items.map((item) => ({ name: item.name, url: withLocale(item.url) })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(all)) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={crumb.url}>
                {isLast ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <>
                    <Link href={crumb.url}>{crumb.name}</Link>
                    <span className="breadcrumb-sep" aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
