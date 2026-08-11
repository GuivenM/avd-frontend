import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';
import ListState from '../components/ListState';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

type Article = { id: number; slug: string; title: string; excerpt: string | null; category: string; published_at: string | null };

const CONTENT = {
  fr: {
    seoTitle: 'Actualités & alertes anti-arnaque',
    seoDescription: "Communiqués officiels, alertes de prévention et informations sur les programmes de formation d'AVD-Congo.",
    label: 'À la une',
    h1: 'Actualités & alertes anti-arnaque',
    empty: 'Aucune actualité publiée pour le moment.',
  },
  en: {
    seoTitle: 'News & scam-prevention alerts',
    seoDescription: "Official announcements, prevention alerts and updates on AVD-Congo's training programs.",
    label: 'Latest',
    h1: 'News & scam-prevention alerts',
    empty: 'No news published yet.',
  },
};

export default function News() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticles(locale)
      .then((data: any) => setArticles(data.data ?? []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/actualites" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.seoDescription}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <ListState loading={loading} empty={!loading && articles.length === 0} emptyLabel={c.empty} />
          {articles.length > 0 && (
            <div className="actus-grid">
              {articles.map((a) => (
                <ArticleCard key={a.id} {...a} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
