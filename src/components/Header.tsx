import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLocale, useLocalizedPath, useAlternateLocaleLink } from '../lib/locale';
import { common } from '../i18n/common';

export default function Header() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = common[locale];
  const lp = useLocalizedPath();
  const { altLocale, altPath } = useAlternateLocaleLink();
  const { pathname } = useLocation();

  // Sur l'accueil (FR ou EN), le header flotte au-dessus du hero plein écran
  // mais reste blanc et opaque (pas de version transparente). On calcule
  // isHome après le montage seulement (useEffect) : le tout premier rendu
  // — serveur ET client — reste identique dans les deux cas, ce qui évite
  // tout risque de désynchronisation d'hydratation sur le <header>.
  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    setIsHome(pathname === '/' || pathname === '/en');
  }, [pathname]);

  const NAV_ITEMS = [
    { to: lp('/'), label: locale === 'en' ? 'Home' : 'Accueil' },
    { to: lp('/qui-sommes-nous'), label: t.nav.about },
    { to: lp('/piliers'), label: t.nav.pillars },
    { to: lp('/devenir-membre'), label: t.nav.join },
    { to: lp('/annuaire'), label: t.nav.directory },
    { to: lp('/ressources'), label: t.nav.resources },
    { to: lp('/actualites'), label: t.nav.news },
  ];
  const contactLink = { to: lp('/contact'), label: t.nav.contact };

  return (
    <header className={`site-header ${isHome ? 'site-header--overlay' : ''}`}>
      {!isHome && (
        <div className="header-top">
          <div className="wrap">
            <NavLink to={locale === 'fr' ? '#' : altPath}>FR</NavLink>
            <NavLink to={locale === 'en' ? '#' : altPath}>EN</NavLink>
            <a href={`mailto:${t.headerTop.email}`}>{t.headerTop.email}</a>
          </div>
        </div>
      )}

      <div className="header-inner">
        <NavLink to={lp('/')} className="brand">
          <img src="/assets/img/logo-avd-congo.png" alt="Logo AVD-Congo" />
        </NavLink>

        <nav className="main-nav" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === lp('/')} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to={contactLink.to} className="nav-cta">{contactLink.label}</NavLink>
        </nav>

        <button
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobileNav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>

      <div id="mobileNav" className={`mobile-nav ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === lp('/')} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
        <NavLink to={contactLink.to} className="nav-cta" style={{ marginTop: 8 }} onClick={() => setOpen(false)}>
          {contactLink.label}
        </NavLink>
        <NavLink to={altPath} onClick={() => setOpen(false)}>
          {altLocale === 'en' ? 'EN' : 'FR'} — {t.headerTop.email}
        </NavLink>
      </div>
    </header>
  );
}

