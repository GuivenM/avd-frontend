import Seo from '../../components/Seo';
import { useLocale } from '../../lib/locale';

const CONTENT = {
  fr: {
    title: 'Politique de confidentialité',
    seoDescription: 'Comment AVD-Congo collecte et utilise vos données personnelles.',
    label: 'Vos données',
    dataTitle: 'Données collectées',
    dataText: "Dans le cadre du formulaire d'adhésion : nom, prénom, email, téléphone, ville, nom de l'entreprise et grade. Dans le cadre de l'inscription à la newsletter : adresse email.",
    purposeTitle: 'Finalité',
    purposeText: "Ces données sont utilisées exclusivement pour instruire les candidatures d'adhésion (vérification par nos commissions techniques) et pour l'envoi de nos communiqués si vous y avez consenti.",
    retentionTitle: 'Conservation',
    retentionText: 'Les données des candidatures rejetées sont conservées 12 mois puis supprimées. Les données des membres validés sont conservées pour la durée de l\'adhésion.',
    rightsTitle: 'Vos droits',
    rightsText: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données à tout moment en écrivant à contact@avd-cg.org. Un lien de désinscription est présent dans chaque email de newsletter.",
  },
  en: {
    title: 'Privacy policy',
    seoDescription: 'How AVD-Congo collects and uses your personal data.',
    label: 'Your data',
    dataTitle: 'Data collected',
    dataText: 'Through the membership application form: first name, last name, email, phone, city, company name and grade. Through the newsletter signup: email address.',
    purposeTitle: 'Purpose',
    purposeText: 'This data is used exclusively to process membership applications (review by our technical committees) and to send our announcements if you have consented to it.',
    retentionTitle: 'Retention',
    retentionText: 'Data from rejected applications is kept for 12 months and then deleted. Data from approved members is kept for the duration of their membership.',
    rightsTitle: 'Your rights',
    rightsText: 'You may request access to, correction of, or deletion of your data at any time by writing to contact@avd-cg.org. An unsubscribe link is included in every newsletter email.',
  },
};

export default function Confidentialite() {
  const locale = useLocale();
  const c = CONTENT[locale];

  return (
    <section className="page-header" style={{ paddingBottom: 60 }}>
      <Seo title={c.title} description={c.seoDescription} path="/legal/confidentialite" locale={locale} />
      <div className="wrap" style={{ maxWidth: 720 }}>
        <span className="label">{c.label}</span>
        <h1>{c.title}</h1>
        <div style={{ color: '#D7D8E4', marginTop: 24, lineHeight: 1.8 }}>
          <p><strong>{c.dataTitle}</strong><br />{c.dataText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.purposeTitle}</strong><br />{c.purposeText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.retentionTitle}</strong><br />{c.retentionText}</p>
          <p style={{ marginTop: 20 }}><strong>{c.rightsTitle}</strong><br />{c.rightsText}</p>
        </div>
      </div>
    </section>
  );
}
