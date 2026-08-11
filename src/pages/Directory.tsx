import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ListState from '../components/ListState';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

type Member = {
  id: number;
  first_name: string;
  last_name: string;
  company_name: string;
  grade: string;
  city: string | null;
  member_number: string | null;
};

const CONTENT = {
  fr: {
    seoTitle: 'Annuaire des membres',
    seoDescription: "Consultez l'annuaire public des vendeurs, distributeurs et entreprises de vente directe certifiés par AVD-Congo.",
    label: 'Nos membres',
    h1: 'Annuaire des membres certifiés',
    intro: 'Vendeurs, distributeurs et entreprises validés par nos commissions techniques, à jour en continu.',
    empty: 'Aucun membre publié pour le moment.',
    grades: { vendeur_independant: 'Vendeur indépendant', distributeur: 'Distributeur', responsable_equipe: "Responsable d'équipe", entreprise: 'Entreprise' } as Record<string, string>,
  },
  en: {
    seoTitle: 'Member directory',
    seoDescription: 'Browse the public directory of sellers, distributors and direct selling companies certified by AVD-Congo.',
    label: 'Our members',
    h1: 'Certified member directory',
    intro: 'Sellers, distributors and companies approved by our technical committees, updated continuously.',
    empty: 'No members published yet.',
    grades: { vendeur_independant: 'Independent seller', distributeur: 'Distributor', responsable_equipe: 'Team leader', entreprise: 'Company' } as Record<string, string>,
  },
};

export default function Directory() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPublicDirectory()
      .then((data: any) => setMembers(data.data ?? []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/annuaire" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <ListState loading={loading} empty={!loading && members.length === 0} emptyLabel={c.empty} />
          {members.length > 0 && (
            <div className="simple-list">
              {members.map((m) => (
                <div className="row" key={m.id}>
                  <div>
                    <h3>{m.first_name} {m.last_name} — {m.company_name}</h3>
                    <div className="meta">{c.grades[m.grade] ?? m.grade}{m.city ? ` · ${m.city}` : ''}</div>
                  </div>
                  {m.member_number && <span className="meta">{m.member_number}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
