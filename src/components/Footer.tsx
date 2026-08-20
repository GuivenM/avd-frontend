import { Link } from 'react-router-dom';
import { useLocale, useLocalizedPath } from '../lib/locale';
import { common } from '../i18n/common';

const PHONES = ['+242 05 200 00 91', '+242 05 377 79 22', '+242 06 763 60 68'];

const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/africaine-de-la-vente-directe/', icon: 'linkedin' },
  { name: 'Instagram', url: 'https://www.instagram.com/africaine_de_la_vente_directe?igsh=aTF3M2Z4bHE1bGpn&utm_source=qr', icon: 'instagram' },
  { name: 'Facebook', url: 'https://www.facebook.com/share/17Sfhg1shP/?mibextid=wwXIfr', icon: 'facebook' },
] as const;

export default function Footer() {
  const locale = useLocale();
  const t = common[locale];
  const lp = useLocalizedPath();

  return (
    <footer id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div className="brand-col">
            <img src="/assets/img/logo-avd-congo.png" alt="Logo AVD-Congo" />
            <p>{t.footer.tagline}</p>

            <ul className="footer-phones">
              {PHONES.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </li>
              ))}
            </ul>

            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>{t.footer.colOrg}</h4>
            <ul>
              <li><Link to={lp('/qui-sommes-nous')}>{t.nav.about}</Link></li>
              <li><Link to={lp('/piliers')}>{t.nav.pillars}</Link></li>
              <li><Link to={lp('/projets')}>{t.footer.projects}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.colMembers}</h4>
            <ul>
              <li><Link to={lp('/devenir-membre')}>{t.nav.join}</Link></li>
              <li><Link to={lp('/annuaire')}>{t.nav.directory}</Link></li>
              <li><Link to={lp('/charte-nationale')}>{t.footer.charter}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.colResources}</h4>
            <ul>
              <li><Link to={lp('/ressources')}>{t.footer.statutsRi}</Link></li>
              <li><Link to={lp('/actualites')}>{t.nav.news}</Link></li>
              <li><Link to={lp('/contact')}>{t.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.footer.colLegal}</h4>
            <ul>
              <li><Link to={lp('/legal/mentions-legales')}>{t.footer.legalNotice}</Link></li>
              <li><Link to={lp('/legal/confidentialite')}>{t.footer.privacy}</Link></li>
              <li><Link to={lp('/legal/cgu')}>{t.footer.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} AVD-Congo. {t.footer.rights}</span>
          <span>contact@avd-cg.org · 05 200 00 91</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'linkedin':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z" /></svg>
      );
    case 'instagram':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
      );
    case 'facebook':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8.1h2.7l.4-3.15h-3.1V7.75c0-.9.25-1.52 1.55-1.52h1.66V3.4C15.9 3.28 15 3.2 13.96 3.2c-2.4 0-4.05 1.47-4.05 4.16v2.4H7.2v3.15h2.7V21h3.6z" /></svg>
      );
    default:
      return null;
  }
}
