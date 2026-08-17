import TeamCard from '../components/TeamCard';
import MembershipCta from '../components/MembershipCta';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

// Noms non traduits (ce sont des personnes) ; fonction + profession traduites.
const TEAM = {
  fr: [
    { fonction: 'Président fondateur', name: 'Hermann Rodrigues Bouitis', profession: 'Expert en marketing relationnel, coach certifié, entrepreneur digital et journaliste' },
    { fonction: 'Présidente adjointe', name: 'Rachel Flore Maloumby', profession: 'Fonctionnaire retraitée, gestionnaire de plusieurs projets' },
    { fonction: 'Secrétaire générale', name: 'Aimée Blaise Hebena', profession: "Enseignante et promotrice d'école privée" },
    { fonction: 'Secrétaire général adjoint', name: 'Didier Biyama Kimia', profession: 'Fonctionnaire à la retraite' },
    { fonction: 'Trésorière générale', name: 'Mélusine Goma Taty', profession: 'Comptable en fonction et entrepreneur' },
    { fonction: 'Trésorière générale adjointe', name: 'Laetitia Carine Zouzi Nkanza', profession: 'Gestionnaire de formation, entrepreneur' },
  ],
  en: [
    { fonction: 'Founding President', name: 'Hermann Rodrigues Bouitis', profession: 'Relationship marketing expert, certified personal development coach, digital entrepreneur and journalist' },
    { fonction: 'Deputy President', name: 'Rachel Flore Maloumby', profession: 'Retired civil servant, manager of several projects' },
    { fonction: 'Secretary General', name: 'Aimée Blaise Hebena', profession: 'Teacher and private school founder' },
    { fonction: 'Deputy Secretary General', name: 'Didier Biyama Kimia', profession: 'Retired civil servant' },
    { fonction: 'Treasurer General', name: 'Mélusine Goma Taty', profession: 'Practicing accountant and entrepreneur' },
    { fonction: 'Deputy Treasurer General', name: 'Laetitia Carine Zouzi Nkanza', profession: 'Training manager, entrepreneur' },
  ],
};

const CONTENT = {
  fr: {
    seoDescription: "Découvrez l'histoire de l'Africaine de la Vente Directe – Congo, sa mission, sa vision et les membres de son bureau exécutif.",
    label: 'Qui sommes-nous',
    h1: 'Structurer un secteur, porter une ambition continentale',
    intro: "De l'assemblée constitutive du 3 octobre 2025 à Brazzaville jusqu'à la reconnaissance officielle de l'État, retour sur la genèse d'AVD-Congo.",
    historyLabel: 'Notre histoire',
    historyTitle: "Née d'un constat, portée par une ambition",
    historyP1: "La République du Congo, malgré son important potentiel en ressources naturelles, demeure confrontée à un chômage élevé des jeunes et à une forte prédominance du secteur informel. Dans ce contexte, la vente directe représente une opportunité majeure de création d'emplois et d'entrepreneuriat, mais son développement reste limité par l'absence d'un cadre de structuration et de régulation.",
    historyP2: "S'inspirant des modèles internationaux, l'Africaine de la Vente Directe – Congo ambitionne de structurer, professionnaliser et promouvoir la vente directe afin d'en faire un levier de création d'emplois, d'inclusion économique et de contribution au développement national.",
    historyP3Prefix: "L'association a été constituée le ",
    historyP3Bold: '3 octobre 2025',
    historyP3Suffix: ', lors d\'une assemblée générale constitutive tenue à Brazzaville.',
    capLabel: 'Notre cap',
    capTitle: 'Mission et vision',
    missionTitle: 'Notre mission',
    missionText: "Structurer, promouvoir et professionnaliser le secteur de la vente directe au Congo afin de favoriser l'entrepreneuriat, l'autonomisation économique des jeunes et le développement durable.",
    visionTitle: 'Notre vision',
    visionText: 'Faire de l\'Afrique une référence en matière de vente directe éthique, professionnelle et créatrice de richesses.',
    govLabel: 'Gouvernance',
    govTitle: 'Le bureau exécutif',
    ctaTitle: "Devenez membre d'AVD-Congo",
    ctaText: "Structurez votre activité au sein d'un réseau reconnu par l'État.",
  },
  en: {
    seoDescription: "Discover the story of the African Direct Selling Association – Congo, its mission, vision and executive board members.",
    label: 'About us',
    h1: 'Structuring a sector, carrying a continental ambition',
    intro: "From the founding assembly of October 3, 2025 in Brazzaville to official State recognition — the story behind AVD-Congo.",
    historyLabel: 'Our story',
    historyTitle: 'Born from a need, driven by an ambition',
    historyP1: "Despite its significant natural resource potential, the Republic of the Congo still faces high youth unemployment and a predominantly informal economy. In this context, direct selling represents a major opportunity for job creation and entrepreneurship, but its growth remains limited by the absence of a structuring and regulatory framework.",
    historyP2: "Drawing on international models, the African Direct Selling Association – Congo aims to structure, professionalize and promote direct selling, turning it into a driver of job creation, economic inclusion and national development.",
    historyP3Prefix: 'The association was founded on ',
    historyP3Bold: 'October 3, 2025',
    historyP3Suffix: ', at a founding general assembly held in Brazzaville.',
    capLabel: 'Our direction',
    capTitle: 'Mission and vision',
    missionTitle: 'Our mission',
    missionText: "Structure, promote and professionalize the direct selling sector in the Congo to foster entrepreneurship, youth economic empowerment and sustainable development.",
    visionTitle: 'Our vision',
    visionText: 'Make Africa a benchmark for ethical, professional and wealth-creating direct selling.',
    govLabel: 'Governance',
    govTitle: 'Executive board',
    ctaTitle: 'Become a member of AVD-Congo',
    ctaText: 'Structure your activity within a network recognized by the State.',
  },
};

export default function About() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const team = TEAM[locale];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: 'https://www.avd-cg.org/qui-sommes-nous',
    mainEntity: {
      '@type': 'NGO',
      name: 'Africaine de la Vente Directe - Congo',
      foundingDate: '2025-10-03',
      foundingLocation: { '@type': 'Place', name: 'Brazzaville, République du Congo' },
      member: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.fonction })),
    },
  };

  return (
    <>
      <Seo title={c.label} description={c.seoDescription} path="/qui-sommes-nous" locale={locale} jsonLd={jsonLd} />

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
            <span className="label">{c.historyLabel}</span>
            <h2>{c.historyTitle}</h2>
            <p>{c.historyP1}</p>
            <p>{c.historyP2}</p>
            <p>{c.historyP3Prefix}<strong>{c.historyP3Bold}</strong>{c.historyP3Suffix}</p>
          </div>
          <div className="split-photo" data-placeholder="Photo à intégrer — assemblée constitutive" />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head"><div><span className="label">{c.capLabel}</span><h2>{c.capTitle}</h2></div></div>
          <div className="mv-grid">
            <div className="mv-card">
              <h3>{c.missionTitle}</h3>
              <p>{c.missionText}</p>
            </div>
            <div className="mv-card">
              <h3>{c.visionTitle}</h3>
              <p>{c.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="section-head">
            <div><span className="label">{c.govLabel}</span><h2>{c.govTitle}</h2></div>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      <MembershipCta title={c.ctaTitle} text={c.ctaText} />
    </>
  );
}
