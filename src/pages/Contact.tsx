import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

const CONTENT = {
  fr: {
    seoTitle: 'Contact',
    seoDescription: "Contactez l'Africaine de la Vente Directe – Congo par email, téléphone ou WhatsApp.",
    label: 'Nous écrire',
    h1: 'Contact',
    intro: 'Une question, un partenariat, un signalement ? Nous vous répondons rapidement.',
    coordinatesTitle: 'Coordonnées',
    address: 'Adresse', addressValue: '9ter, Rue Mabiala, Makélékélé, Brazzaville, République du Congo',
    email: 'Email', phone: 'Téléphone',
    whatsappText: 'Réponse rapide sur',
    messageTitle: 'Envoyer un message',
    fields: { name: 'Nom', email: 'Email', message: 'Message' },
    submit: 'Envoyer',
  },
  en: {
    seoTitle: 'Contact',
    seoDescription: 'Contact the African Direct Selling Association – Congo by email, phone or WhatsApp.',
    label: 'Get in touch',
    h1: 'Contact',
    intro: 'A question, a partnership, something to report? We reply quickly.',
    coordinatesTitle: 'Contact details',
    address: 'Address', addressValue: '9ter, Rue Mabiala, Makélékélé, Brazzaville, Republic of the Congo',
    email: 'Email', phone: 'Phone',
    whatsappText: 'Quick reply on',
    messageTitle: 'Send a message',
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    submit: 'Send',
  },
};

export default function Contact() {
  const locale = useLocale();
  const c = CONTENT[locale];

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/contact" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section style={{ background: 'var(--white)' }}>
        <div className="wrap join-layout">
          <div className="join-side">
            <h2>{c.coordinatesTitle}</h2>
            <ul className="condition-list">
              <li><div><b>{c.address}</b>{c.addressValue}</div></li>
              <li><div><b>{c.email}</b><a href="mailto:contact@avd-cg.org">contact@avd-cg.org</a></div></li>
              <li><div><b>{c.phone}</b>05 200 00 91</div></li>
            </ul>
            <div className="whatsapp-box">
              <div className="wa-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.35 1.28 4.81L2.05 22l5.42-1.42a9.87 9.87 0 004.57 1.16h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" /></svg>
              </div>
              <p>{c.whatsappText} <a href="https://wa.me/242052000091" target="_blank" rel="noopener">WhatsApp</a></p>
            </div>
          </div>

          <div className="form-card">
            <h2>{c.messageTitle}</h2>
            {/*
              TODO : pas d'endpoint /api/contact côté Laravel pour l'instant
              (hors scope du cadrage initial). À ajouter si besoin — même
              pattern que NewsletterController (validation + Mail::send).
              En attendant, ce formulaire ouvre le client mail par défaut.
            */}
            <form action="mailto:contact@avd-cg.org" method="post" encType="text/plain">
              <div className="form-row">
                <div className="field"><label>{c.fields.name}</label><input name="nom" required /></div>
                <div className="field"><label>{c.fields.email}</label><input type="email" name="email" required /></div>
              </div>
              <div className="form-row">
                <div className="field full"><label>{c.fields.message}</label><input name="message" required /></div>
              </div>
              <button type="submit" className="form-submit">{c.submit}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
