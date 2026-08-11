import { useLocation } from 'react-router-dom';

export type Locale = 'fr' | 'en';

/** Déduit la langue actuelle depuis le préfixe d'URL (/en/... vs /...). */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

/**
 * Préfixe un chemin français (ex: '/qui-sommes-nous') selon la langue active.
 * À utiliser pour TOUS les liens internes (nav, footer, CTA...) afin de
 * rester dans la même langue en naviguant.
 */
export function useLocalizedPath() {
  const locale = useLocale();
  return (path: string) => (locale === 'en' ? `/en${path === '/' ? '' : path}` : path);
}

/** Pour le sélecteur FR/EN : calcule l'URL de la page équivalente dans l'autre langue. */
export function useAlternateLocaleLink() {
  const { pathname } = useLocation();
  const locale = useLocale();
  if (locale === 'en') {
    const frPath = pathname.replace(/^\/en/, '') || '/';
    return { altLocale: 'fr' as Locale, altPath: frPath };
  }
  return { altLocale: 'en' as Locale, altPath: `/en${pathname === '/' ? '' : pathname}` };
}
