import { useRoutes } from 'react-router-dom';
import { routes } from './router';

// useRoutes() lit le contexte Router ambiant — BrowserRouter côté client
// (entry-client.tsx), StaticRouter côté pré-rendu serveur (entry-server.tsx).
// AuthProvider est fourni par les deux points d'entrée, pas ici, pour rester
// disponible avant même le routeur (pas nécessaire en pratique, mais plus
// simple à raisonner).
export default function App() {
  return useRoutes(routes);
}
