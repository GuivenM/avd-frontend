import Seo from '../../components/Seo';
import { useLocale } from '../../lib/locale';

const CONTENT = {
  fr: {
    title: "Conditions générales d'utilisation",
    seoDescription: 'Les CGU du site avd-cg.org.',
    label: "Conditions d'utilisation",
    objectTitle: 'Objet',
    objectText: 'Les présentes CGU régissent l\'utilisation du site avd-cg.org, édité par l\'Africaine de la Vente Directe – Congo (AVD-Congo).',
    membershipTitle: 'Adhésion',
    membershipText: 'Toute candidature soumise via le formulaire "Devenir membre" est examinée par les commissions techniques d\'AVD-Congo. La soumission d\'une candidature ne garantit pas la validation de l\'adhésion.',
    directoryTitle: 'Annuaire public',
    directoryText: "Un membre validé n'apparaît dans l'annuaire public que s'il en a explicitement donné l'autorisation lors de sa candidature.",
    ipTitle: 'Propriété intellectuelle',
    ipText: "Le logo, les contenus et documents publiés sur ce site sont la propriété d'AVD-Congo, sauf mention contraire.",
  },
  en: {
    title: 'Terms of use',
    seoDescription: 'The terms of use for the avd-cg.org website.',
    label: 'Terms of use',
    objectTitle: 'Purpose',
    objectText: 'These terms govern the use of the avd-cg.org website, published by the African Direct Selling Association – Congo (AVD-Congo).',
    membershipTitle: 'Membership',
    membershipText: 'Any application submitted through the "Become a member" form is reviewed by AVD-Congo\'s technical committees. Submitting an application does not guarantee approval.',
    directoryTitle: 'Public directory',
    directoryText: 'An approved member only appears in the public directory if they explicitly authorized it when applying.',
    ipTitle: 'Intellectual property',
    ipText: "The logo, content and documents published on this site are the property of AVD-Congo, unless otherwise stated.",
  },
};

export default function Cgu() {
  const locale = useLocale();
  const c = CONTENT[locale];

  return (
    <section className="page-header" style={{ paddingBottom: 60 }}>
      <Seo title={c.title} description={c.seoDescription} path="/legal/cgu" locale={locale} />
      <div className="wrap" style={{ maxWidth: 720 }}>
        <span className="label">{c.label}</span>
        <h1>{c.title}</h1>
        <div style={{ color: '#D7D8E4', marginTop: 24, lineHeight: 1.8 }}>
          <p><strong>{c.objectTitle}</strong><br />{c.objectText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.membershipTitle}</strong><br />{c.membershipText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.directoryTitle}</strong><br />{c.directoryText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.ipTitle}</strong><br />{c.ipText}</p>
        </div>
      </div>
    </section>
  );
}
