// Pré-rend chaque route du site en HTML statique, à la place de
// vite-react-ssg (bug de résolution de module ESM reproductible même sous
// WSL, donc pas spécifique à Windows — abandonné au profit de ce script
// maison basé directement sur les APIs officielles de Vite/React).
//
// Lancé après les deux builds (client + SSR) par `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const clientDir = path.join(root, 'dist');
const ssrDir = path.join(root, '.vite-ssr-tmp');

const template = fs.readFileSync(path.join(clientDir, 'index.html'), 'utf-8');
// pathToFileURL() est indispensable ici : sous Windows, import() rejette un
// chemin brut du type "D:\...\entry-server.js" (ERR_UNSUPPORTED_ESM_URL_SCHEME)
// et exige une vraie URL file:// — inutile sous Linux/macOS mais inoffensif.
const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

// Pages statiques uniquement — pas /admin (protégée, sans intérêt à
// pré-rendre) ni /actualites/:slug (contenu dynamique dont on ne connaît
// pas les slugs au build ; voir README "Rendu hybride" pour l'améliorer
// plus tard en interrogeant l'API ici pour lister les articles publiés).
const FR_ROUTES = [
  '/', '/qui-sommes-nous', '/piliers', '/devenir-membre', '/annuaire',
  '/actualites', '/charte-nationale', '/ressources', '/projets',
  '/partenaires', '/contact',
  '/legal/mentions-legales', '/legal/confidentialite', '/legal/cgu',
];
const ROUTES = [
  ...FR_ROUTES,
  ...FR_ROUTES.map((r) => (r === '/' ? '/en' : `/en${r}`)),
  '/admin/login',
];

for (const url of ROUTES) {
  const { html: appHtml, helmet } = render(url);

  const head = [
    helmet?.title?.toString() ?? '',
    helmet?.meta?.toString() ?? '',
    helmet?.link?.toString() ?? '',
    helmet?.script?.toString() ?? '',
  ].join('\n');

  let page = template
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', appHtml);

  // Applique lang="fr"/"en" sur la vraie balise <html> (react-helmet-async
  // le gère via <html lang={...}/> dans Seo.tsx).
  if (helmet?.htmlAttributes) {
    page = page.replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`);
  }

  const outPath = url === '/'
    ? path.join(clientDir, 'index.html')
    : path.join(clientDir, url.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page);
  console.log('✓ pré-rendu :', url);
}

// Le bundle serveur ne fait pas partie du livrable à déployer.
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`\n${ROUTES.length} pages pré-rendues dans dist/ — prêt à déployer.`);
