import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ListState from '../components/ListState';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

type ProjectItem = { id: number; title: string; description: string; status: string };

const CONTENT = {
  fr: {
    seoTitle: 'Projets',
    seoDescription: 'Les programmes portés par AVD-Congo au service de ses 8 piliers stratégiques : DAJAC, Maisons de la Vente Directe, Label AVD-Congo.',
    label: 'Nos initiatives',
    h1: 'Projets',
    empty: 'Aucun projet publié pour le moment.',
    statuses: { a_venir: 'À venir', en_cours: 'En cours', termine: 'Terminé' } as Record<string, string>,
  },
  en: {
    seoTitle: 'Projects',
    seoDescription: "The programs led by AVD-Congo in support of its 8 strategic pillars: DAJAC, Direct Selling Houses, the AVD-Congo Label.",
    label: 'Our initiatives',
    h1: 'Projects',
    empty: 'No projects published yet.',
    statuses: { a_venir: 'Coming soon', en_cours: 'Ongoing', termine: 'Completed' } as Record<string, string>,
  },
};

export default function Projects() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects(locale)
      .then((data: any) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/projets" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.seoDescription}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <ListState loading={loading} empty={!loading && projects.length === 0} emptyLabel={c.empty} />
          {projects.length > 0 && (
            <div className="actus-grid">
              {projects.map((p) => (
                <article className="actu-card" key={p.id}>
                  <div className="thumb" />
                  <span className="label">{c.statuses[p.status] ?? p.status}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
