import Seo from '../../components/Seo';
import { useLocale } from '../../lib/locale';

const CONTENT = {
  fr: {
    title: 'Mentions légales',
    seoDescription: 'Informations légales du site avd-cg.org.',
    label: 'Informations légales',
    editorTitle: 'Éditeur du site',
    editorText: "Africaine de la Vente Directe – Congo (AVD-Congo), association reconnue, récépissé publié au Journal Officiel de la République du Congo (JO 2026-31).",
    address: 'Siège : 9ter, Rue Mabiala, Makélékélé, Brazzaville, République du Congo.',
    contact: 'Contact : contact@avd-cg.org',
    directorTitle: 'Directeur de publication',
    directorText: "Le Président fondateur d'AVD-Congo.",
    hostingTitle: 'Hébergement',
    hostingText: 'Site hébergé par Namecheap, Inc.',
  },
  en: {
    title: 'Legal notice',
    seoDescription: 'Legal information for the avd-cg.org website.',
    label: 'Legal information',
    editorTitle: 'Website publisher',
    editorText: 'African Direct Selling Association – Congo (AVD-Congo), a recognized association, receipt published in the Official Journal of the Republic of the Congo (JO 2026-31).',
    address: 'Registered office: 9ter, Rue Mabiala, Makélékélé, Brazzaville, Republic of the Congo.',
    contact: 'Contact: contact@avd-cg.org',
    directorTitle: 'Publication director',
    directorText: "AVD-Congo's Founding President.",
    hostingTitle: 'Hosting',
    hostingText: 'Site hosted by Namecheap, Inc.',
  },
};

export default function MentionsLegales() {
  const locale = useLocale();
  const c = CONTENT[locale];

  return (
    <section className="page-header" style={{ paddingBottom: 60 }}>
      <Seo title={c.title} description={c.seoDescription} path="/legal/mentions-legales" locale={locale} />
      <div className="wrap" style={{ maxWidth: 720 }}>
        <span className="label">{c.label}</span>
        <h1>{c.title}</h1>
        <div style={{ color: '#D7D8E4', marginTop: 24, lineHeight: 1.8 }}>
          <p><strong>{c.editorTitle}</strong><br />
          {c.editorText}<br />
          {c.address}<br />
          {c.contact}</p>

          <p style={{ marginTop: 20 }}><strong>{c.directorTitle}</strong><br />{c.directorText}</p>

          <p style={{ marginTop: 20 }}><strong>{c.hostingTitle}</strong><br />
          {/* TODO: confirmer le nom légal de l'hébergeur (Namecheap Inc.) et son adresse avant publication */}
          {c.hostingText}</p>
        </div>
      </div>
    </section>
  );
}
