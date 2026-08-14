import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './lib/auth';
import './styles/tokens.css';
import './styles/global.css';

hydrateRoot(
  document.getElementById('root')!,
  <HelmetProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </HelmetProvider>,
);
