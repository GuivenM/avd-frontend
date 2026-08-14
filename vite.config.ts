import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deux builds séparés (voir "build" dans package.json) :
// 1. `vite build` — build client normal, sortie dans dist/
// 2. `vite build --ssr src/entry-server.tsx --outDir .vite-ssr-tmp` — bundle
//    Node de la fonction render(), utilisé uniquement au moment du build par
//    scripts/prerender.mjs, jamais déployé.
// Cette config sert aux deux (Vite détecte le mode SSR via le flag --ssr).
export default defineConfig({
  plugins: [react()],
  ssr: {
    // react-helmet-async est un module CommonJS : sans ça, Vite le laisse
    // en import externe pour le build SSR, et Node échoue à résoudre ses
    // exports nommés (Helmet, HelmetProvider) à l'exécution. En forçant son
    // intégration dans le bundle SSR, Vite gère lui-même l'interop CJS/ESM.
    noExternal: ['react-helmet-async'],
  },
});
