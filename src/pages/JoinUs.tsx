import { useState, FormEvent } from 'react';
import { api, MembershipApplication } from '../lib/api';
import Seo from '../components/Seo';
import { useLocale } from '../lib/locale';

const initialState: MembershipApplication = {
  first_name: '', last_name: '', email: '', phone: '', city: '',
  company_name: '', grade: 'vendeur_independant', website: '',
};

const CONTENT = {
  fr: {
    seoTitle: 'Devenir membre',
    seoDescription: "Rejoignez l'Africaine de la Vente Directe – Congo : conditions d'adhésion, formulaire de candidature en ligne et processus de validation pour vendeurs et entreprises.",
    label: 'Rejoindre AVD-Congo',
    h1: 'Devenez membre certifié',
    intro: "Vendeurs indépendants et entreprises de vente directe : structurez votre activité au sein d'un réseau reconnu par l'État congolais.",
    conditionsTitle: "Conditions d'adhésion",
    conditionsIntro: "L'adhésion est ouverte à toute personne physique ou entreprise exerçant une activité de vente directe au Congo, sous réserve de validation par nos commissions techniques.",
    conditions: [
      { label: 'Qui peut adhérer', text: 'Vendeurs indépendants, distributeurs et entreprises de vente directe en activité au Congo.' },
      { label: 'Documents requis', text: "Pièce d'identité, justificatif d'activité ou d'entreprise, coordonnées complètes." },
      { label: 'Délai de traitement', text: 'Une enquête de vérification est menée par nos commissions avant validation définitive.' },
      { label: 'Engagement', text: 'Adhésion au respect de la charte nationale de la vente directe et du règlement intérieur.' },
    ],
    whatsappQuestion: 'Une question avant de candidater ?',
    whatsappLink: 'Écrivez-nous sur WhatsApp',
    formTitle: 'Formulaire de candidature',
    formSub: 'Tous les champs marqués * sont obligatoires.',
    sentMessage: 'Merci ! Votre candidature a été enregistrée et sera examinée par nos commissions techniques.',
    fields: {
      lastName: 'Nom *', firstName: 'Prénom *', phone: 'Téléphone *', email: 'Email *',
      company: 'Entreprise de vente directe *', grade: 'Grade / statut *', city: 'Ville',
      gradeSelect: 'Sélectionner...',
    },
    grades: { vendeur_independant: 'Vendeur indépendant', distributeur: 'Distributeur', responsable_equipe: "Responsable d'équipe", entreprise: 'Entreprise (personne morale)' },
    submitting: 'Envoi en cours…',
    submit: 'Envoyer ma candidature',
    genericError: 'Une erreur est survenue.',
    processLabel: 'Comment ça marche',
    processTitle: 'Le processus de validation',
    processIntro: "Chaque candidature est vérifiée avant intégration à l'annuaire public des membres.",
    steps: [
      { title: 'Candidature en ligne', text: 'Vous remplissez le formulaire avec vos informations et celles de votre entreprise.' },
      { title: 'Enquête & vérification', text: 'Nos commissions techniques vérifient la conformité de votre activité.' },
      { title: 'Validation & intégration', text: "Une fois validé, vous rejoignez l'annuaire public des membres certifiés AVD-Congo." },
    ],
  },
  en: {
    seoTitle: 'Become a member',
    seoDescription: 'Join the African Direct Selling Association – Congo: membership requirements, online application form and approval process for sellers and companies.',
    label: 'Join AVD-Congo',
    h1: 'Become a certified member',
    intro: 'Independent sellers and direct selling companies: structure your activity within a network recognized by the Congolese State.',
    conditionsTitle: 'Membership requirements',
    conditionsIntro: 'Membership is open to any individual or company carrying out a direct selling activity in the Congo, subject to approval by our technical committees.',
    conditions: [
      { label: 'Who can join', text: 'Independent sellers, distributors and direct selling companies active in the Congo.' },
      { label: 'Required documents', text: 'Proof of identity, proof of business activity, complete contact details.' },
      { label: 'Processing time', text: 'A verification review is conducted by our committees before final approval.' },
      { label: 'Commitment', text: 'Compliance with the national direct selling charter and internal rules.' },
    ],
    whatsappQuestion: 'A question before applying?',
    whatsappLink: 'Message us on WhatsApp',
    formTitle: 'Application form',
    formSub: 'All fields marked * are required.',
    sentMessage: 'Thank you! Your application has been recorded and will be reviewed by our technical committees.',
    fields: {
      lastName: 'Last name *', firstName: 'First name *', phone: 'Phone *', email: 'Email *',
      company: 'Direct selling company *', grade: 'Grade / status *', city: 'City',
      gradeSelect: 'Select...',
    },
    grades: { vendeur_independant: 'Independent seller', distributeur: 'Distributor', responsable_equipe: 'Team leader', entreprise: 'Company (legal entity)' },
    submitting: 'Sending…',
    submit: 'Submit my application',
    genericError: 'Something went wrong.',
    processLabel: 'How it works',
    processTitle: 'The approval process',
    processIntro: 'Every application is reviewed before being added to the public member directory.',
    steps: [
      { title: 'Apply online', text: 'Fill in the form with your details and your company details.' },
      { title: 'Review & verification', text: 'Our technical committees verify that your activity complies.' },
      { title: 'Approval & inclusion', text: 'Once approved, you join the public directory of certified AVD-Congo members.' },
    ],
  },
};

export default function JoinUs() {
  const locale = useLocale();
  const c = CONTENT[locale];
  const [form, setForm] = useState<MembershipApplication>(initialState);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.submitMembershipApplication(form);
      setStatus('sent');
      setForm(initialState);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : c.genericError);
    }
  }

  return (
    <>
      <Seo title={c.seoTitle} description={c.seoDescription} path="/devenir-membre" locale={locale} />

      <section className="page-header">
        <div className="wrap">
          <span className="label">{c.label}</span>
          <h1>{c.h1}</h1>
          <p>{c.intro}</p>
        </div>
      </section>

      <section>
        <div className="wrap join-layout">
          <div className="join-side">
            <h2>{c.conditionsTitle}</h2>
            <p>{c.conditionsIntro}</p>
            <ul className="condition-list">
              {c.conditions.map((cond) => (
                <li key={cond.label}><div><b>{cond.label}</b>{cond.text}</div></li>
              ))}
            </ul>
            <div className="whatsapp-box">
              <div className="wa-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.35 1.28 4.81L2.05 22l5.42-1.42a9.87 9.87 0 004.57 1.16h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2z" /></svg>
              </div>
              <p>{c.whatsappQuestion} <a href="https://wa.me/242052000091" target="_blank" rel="noopener">{c.whatsappLink}</a></p>
            </div>
          </div>

          <div className="form-card">
            <h2>{c.formTitle}</h2>
            <p className="sub">{c.formSub}</p>

            {status === 'sent' ? (
              <p role="status">{c.sentMessage}</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot anti-spam — invisible et ignoré par un humain, souvent
                    rempli automatiquement par les bots de soumission de formulaires. */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="website">Laissez ce champ vide</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>{c.fields.lastName}</label>
                    <input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>{c.fields.firstName}</label>
                    <input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>{c.fields.phone}</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>{c.fields.email}</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field full">
                    <label>{c.fields.company}</label>
                    <input required value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="field">
                    <label>{c.fields.grade}</label>
                    <select required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value as MembershipApplication['grade'] })}>
                      <option value="">{c.fields.gradeSelect}</option>
                      {Object.entries(c.grades).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>{c.fields.city}</label>
                    <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>
                </div>

                {status === 'error' && <p role="alert" style={{ color: 'var(--orange)', marginBottom: 16 }}>{errorMsg}</p>}

                <button type="submit" className="form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? c.submitting : c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="process">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label on-dark">{c.processLabel}</span>
              <h2>{c.processTitle}</h2>
              <p>{c.processIntro}</p>
            </div>
          </div>
          <div className="process-row">
            {c.steps.map((step, i) => (
              <div className="step" key={step.title}>
                <div className="n">{String(i + 1).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
