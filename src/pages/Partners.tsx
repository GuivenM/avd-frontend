import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ListState from '../components/ListState';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

type Partner = { id: number; name: string; website: string | null; description: string | null };

const CONTENT = {
  fr: {
    seoTitle: 'Entreprises & institutions partenaires',
    seoDescription: 'Les entreprises de vente directe et institutions qui accompagnent AVD-Congo dans sa mission de structuration du secteur.',
    label: 'Ils nous font confiance',
    h1: 'Entreprises & institutions partenaires',
    companiesTitle: 'Entreprises partenaires',
    institutionsTitle: 'Institutions partenaires',
    emptyCompanies: 'Aucune entreprise partenaire publiée pour le moment.',
    emptyInstitutions: 'Aucune institution partenaire publiée pour le moment.',
    visit: 'Visiter le site →',
  },
  en: {
    seoTitle: 'Corporate & institutional partners',
    seoDescription: 'The direct selling companies and institutions supporting AVD-Congo in its mission to structure the sector.',
    label: 'They trust us',
    h1: 'Corporate & institutional partners',
    companiesTitle: 'Corporate partners',
    institutionsTitle: 'Institutional partners',
    emptyCompanies: 'No corporate partners published yet.',
    emptyInstitutions: 'No institutional partners published yet.',
    visit: 'Visit website →',
  },
};

export default function Partners() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [entreprises, setEntreprises] = useState<Partner[]>([]);
  const [institutions, setInstitutions] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getPartners('entreprise', locale), api.getPartners('institution', locale)])
      .then(([e, i]: any[]) => {
        setEntreprises(Array.isArray(e) ? e : []);
        setInstitutions(Array.isArray(i) ? i : []);
      })
      .catch(() => { setEntreprises([]); setInstitutions([]); })
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/partenaires" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <div className="section-head"><div><h2>{c.companiesTitle}</h2></div></div>
          <ListState loading={loading} empty={!loading && entreprises.length === 0} emptyLabel={c.emptyCompanies} />
          {entreprises.length > 0 && (
            <div className="simple-list" style={{ marginBottom: 60 }}>
              {entreprises.map((p) => (
                <div className="row" key={p.id}>
                  <div><h3>{p.name}</h3>{p.description && <div className="meta">{p.description}</div>}</div>
                  {p.website && <a className="dl" href={p.website} target="_blank" rel="noopener">{c.visit}</a>}
                </div>
              ))}
            </div>
          )}

          <div className="section-head"><div><h2>{c.institutionsTitle}</h2></div></div>
          {!loading && institutions.length === 0 && <p style={{ color: 'var(--gray)' }}>{c.emptyInstitutions}</p>}
          {institutions.length > 0 && (
            <div className="simple-list">
              {institutions.map((p) => (
                <div className="row" key={p.id}>
                  <div><h3>{p.name}</h3>{p.description && <div className="meta">{p.description}</div>}</div>
                  {p.website && <a className="dl" href={p.website} target="_blank" rel="noopener">{c.visit}</a>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
