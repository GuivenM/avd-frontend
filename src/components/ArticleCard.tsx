import { Link } from 'react-router-dom';
import { useLocale, useLocalizedPath } from '../lib/locale';

const CATEGORY_LABELS = {
  fr: { communique: 'Communiqué', alerte: 'Alerte', formation: 'Formation' } as Record<string, string>,
  en: { communique: 'Announcement', alerte: 'Alert', formation: 'Training' } as Record<string, string>,
};

type Props = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  published_at: string | null;
};

export default function ArticleCard({ slug, title, excerpt, category, published_at }: Props) {
  const locale = useLocale();
  const lp = useLocalizedPath();

  return (
    <article className="actu-card">
      <div className="thumb" />
      <span className="label">{CATEGORY_LABELS[locale][category] ?? category}</span>
      <h3><Link to={lp(`/actualites/${slug}`)}>{title}</Link></h3>
      {excerpt && <p>{excerpt}</p>}
      {published_at && <div className="date">{new Date(published_at).toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR')}</div>}
    </article>
  );
}
