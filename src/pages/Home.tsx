import { useState, useRef, useEffect, FormEvent, ReactNode, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import Seo from '../components/Seo';
import { useLocale, useLocalizedPath } from '../lib/locale';
import { common } from '../i18n/common';

const CONTENT = {
  fr: {
    seoTitle: 'AVD-Congo — Africaine de la Vente Directe',
    seoDescription: "L'Africaine de la Vente Directe – Congo (AVD-CG) structure, professionnalise et protège le secteur de la vente directe en République du Congo.",
    hero: {
      eyebrow: 'Éthique – Professionnalisme – Croissance',
      titleLine1: "Devenez membre certifié",
      titleLine2: "de l'AVD-Congo.",
      text: "Structurez votre activité de vente directe au sein d'un réseau professionnel reconnu par l'État congolais.",
      cta: 'Devenir membre',
      to: '/devenir-membre',
      ctaSecondary: 'Découvrir notre mission',
    },
    stats: [
      { num: '8', lbl: 'Piliers stratégiques' },
      { num: '12', lbl: 'Départements ciblés' },
      { num: '2025', lbl: 'Assemblée constitutive' },
      { num: '6', lbl: 'Commissions techniques' },
    ],
    reasons: {
      label: 'Pourquoi nous rejoindre',
      title: 'Pourquoi rejoindre l\'AVD-Congo ?',
      intro: "Des avantages concrets pour les vendeurs indépendants, les distributeurs et les entreprises de vente directe.",
      items: [
        { icon: 'seal', title: 'Reconnaissance professionnelle', text: "Un statut reconnu par l'État congolais et affiché dans l'annuaire public des membres certifiés." },
        { icon: 'network', title: 'Accès à un réseau dynamique', text: 'Échangez avec des vendeurs, distributeurs et entreprises engagés dans une vente directe éthique.' },
        { icon: 'book', title: 'Formations et renforcement', text: 'Bénéficiez de sessions de formation et de renforcement des compétences organisées par l\'association.' },
        { icon: 'trust', title: 'Crédibilité accrue auprès des clients', text: "Le statut de membre AVD-Congo rassure vos clients sur le sérieux et la transparence de votre activité." },
        { icon: 'compass', title: 'Accompagnement personnalisé', text: 'Nos commissions techniques vous accompagnent dans la structuration de votre activité.' },
        { icon: 'handshake', title: 'Opportunités de partenariats', text: "Accédez aux partenariats noués par l'association avec des entreprises et institutions." },
      ],
    },
    aboutLabel: 'Qui sommes-nous ?',
    aboutTitle: 'Une organisation née de la volonté de structurer un secteur en plein essor',
    aboutText: "L'Africaine de la Vente Directe – Congo structure, professionnalise et promeut le secteur de la vente directe au service de ses membres, vendeurs, distributeurs et entreprises.",
    aboutLink: 'Découvrir notre histoire et notre bureau exécutif →',
    aboutCta: 'Découvrir',
    mission: {
      label: 'Notre mission',
      text: "Faire de la vente directe un levier d'emploi, d'inclusion économique et de professionnalisation, au bénéfice de chaque vendeur, distributeur et entreprise membre au Congo.",
    },
    pillarsLabel: 'Notre feuille de route',
    pillarsTitle: 'Les 8 piliers stratégiques',
    pillarsText: "Le cadre qui guide chacune de nos actions, de la certification des professionnels à la gouvernance de l'association.",
    pillarsSeeAll: 'Voir le détail des 8 piliers',
    pillarsPreview: ['Professionnalisation', 'Innovation numérique', 'Protection des consommateurs', 'Jeunesse'],
    steps: {
      label: 'Parcours d\'adhésion',
      title: 'Comment devenir membre ?',
      intro: 'Un processus simple et encadré, de la candidature en ligne jusqu\'à la certification.',
      items: [
        { icon: 'form', title: 'Candidature', text: 'Remplissez le formulaire de candidature en ligne.' },
        { icon: 'search', title: 'Vérification', text: 'Notre équipe examine vos informations et documents.' },
        { icon: 'check', title: 'Validation', text: 'Votre candidature est validée selon nos critères d\'adhésion.' },
        { icon: 'seal', title: 'Certification', text: 'Vous recevez votre statut de membre et vos avantages.' },
      ],
    },
    conditions: {
      label: 'Avant de candidater',
      title: "Conditions d'adhésion",
      intro: "L'adhésion est ouverte à toute personne physique ou entreprise exerçant une activité de vente directe au Congo, sous réserve de validation par nos commissions techniques.",
      items: [
        { label: 'Qui peut adhérer', text: 'Vendeurs indépendants, distributeurs et entreprises de vente directe en activité au Congo.' },
        { label: 'Documents requis', text: "Pièce d'identité, justificatif d'activité ou d'entreprise, coordonnées complètes." },
        { label: 'Délai de traitement', text: 'Une enquête de vérification est menée par nos commissions avant validation définitive.' },
        { label: 'Engagement', text: 'Adhésion au respect de la charte nationale de la vente directe et du règlement intérieur.' },
      ],
    },
    testimonials: {
      label: 'Ils nous font confiance',
      title: 'Ce que nos membres en disent',
      items: [
        { quote: "Grâce à l'AVD-Congo, j'ai pu structurer mon activité et gagner en crédibilité auprès de mes partenaires et clients.", name: 'Marc D.', role: 'Distributeur — Pointe-Noire' },
        { quote: "L'accompagnement et les formations m'ont permis de développer mon réseau et d'augmenter mes revenus.", name: 'Sarah K.', role: 'Entrepreneure — Brazzaville' },
        { quote: "La certification AVD-Congo est un vrai plus pour mon entreprise. Nous sommes plus visibles et plus crédibles.", name: 'Jean P.', role: 'Chef d\'entreprise — Dolisie' },
      ],
    },
    faq: {
      label: 'Questions fréquentes',
      title: 'Vous avez des questions ?',
      intro: 'Réponses rapides sur l\'adhésion, les délais et le fonctionnement d\'AVD-Congo.',
      contactEyebrow: 'Une autre question ?',
      contactText: 'Notre équipe vous répond directement sur WhatsApp.',
      contactCta: 'Nous écrire',
      items: [
        { q: 'Qui peut devenir membre de l\'AVD-Congo ?', a: 'Tout vendeur indépendant, distributeur ou entreprise de vente directe en activité au Congo peut candidater.' },
        { q: 'Quels documents dois-je fournir ?', a: "Une pièce d'identité, un justificatif d'activité ou d'entreprise, et vos coordonnées complètes." },
        { q: 'Combien de temps prend la validation ?', a: 'Une enquête de vérification est menée par nos commissions techniques avant validation définitive de la candidature.' },
        { q: 'Quels engagements dois-je respecter ?', a: 'Le respect de la charte nationale de la vente directe et du règlement intérieur de l\'association.' },
        { q: 'Comment se déroule la certification ?', a: "Après validation de votre dossier, vous recevez votre statut de membre et intégrez l'annuaire public des membres certifiés." },
        { q: 'Comment vous contacter en cas de question ?', a: 'Par email, téléphone ou WhatsApp — toutes nos coordonnées figurent sur la page Contact.' },
      ],
    },
    ctaBand: {
      eyebrow: 'Prêt à rejoindre l\'AVD-Congo ?',
      title: 'Rejoignez un réseau reconnu, structuré et engagé',
      text: 'Devenez membre certifié et structurez votre activité de vente directe au Congo.',
      primary: 'Devenir membre maintenant',
      secondary: 'Nous contacter sur WhatsApp',
    },
    newsLabel: 'À la une',
    newsTitle: 'Actualités & alertes anti-arnaque',
    newsPreview: [
      { tag: 'Communiqué', title: 'Lancement de la charte nationale de la vente directe', text: "Retour sur les travaux d'élaboration menés avec l'ensemble des acteurs du secteur.", date: 'À venir' },
      { tag: 'Prévention', title: 'Reconnaître un système pyramidal', text: 'Les signaux à surveiller pour distinguer vente directe légitime et arnaque financière.', date: 'À venir' },
      { tag: 'Formation', title: 'Premier cycle de certification AVD', text: "Calendrier et modalités d'inscription au programme de professionnalisation.", date: 'À venir' },
    ],
    partnersLabel: 'Entreprises & institutions partenaires',
  },
  en: {
    seoTitle: 'AVD-Congo — African Direct Selling Association',
    seoDescription: 'The African Direct Selling Association – Congo (AVD-CG) structures, professionalizes and protects the direct selling sector in the Republic of the Congo.',
    hero: {
      eyebrow: 'Ethics – Professionalism – Growth',
      titleLine1: 'Become a certified member',
      titleLine2: 'of AVD-Congo.',
      text: 'Structure your direct selling activity within a professional network recognized by the Congolese State.',
      cta: 'Become a member',
      to: '/devenir-membre',
      ctaSecondary: 'Discover our mission',
    },
    stats: [
      { num: '8', lbl: 'Strategic pillars' },
      { num: '12', lbl: 'Target departments' },
      { num: '2025', lbl: 'Founding assembly' },
      { num: '6', lbl: 'Technical committees' },
    ],
    reasons: {
      label: 'Why join us',
      title: 'Why join AVD-Congo?',
      intro: 'Concrete benefits for independent sellers, distributors and direct selling companies.',
      items: [
        { icon: 'seal', title: 'Professional recognition', text: 'A status recognized by the Congolese State and listed in the public directory of certified members.' },
        { icon: 'network', title: 'Access to a dynamic network', text: 'Connect with sellers, distributors and companies committed to ethical direct selling.' },
        { icon: 'book', title: 'Training and skills development', text: 'Benefit from training sessions and skills development organized by the association.' },
        { icon: 'trust', title: 'Greater credibility with clients', text: 'AVD-Congo membership reassures your clients about the seriousness and transparency of your activity.' },
        { icon: 'compass', title: 'Personalized support', text: 'Our technical committees support you in structuring your activity.' },
        { icon: 'handshake', title: 'Partnership opportunities', text: "Access the partnerships the association has built with companies and institutions." },
      ],
    },
    aboutLabel: 'About us',
    aboutTitle: 'An organization born from the will to structure a fast-growing sector',
    aboutText: 'The African Direct Selling Association – Congo structures, professionalizes and promotes the direct selling sector for the benefit of its members, sellers, distributors and companies.',
    aboutLink: 'Discover our story and our executive board →',
    aboutCta: 'Discover',
    mission: {
      label: 'Our mission',
      text: 'Turn direct selling into a driver of employment, economic inclusion and professionalization, for the benefit of every member seller, distributor and company in the Congo.',
    },
    pillarsLabel: 'Our roadmap',
    pillarsTitle: 'The 8 strategic pillars',
    pillarsText: "The framework guiding every action we take, from professional certification to the association's own governance.",
    pillarsSeeAll: 'See all 8 pillars in detail',
    pillarsPreview: ['Professionalization', 'Digital innovation', 'Consumer protection', 'Youth'],
    steps: {
      label: 'Membership path',
      title: 'How to become a member?',
      intro: 'A simple, supervised process, from the online application to certification.',
      items: [
        { icon: 'form', title: 'Application', text: 'Fill in the online application form.' },
        { icon: 'search', title: 'Verification', text: 'Our team reviews your information and documents.' },
        { icon: 'check', title: 'Approval', text: 'Your application is approved according to our membership criteria.' },
        { icon: 'seal', title: 'Certification', text: 'You receive your member status and your benefits.' },
      ],
    },
    conditions: {
      label: 'Before you apply',
      title: 'Membership requirements',
      intro: 'Membership is open to any individual or company carrying out a direct selling activity in the Congo, subject to approval by our technical committees.',
      items: [
        { label: 'Who can join', text: 'Independent sellers, distributors and direct selling companies active in the Congo.' },
        { label: 'Required documents', text: 'Proof of identity, proof of business activity, complete contact details.' },
        { label: 'Processing time', text: 'A verification review is conducted by our committees before final approval.' },
        { label: 'Commitment', text: 'Compliance with the national direct selling charter and internal rules.' },
      ],
    },
    testimonials: {
      label: 'They trust us',
      title: 'What our members say',
      items: [
        { quote: 'Thanks to AVD-Congo, I was able to structure my activity and gain credibility with my partners and clients.', name: 'Marc D.', role: 'Distributor — Pointe-Noire' },
        { quote: 'The support and training helped me grow my network and increase my income.', name: 'Sarah K.', role: 'Entrepreneur — Brazzaville' },
        { quote: 'AVD-Congo certification is a real asset for my company. We are more visible and more credible.', name: 'Jean P.', role: 'Business owner — Dolisie' },
      ],
    },
    faq: {
      label: 'Frequently asked questions',
      title: 'Have questions?',
      intro: 'Quick answers about membership, timelines and how AVD-Congo works.',
      contactEyebrow: 'Another question?',
      contactText: 'Our team replies directly on WhatsApp.',
      contactCta: 'Message us',
      items: [
        { q: 'Who can become an AVD-Congo member?', a: 'Any independent seller, distributor or direct selling company active in the Congo can apply.' },
        { q: 'What documents do I need to provide?', a: 'Proof of identity, proof of business activity, and your complete contact details.' },
        { q: 'How long does approval take?', a: 'A verification review is conducted by our technical committees before final approval of the application.' },
        { q: 'What commitments must I respect?', a: 'Compliance with the national direct selling charter and the association\'s internal rules.' },
        { q: 'How does certification work?', a: 'Once your application is approved, you receive your member status and join the public directory of certified members.' },
        { q: 'How can I reach you with a question?', a: 'By email, phone or WhatsApp — all our contact details are on the Contact page.' },
      ],
    },
    ctaBand: {
      eyebrow: 'Ready to join AVD-Congo?',
      title: 'Join a recognized, structured and committed network',
      text: 'Become a certified member and structure your direct selling activity in the Congo.',
      primary: 'Become a member now',
      secondary: 'Contact us on WhatsApp',
    },
    newsLabel: 'Latest',
    newsTitle: 'News & scam-prevention alerts',
    newsPreview: [
      { tag: 'Announcement', title: 'Launch of the national direct selling charter', text: 'A look back at the drafting work carried out with all stakeholders in the sector.', date: 'Coming soon' },
      { tag: 'Prevention', title: 'How to recognize a pyramid scheme', text: 'Warning signs that distinguish legitimate direct selling from financial scams.', date: 'Coming soon' },
      { tag: 'Training', title: 'First AVD certification cycle', text: 'Schedule and registration details for the professionalization program.', date: 'Coming soon' },
    ],
    partnersLabel: 'Corporate & institutional partners',
  },
};

// Palette utilisée pour les petites barres de couleur sous chaque chiffre
// (même esprit que les indicateurs multicolores de francophonie.org).
const STAT_COLORS = ['var(--orange)', 'var(--gold)', 'var(--blue)', 'var(--navy)'];

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Africaine de la Vente Directe - Congo',
  alternateName: 'AVD-Congo',
  url: 'https://www.avd-cg.org/',
  logo: 'https://www.avd-cg.org/assets/img/logo-avd-congo.png',
  slogan: 'Engagée pour une vente directe éthique, professionnelle et prospère.',
  description: "AVD-Congo structure, professionnalise et promeut le secteur de la vente directe en République du Congo afin de favoriser l'entrepreneuriat, l'autonomisation économique des jeunes et le développement durable.",
  foundingDate: '2025-10-03',
  foundingLocation: { '@type': 'Place', name: 'Brazzaville, République du Congo' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '9ter, Rue Mabiala, Makélékélé',
    addressLocality: 'Brazzaville',
    addressCountry: 'CG',
  },
  email: 'contact@avd-cg.org',
  telephone: '+242052000091',
};

export default function Home() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const lp = useLocalizedPath();

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/" locale={locale} jsonLd={ORGANIZATION_JSON_LD} />

      {/* ---------- HERO ---------- */}
      <section className="hero" aria-label="Mise en avant">
        <div className="photo" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dash" aria-hidden="true" />
            <span>{c.hero.eyebrow}</span>
          </div>
          <h1>
            <span className="line">{c.hero.titleLine1}</span>
            <span className="line accent">{c.hero.titleLine2}</span>
          </h1>
          <p>{c.hero.text}</p>
          <div className="hero-cta-row">
            <Link to={lp(c.hero.to)} className="btn-hero-primary">
              {c.hero.cta}
              <ChevronIcon dir="right" />
            </Link>
            <a href="#pourquoi" className="hero-play">
              <span className="circle" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l11 6-11 6V4z" /></svg>
              </span>
              {c.hero.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="hero-badge">
          {c.stats.map((s) => (
            <div key={s.lbl}>
              <div className="n">{s.num}</div>
              <div className="l">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CHIFFRES (bandeau blanc, barre de couleur sous chaque chiffre) ---------- */}
      <section className="chiffres">
        <div className="wrap chiffres-grid">
          {c.stats.map((s, i) => (
            <div key={s.lbl}>
              <Stat value={s.num} />
              <div className="bar" style={{ background: STAT_COLORS[i % STAT_COLORS.length] }} />
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- QUI SOMMES-NOUS (bandeau bleu) ---------- */}
      <section className="about-band">
        <div className="wrap split-grid">
          <Reveal className="split-photo has-image reveal-photo">
            <div
              style={{ width: '100%', height: '100%', backgroundImage: "url('/assets/img/about-team.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          </Reveal>
          <Reveal className="split-text">
            <h2>{c.aboutLabel}</h2>
            <p>{c.aboutText}</p>
            <Link to={lp('/qui-sommes-nous')} className="btn-pill">{c.aboutCta}</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- MISSION (section blanche de transition, avant le bandeau orange) ---------- */}
      <section className="mission-band">
        <Reveal className="wrap">
          <span className="label">{c.mission.label}</span>
          <p>{c.mission.text}</p>
        </Reveal>
      </section>

      {/* ---------- POURQUOI REJOINDRE (bandeau plein écran + carrousel) ---------- */}
      <section id="pourquoi" className="reasons-band">
        <Reveal className="wrap reasons-head">
          <span className="label on-dark">{c.reasons.label}</span>
          <h2>{c.reasons.title}</h2>
          <p>{c.reasons.intro}</p>
        </Reveal>
        <ReasonsCarousel items={c.reasons.items} />
      </section>

      {/* ---------- COMMENT DEVENIR MEMBRE (cartes flottantes, icône qui déborde du rond) ---------- */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">{c.steps.label}</span>
              <h2>{c.steps.title}</h2>
              <p style={{ color: 'var(--gray)', marginTop: 10, maxWidth: 560 }}>{c.steps.intro}</p>
            </div>
          </div>
          <Reveal className="steps-grid" stagger>
            {c.steps.items.map((step) => (
              <div className="step-card" key={step.title}>
                <div className="step-icon">
                  <span className="step-icon-circle" />
                  <StepIcon name={step.icon} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- TEMOIGNAGES (bandeau bleu, sans cartes) ---------- */}
      <section className="quote-band">
        <div className="wrap">
          <div className="section-head">
            <div><span className="label on-dark">{c.testimonials.label}</span><h2>{c.testimonials.title}</h2></div>
          </div>
          <Reveal className="quote-row" stagger>
            {c.testimonials.items.map((t) => (
              <div className="quote-item" key={t.name}>
                <blockquote>{t.quote}</blockquote>
                <cite><strong>{t.name}</strong><span>{t.role}</span></cite>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ (colonne latérale + accordéon numéroté) ---------- */}
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap faq-layout">
          <Reveal className="faq-side">
            <span className="label">{c.faq.label}</span>
            <h2>{c.faq.title}</h2>
            <p>{c.faq.intro}</p>
            <div className="faq-contact-card">
              <span className="faq-contact-eyebrow">{c.faq.contactEyebrow}</span>
              <p>{c.faq.contactText}</p>
              <a href="https://wa.me/242052000091" target="_blank" rel="noopener" className="btn-pill faq-contact-btn">
                {c.faq.contactCta}
                <ChevronIcon dir="right" />
              </a>
            </div>
          </Reveal>

          <Reveal className="faq-list" stagger>
            {c.faq.items.map((item, i) => (
              <details className="faq-item" key={item.q} open={i === 0}>
                <summary>
                  <span><span className="faq-num">{i + 1}.</span> {item.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="membership">
        <Reveal className="wrap" style={{ textAlign: 'center' }}>
          <span className="label" style={{ color: '#FFE4D6' }}>{c.ctaBand.eyebrow}</span>
          <h2 style={{ maxWidth: 620, margin: '0 auto 16px' }}>{c.ctaBand.title}</h2>
          <p style={{ margin: '0 auto 26px', maxWidth: 480 }}>{c.ctaBand.text}</p>
          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <Link to={lp('/devenir-membre')} className="btn btn-white">{c.ctaBand.primary}</Link>
            <a href="https://wa.me/242052000091" className="btn btn-outline">{c.ctaBand.secondary}</a>
          </div>
        </Reveal>
      </section>

      {/* ---------- ACTUALITES ---------- */}
      <section id="actualites">
        <div className="wrap">
          <div className="section-head">
            <div><span className="label">{c.newsLabel}</span><h2>{c.newsTitle}</h2></div>
            <Link to={lp('/actualites')} className="see-all">{common[locale].seeAll}</Link>
          </div>
          <Reveal className="actus-grid" stagger>
            {c.newsPreview.map((n) => (
              <article className="actu-card" key={n.title}>
                <div className="thumb" />
                <span className="label">{n.tag}</span>
                <h3>{n.title}</h3>
                <p>{n.text}</p>
                <div className="date">{n.date}</div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- PARTENAIRES ---------- */}
      <section className="partners">
        <div className="wrap">
          <span className="plabel">{c.partnersLabel}</span>
          <div className="plogos"><div>Partenaire 1</div><div>Partenaire 2</div><div>Partenaire 3</div><div>Partenaire 4</div></div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}

/* Carrousel horizontal (cartes glissantes + flèches), même principe que
   le bandeau "Nos projets phares" de francophonie.org, dans les couleurs
   du site. */
function ReasonsCarousel({ items }: { items: { icon: string; title: string; text: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.reason-card') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 300;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  return (
    <div className="reason-carousel">
      <button type="button" className="carousel-btn prev" onClick={() => scroll(-1)} aria-label="Précédent">
        <ChevronIcon dir="left" />
      </button>
      <div className="reason-track" ref={trackRef}>
        {items.map((r) => (
          <div className="reason-card" key={r.title}>
            <div className="reason-icon"><ReasonIcon name={r.icon} /></div>
            <h3>{r.title}</h3>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <button type="button" className="carousel-btn next" onClick={() => scroll(1)} aria-label="Suivant">
        <ChevronIcon dir="right" />
      </button>
    </div>
  );
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  );
}

/* Icônes dessinées sur mesure pour la section "Pourquoi rejoindre" —
   trait unique, coins arrondis, cohérentes avec l'identité du site
   (pas un set d'icônes générique). */
/* Icônes pour les cartes "Comment devenir membre" — trait fin, dans
   l'esprit demandé (icône qui déborde légèrement du rond de couleur). */
function StepIcon({ name }: { name: string }) {
  const p = { width: 30, height: 30, viewBox: '0 0 32 32', fill: 'none', stroke: '#22222E', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'form': // candidature — formulaire
      return (
        <svg {...p}>
          <rect x="7" y="4" width="18" height="24" rx="2" />
          <path d="M12 11h8M12 16h8M12 21h5" />
        </svg>
      );
    case 'search': // vérification — loupe
      return (
        <svg {...p}>
          <circle cx="14" cy="14" r="8" />
          <path d="M20 20l6 6" />
          <path d="M10.5 14l2.5 2.5 5-5.5" />
        </svg>
      );
    case 'check': // validation — badge coché
      return (
        <svg {...p}>
          <path d="M16 4l3.5 2.2 4.1-.4 1.2 4 3.2 2.7-1.9 3.6 1 4-3.9 1.3-2.2 3.4-4-.9-4 .9-2.2-3.4-3.9-1.3 1-4-1.9-3.6 3.2-2.7 1.2-4 4.1.4z" />
          <path d="M12 16l3 3 5-6" />
        </svg>
      );
    case 'seal': // certification — sceau
      return (
        <svg {...p}>
          <circle cx="16" cy="13" r="7" />
          <path d="M16 9.5l1.1 2.3 2.5.35-1.8 1.75.45 2.5-2.25-1.2-2.25 1.2.45-2.5-1.8-1.75 2.5-.35L16 9.5z" />
          <path d="M12 19l-1.5 6 4-2 1.5 3 1.5-3 4 2-1.5-6" />
        </svg>
      );
    default:
      return null;
  }
}

function ReasonIcon({ name }: { name: string }) {
  const p = { width: 34, height: 34, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'seal': // reconnaissance — sceau / médaille
      return (
        <svg {...p}>
          <circle cx="16" cy="13" r="7" />
          <path d="M16 9.5l1.1 2.3 2.5.35-1.8 1.75.45 2.5-2.25-1.2-2.25 1.2.45-2.5-1.8-1.75 2.5-.35L16 9.5z" />
          <path d="M12 19l-1.5 6 4-2 1.5 3 1.5-3 4 2-1.5-6" />
        </svg>
      );
    case 'network': // réseau — nœuds reliés
      return (
        <svg {...p}>
          <circle cx="9" cy="10" r="2.2" />
          <circle cx="23" cy="9" r="2.2" />
          <circle cx="16" cy="22" r="2.2" />
          <path d="M10.8 11.8L14.5 20M21.3 10.6L17.6 20M11 10h10" />
        </svg>
      );
    case 'book': // formation — livre ouvert
      return (
        <svg {...p}>
          <path d="M16 11c-2-1.6-5-2.3-8-2v14c3-.3 6 .4 8 2 2-1.6 5-2.3 8-2V9c-3-.3-6 .4-8 2z" />
          <path d="M16 11v14" />
        </svg>
      );
    case 'trust': // crédibilité — loupe + validation
      return (
        <svg {...p}>
          <circle cx="14" cy="14" r="7.5" />
          <path d="M20.5 20.5L26 26" />
          <path d="M10.8 14l2.3 2.3 4.3-4.6" />
        </svg>
      );
    case 'compass': // accompagnement — boussole
      return (
        <svg {...p}>
          <circle cx="16" cy="16" r="9.5" />
          <path d="M20 12l-2.5 6.5L11 21l2.5-6.5z" />
        </svg>
      );
    case 'handshake': // partenariats — poignée de main
      return (
        <svg {...p}>
          <path d="M5 15l4.5-4 4 2.5L18 9l5 3v5l-3.5 3.5-2.5-2-3 3-4-3.5-1.5 1.5-3.5-3z" />
          <path d="M9.5 11.5L14 17" />
        </svg>
      );
    default:
      return null;
  }
}

/* Petite apparition en fondu au défilement — observe une seule fois puis se
   détache (pas de re-déclenchement en remontant/redescendant). Respecte
   prefers-reduced-motion via le CSS (voir global.css). */
function Reveal({ children, className = '', stagger = false, style }: { children: ReactNode; className?: string; stagger?: boolean; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={style} className={`${stagger ? 'reveal-stagger' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* Chiffre qui s'incrémente jusqu'à sa valeur quand il entre dans l'écran.
   Les valeurs non numériques (ex. "4e") restent affichées telles quelles. */
function Stat({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value.match(/^\d+$/) ? '0' : value);

  useEffect(() => {
    const target = parseInt(value, 10);
    if (Number.isNaN(target) || String(target) !== value) return; // garde les valeurs type "4e" telles quelles
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 900;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(eased * target)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <div className="num" ref={ref}>{display}</div>;
}

function NewsletterForm() {
  const locale = useLocale();
  const t = common[locale].newsletter;
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot anti-spam, doit rester vide
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.subscribeNewsletter(email, locale, website);
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="newsletter">
      <div className="wrap">
        <div><h3>{t.title}</h3><p>{t.text}</p></div>
        {status === 'sent' ? (
          <p>{t.sent}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="nl-website">Laissez ce champ vide</label>
              <input type="text" id="nl-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <input type="email" placeholder={t.placeholder} required value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.submit}</button>
          </form>
        )}
      </div>
    </section>
  );
}
