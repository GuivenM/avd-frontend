import { Helmet } from 'react-helmet-async';
import { Locale } from '../lib/locale';

const SITE_URL = 'https://www.avd-cg.org';
const SITE_NAME = 'AVD-Congo';

type Props = {
  /** Titre de la page, sans le nom du site (ajouté automatiquement, sauf sur l'accueil) */
  title: string;
  description: string;
  /** Chemin FRANÇAIS de la page, ex: '/qui-sommes-nous' (même en contexte EN — sert de base pour dériver le hreflang) */
  path: string;
  /** Langue de la page actuelle (déduite via useLocale() dans la page appelante) */
  locale?: Locale;
  /** Un ou plusieurs objets schema.org à injecter en JSON-LD */
  jsonLd?: object | object[];
  /** Pages admin ou utilitaires : à exclure de l'indexation */
  noindex?: boolean;
};

export default function Seo({ title, description, path, locale = 'fr', jsonLd, noindex = false }: Props) {
  const frUrl = `${SITE_URL}${path}`;
  const enUrl = `${SITE_URL}/en${path === '/' ? '' : path}`;
  const currentUrl = locale === 'en' ? enUrl : frUrl;
  const fullTitle = path === '/' ? title : `${title} — ${SITE_NAME}`;
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {!noindex && (
        <>
          <link rel="alternate" hrefLang="fr" href={frUrl} />
          <link rel="alternate" hrefLang="en" href={enUrl} />
          <link rel="alternate" hrefLang="x-default" href={frUrl} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'fr_CG'} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />

      {jsonLdItems.map((item, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(item)}</script>
      ))}
    </Helmet>
  );
}
