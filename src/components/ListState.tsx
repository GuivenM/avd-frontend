import { useLocale } from '../lib/locale';
import { common } from '../i18n/common';

type Props = {
  loading: boolean;
  empty: boolean;
  emptyLabel?: string;
};

// Petit composant partagé pour ne pas répéter la même logique "chargement /
// vide / résultats" dans Directory, Resources, Projects, Partners, News.
export default function ListState({ loading, empty, emptyLabel }: Props) {
  const locale = useLocale();
  const t = common[locale];
  const defaultEmpty = locale === 'en' ? 'No results yet.' : 'Aucun résultat pour le moment.';

  if (loading) return <p style={{ color: 'var(--gray)' }}>{t.loading}</p>;
  if (empty) return <p style={{ color: 'var(--gray)' }}>{emptyLabel ?? defaultEmpty}</p>;
  return null;
}
