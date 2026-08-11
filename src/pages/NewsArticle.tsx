import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import Seo from '../components/Seo';
import { useLocale, useLocalizedPath } from '../lib/locale';

type Article = { title: string; body: string; excerpt: string | null; category: string; published_at: string | null };

const CONTENT = {
  fr: { loading: 'Chargement…', notFoundTitle: 'Article introuvable', notFoundDesc: "Cet article n'existe pas ou plus.", back: '← Retour aux actualités' },
  en: { loading: 'Loading…', notFoundTitle: 'Article not found', notFoundDesc: 'This article no longer exists.', back: '← Back to news' },
};

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const lp = useLocalizedPath();
  const c = CONTENT[locale];
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.getArticle(slug, locale)
      .then((data: any) => setArticle(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, locale]);

  if (loading) return <section className="page-header"><div className="wrap"><p>{c.loading}</p></div></section>;
  if (notFound || !article) {
    return (
      <section className="page-header">
        <div className="wrap">
          <Seo title={c.notFoundTitle} description={c.notFoundDesc} path={`/actualites/${slug}`} locale={locale} noindex />
          <h1>{c.notFoundTitle}</h1>
          <Link to={lp('/actualites')} className="link">{c.back}</Link>
        </div>
      </section>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    datePublished: article.published_at,
    publisher: { '@type': 'NGO', name: 'Africaine de la Vente Directe - Congo' },
  };

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt ?? article.title}
        path={`/actualites/${slug}`}
        locale={locale}
        jsonLd={jsonLd}
      />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{article.category}</span>
          <h1>{article.title}</h1>
          {article.published_at && <p>{new Date(article.published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')}</p>}
        </div>
      </section>
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          {/* body est du contenu géré par le back-office (rich text) ;
              à assainir côté API avant stockage (ex: HTMLPurifier côté Laravel). */}
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      </section>
    </>
  );
}
