import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './lib/auth';

// Appelée par scripts/prerender.mjs pour chaque route du site (voir la
// liste ROUTES dans ce script). N'exécute jamais de useEffect (renderToString
// ne les déclenche pas) : le contenu doit donc être entièrement disponible
// au premier rendu — c'est déjà le cas pour toutes nos pages statiques.
// Pour les pages à données dynamiques (Annuaire, Actualités...), le HTML
// pré-rendu contient l'état "chargement" initial, puis le vrai contenu
// arrive après hydratation côté client (voir README, "Rendu hybride").
export function render(url: string) {
  // Typé en `any` volontairement : react-helmet-async ne documente pas
  // formellement le type de cet objet de contexte (voir sa doc officielle,
  // qui l'utilise non typé) — mieux vaut ça qu'un nom de type deviné à tort.
  const helmetContext: any = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AuthProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </AuthProvider>
    </HelmetProvider>,
  );

  return { html, helmet: helmetContext.helmet };
}
