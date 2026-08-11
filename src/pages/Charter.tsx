import MembershipCta from '../components/MembershipCta';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

const CONTENT = {
  fr: {
    seoTitle: 'Charte nationale de la vente directe',
    seoDescription: 'Le cadre éthique co-construit avec les entreprises, vendeurs indépendants et institutions du secteur de la vente directe au Congo.',
    label: 'Charte nationale',
    h1: 'La charte nationale de la vente directe',
    intro: 'Un cadre éthique co-construit avec les entreprises, les vendeurs indépendants et les institutions du secteur.',
    statusLabel: "En cours d'élaboration",
    title2: 'Un texte de référence pour tout le secteur',
    p1: "La charte nationale de la vente directe fixe les principes et bonnes pratiques que s'engagent à respecter les membres d'AVD-Congo : transparence commerciale, protection des consommateurs, loyauté envers les distributeurs.",
    p2: 'Elle est actuellement en cours de finalisation avec l\'ensemble des parties prenantes du secteur. Le texte complet sera publié ici dès son adoption officielle.',
    ctaEyebrow: 'Contribuer à la charte',
    ctaTitle: 'Faites entendre la voix de votre entreprise',
    ctaText: "Les membres d'AVD-Congo participent directement à l'élaboration de la charte nationale.",
  },
  en: {
    seoTitle: 'National direct selling charter',
    seoDescription: 'The ethical framework co-built with companies, independent sellers and institutions of the direct selling sector in the Congo.',
    label: 'National charter',
    h1: 'The national direct selling charter',
    intro: 'An ethical framework co-built with companies, independent sellers and institutions of the sector.',
    statusLabel: 'Currently being drafted',
    title2: 'A reference text for the whole sector',
    p1: "The national direct selling charter sets out the principles and best practices AVD-Congo members commit to: commercial transparency, consumer protection, fair treatment of distributors.",
    p2: 'It is currently being finalized with all stakeholders in the sector. The full text will be published here once officially adopted.',
    ctaEyebrow: 'Contribute to the charter',
    ctaTitle: 'Make your company\'s voice heard',
    ctaText: 'AVD-Congo members take part directly in drafting the national charter.',
  },
};

export default function Charter() {
  const locale = useLocale();
  const c = CONTENT[locale];

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/charte-nationale" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section className="split">
        <div className="wrap split-grid">
          <div className="split-text">
            <span className="label">{c.statusLabel}</span>
            <h2>{c.title2}</h2>
            <p>{c.p1}</p>
            <p>{c.p2}</p>
          </div>
          <div className="split-photo" data-placeholder="Photo à intégrer — atelier de co-construction de la charte" />
        </div>
      </section>

      <MembershipCta eyebrow={c.ctaEyebrow} title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
