import type { RouteObject } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Pillars from './pages/Pillars';
import JoinUs from './pages/JoinUs';
import Directory from './pages/Directory';
import News from './pages/News';
import NewsArticle from './pages/NewsArticle';
import Charter from './pages/Charter';
import Resources from './pages/Resources';
import Projects from './pages/Projects';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import MentionsLegales from './pages/legal/MentionsLegales';
import Confidentialite from './pages/legal/Confidentialite';
import Cgu from './pages/legal/Cgu';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ArticlesAdmin from './pages/admin/ArticlesAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import PartnersAdmin from './pages/admin/PartnersAdmin';
import DocumentsAdmin from './pages/admin/DocumentsAdmin';

// Utilisé à la fois par le client (BrowserRouter, entry-client.tsx) et par
// le pré-rendu serveur (StaticRouter, entry-server.tsx) via useRoutes() —
// voir App.tsx. C'est un RouteObject[] standard de react-router-dom, aucune
// dépendance à un outil de SSG tiers.
//
// Les mêmes segments sont déclarés deux fois (racine '/' et racine '/en')
// pour générer une arborescence FR et EN en miroir — les pages elles-mêmes
// détectent la langue via useLocale() (préfixe d'URL) et adaptent leur
// contenu et leurs liens en conséquence (voir lib/locale.ts).
//
// IMPORTANT : cette fonction doit être appelée deux fois (une par racine),
// pas assignée à une variable réutilisée — React Router génère un id
// interne par référence d'objet de route ; réutiliser le même tableau pour
// '/' et '/en' provoque une collision d'id ("route id collision on id
// 0-0-0") puisque les deux arbres pointeraient vers les mêmes objets.
function createPublicChildren(): RouteObject[] {
  return [
    { index: true, element: <Home /> },
    { path: 'qui-sommes-nous', element: <About /> },
    { path: 'piliers', element: <Pillars /> },
    { path: 'devenir-membre', element: <JoinUs /> },
    { path: 'annuaire', element: <Directory /> },
    { path: 'actualites', element: <News /> },
    { path: 'actualites/:slug', element: <NewsArticle /> },
    { path: 'charte-nationale', element: <Charter /> },
    { path: 'ressources', element: <Resources /> },
    { path: 'projets', element: <Projects /> },
    { path: 'partenaires', element: <Partners /> },
    { path: 'contact', element: <Contact /> },
    { path: 'legal/mentions-legales', element: <MentionsLegales /> },
    { path: 'legal/confidentialite', element: <Confidentialite /> },
    { path: 'legal/cgu', element: <Cgu /> },
  ];
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: createPublicChildren(),
  },
  {
    path: '/en',
    element: <MainLayout />,
    children: createPublicChildren(),
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'actualites', element: <ArticlesAdmin /> },
          { path: 'projets', element: <ProjectsAdmin /> },
          { path: 'partenaires', element: <PartnersAdmin /> },
          { path: 'documents', element: <DocumentsAdmin /> },
        ],
      },
    ],
  },
];
