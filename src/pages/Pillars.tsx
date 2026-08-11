import PilierDetail from '../components/PilierDetail';
import MembershipCta from '../components/MembershipCta';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

const PILLARS = {
  fr: [
    { title: 'Professionnalisation', items: ['Renforcement des compétences', 'Certification des professionnels', 'Promotion des bonnes pratiques', 'Développement du Label AVD-Congo'] },
    { title: 'Innovation numérique', items: ['Digitalisation des activités', 'Intelligence artificielle', 'Commerce électronique', 'Formation aux outils numériques'] },
    { title: 'Protection des consommateurs', items: ['Renforcement de la médiation', 'Information du public', 'Promotion des pratiques éthiques'] },
    { title: 'Jeunesse', items: ['Développement du programme DAJAC', 'Incubation entrepreneuriale', "Formation à l'entrepreneuriat relationnel"] },
    { title: 'Leadership féminin', items: ["Promotion de l'entrepreneuriat féminin", 'Accompagnement des femmes', 'Accès au leadership'] },
    { title: 'Développement territorial', items: ['Implantation dans les 12 départements', 'Création des Maisons de la Vente Directe', 'Renforcement des coordinations locales'] },
    { title: 'Coopération internationale', items: ['Partenariats africains et autres', 'Coopération technique', "Échanges d'expériences"] },
    { title: 'Gouvernance exemplaire', items: ['Transparence', 'Redevabilité', 'Évaluation permanente', 'Innovation institutionnelle'] },
  ],
  en: [
    { title: 'Professionalization', items: ['Skills development', 'Professional certification', 'Promotion of best practices', 'Development of the AVD-Congo Label'] },
    { title: 'Digital innovation', items: ['Digitalization of activities', 'Artificial intelligence', 'E-commerce', 'Digital tools training'] },
    { title: 'Consumer protection', items: ['Strengthening mediation', 'Public information', 'Promotion of ethical practices'] },
    { title: 'Youth', items: ['Development of the DAJAC program', 'Entrepreneurial incubation', 'Relationship-marketing entrepreneurship training'] },
    { title: "Women's leadership", items: ["Promotion of women's entrepreneurship", 'Support for women', 'Access to leadership'] },
    { title: 'Territorial development', items: ['Presence across all 12 departments', 'Creation of Direct Selling Houses', 'Strengthening local coordination'] },
    { title: 'International cooperation', items: ['African and other partnerships', 'Technical cooperation', 'Exchange of experience'] },
    { title: 'Exemplary governance', items: ['Transparency', 'Accountability', 'Ongoing evaluation', 'Institutional innovation'] },
  ],
};

const CONTENT = {
  fr: {
    seoDescription: "Découvrez les 8 piliers stratégiques d'AVD-Congo : professionnalisation, innovation numérique, protection des consommateurs, jeunesse, leadership féminin, développement territorial, coopération internationale et gouvernance.",
    label: 'Notre feuille de route',
    h1: 'Les 8 piliers stratégiques',
    intro: "Le cadre qui guide chacune de nos actions, de la certification des professionnels jusqu'à la gouvernance de l'association elle-même.",
    ctaEyebrow: 'Envie de contribuer ?',
    ctaTitle: 'Rejoignez une organisation guidée par cette feuille de route',
    ctaText: 'Devenez membre certifié et participez à la structuration du secteur.',
  },
  en: {
    seoDescription: "Discover the 8 strategic pillars of AVD-Congo: professionalization, digital innovation, consumer protection, youth, women's leadership, territorial development, international cooperation and governance.",
    label: 'Our roadmap',
    h1: 'The 8 strategic pillars',
    intro: "The framework guiding every action we take, from professional certification to the association's own governance.",
    ctaEyebrow: 'Want to contribute?',
    ctaTitle: "Join an organization guided by this roadmap",
    ctaText: 'Become a certified member and take part in structuring the sector.',
  },
};

export default function Pillars() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const pillars = PILLARS[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.h1,
    itemListElement: pillars.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      description: p.items.join(', '),
    })),
  };

  return (
    <>
      <Seo title={c.h1} description={c.seoDescription} path="/piliers" locale={locale} jsonLd={jsonLd} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          {pillars.map((p, i) => (
            <PilierDetail key={p.title} index={i + 1} title={p.title} items={p.items} />
          ))}
        </div>
      </section>

      <MembershipCta eyebrow={c.ctaEyebrow} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
