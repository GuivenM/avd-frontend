import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ListState from '../components/ListState';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

type DocumentItem = { id: number; title: string; type: string; file_path: string };

const CONTENT = {
  fr: {
    seoTitle: 'Ressources',
    seoDescription: 'Statuts, règlement intérieur, charte nationale et publication au Journal Officiel de la République du Congo.',
    label: 'Documents officiels',
    h1: 'Ressources',
    empty: 'Aucun document publié pour le moment.',
    download: 'Télécharger le PDF →',
    view: 'Consulter →',
    joTitle: 'Récépissé — Journal Officiel de la République du Congo',
    joMeta: 'Référence JO 2026-31',
    types: { statuts: 'Statuts', reglement_interieur: 'Règlement intérieur', charte_nationale: 'Charte nationale', journal_officiel: 'Journal Officiel', autre: 'Autre document' } as Record<string, string>,
  },
  en: {
    seoTitle: 'Resources',
    seoDescription: 'Bylaws, internal rules, national charter and publication in the Official Journal of the Republic of the Congo.',
    label: 'Official documents',
    h1: 'Resources',
    empty: 'No documents published yet.',
    download: 'Download the PDF →',
    view: 'View →',
    joTitle: 'Receipt — Official Journal of the Republic of the Congo',
    joMeta: 'Reference JO 2026-31',
    types: { statuts: 'Bylaws', reglement_interieur: 'Internal rules', charte_nationale: 'National charter', journal_officiel: 'Official Journal', autre: 'Other document' } as Record<string, string>,
  },
};

export default function Resources() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDocuments(undefined, locale)
      .then((data: any) => setDocuments(Array.isArray(data) ? data : []))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  }, [locale]);

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/ressources" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.seoDescription}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <ListState loading={loading} empty={!loading && documents.length === 0} emptyLabel={c.empty} />
          {documents.length > 0 && (
            <div className="simple-list">
              {documents.map((d) => (
                <div className="row" key={d.id}>
                  <div>
                    <h3>{d.title}</h3>
                    <div className="meta">{c.types[d.type] ?? d.type}</div>
                  </div>
                  <a className="dl" href={d.file_path} target="_blank" rel="noopener">{c.download}</a>
                </div>
              ))}
            </div>
          )}

          <div className="simple-list" style={{ marginTop: 24 }}>
            <div className="row">
              <div>
                <h3>{c.joTitle}</h3>
                <div className="meta">{c.joMeta}</div>
              </div>
              <a className="dl" href="https://sgg.cg/JO/2026/congo-jo-2026-31.pdf" target="_blank" rel="noopener">{c.view}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
