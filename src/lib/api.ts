// Base URL du back-office Laravel : api.avd-cg.org en prod (sous-domaine
// dédié, document root pointé sur laravel-app/public — voir README).
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.avd-cg.org';

const TOKEN_KEY = 'avdcg_admin_token';

// Stockage volontairement simple (localStorage) pour ce panneau d'admin à
// faible nombre d'utilisateurs. Connu comme moins robuste qu'un cookie
// httpOnly face au XSS — acceptable ici, à durcir si le back-office
// s'étoffe (voir README, section Auth).
export const authToken = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = authToken.get();
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (res.status === 401) {
    authToken.clear(); // token expiré/invalide : on nettoie pour forcer un nouveau login
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Erreur API (${res.status})`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export type MembershipApplication = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city?: string;
  company_name: string;
  grade: 'vendeur_independant' | 'distributeur' | 'responsable_equipe' | 'entreprise';
  /** Honeypot anti-spam — doit toujours rester vide, voir composant JoinUs */
  website?: string;
};

export const api = {
  // Utilisé côté client (runtime), pas au build SSG : c'est une action
  // d'écriture, elle ne peut pas être pré-rendue.
  submitMembershipApplication: (data: MembershipApplication) =>
    request('/api/adhesions', { method: 'POST', body: JSON.stringify(data) }),

  // Utilisé AU BUILD (SSG) pour pré-rendre le contenu, et éventuellement
  // au runtime pour une pagination/filtrage dynamique côté client.
  getPublicDirectory: (page = 1) => request(`/api/membres?page=${page}`),
  getArticles: (locale = 'fr') => request(`/api/articles?locale=${locale}`),
  getArticle: (slug: string, locale = 'fr') => request(`/api/articles/${slug}?locale=${locale}`),
  getProjects: (locale = 'fr') => request(`/api/projets?locale=${locale}`),
  getPartners: (type: 'entreprise' | 'institution', locale = 'fr') =>
    request(`/api/partenaires?type=${type}&locale=${locale}`),
  getDocuments: (type?: string, locale = 'fr') =>
    request(`/api/documents?locale=${locale}${type ? `&type=${type}` : ''}`),
  /** website = honeypot anti-spam, doit rester vide */
  subscribeNewsletter: (email: string, locale = 'fr', website = '') =>
    request('/api/newsletter', { method: 'POST', body: JSON.stringify({ email, locale, website }) }),

  // --- Auth back-office ---
  login: (email: string, password: string) =>
    request<{ token: string; user: AdminUser }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request('/api/logout', { method: 'POST' }),
  me: () => request<AdminUser>('/api/me'),

  // --- Admin : validation des adhésions ---
  adminListApplications: (status: 'pending' | 'validated' | 'rejected' = 'pending') =>
    request(`/api/admin/adhesions?status=${status}`),
  adminValidateMember: (id: number, publicDirectory: boolean) =>
    request(`/api/admin/adhesions/${id}/valider`, {
      method: 'PATCH',
      body: JSON.stringify({ public_directory: publicDirectory }),
    }),
  adminRejectMember: (id: number, notes?: string) =>
    request(`/api/admin/adhesions/${id}/rejeter`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    }),

  // --- Admin : actualités ---
  adminListArticles: () => request(`/api/admin/articles`),
  adminCreateArticle: (data: Partial<AdminArticle>) =>
    request('/api/admin/articles', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateArticle: (id: number, data: Partial<AdminArticle>) =>
    request(`/api/admin/articles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteArticle: (id: number) => request(`/api/admin/articles/${id}`, { method: 'DELETE' }),

  // --- Admin : projets ---
  adminListProjects: () => request(`/api/projets`), // pas de brouillon pour les projets, la liste publique suffit
  adminCreateProject: (data: Partial<AdminProject>) =>
    request('/api/admin/projets', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateProject: (id: number, data: Partial<AdminProject>) =>
    request(`/api/admin/projets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteProject: (id: number) => request(`/api/admin/projets/${id}`, { method: 'DELETE' }),

  // --- Admin : partenaires ---
  adminListPartners: () => request(`/api/admin/partenaires`),
  adminCreatePartner: (data: Partial<AdminPartner>) =>
    request('/api/admin/partenaires', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdatePartner: (id: number, data: Partial<AdminPartner>) =>
    request(`/api/admin/partenaires/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeletePartner: (id: number) => request(`/api/admin/partenaires/${id}`, { method: 'DELETE' }),

  // --- Admin : documents ---
  adminListDocuments: () => request(`/api/admin/documents`),
  adminCreateDocument: (data: Partial<AdminDocument>) =>
    request('/api/admin/documents', { method: 'POST', body: JSON.stringify(data) }),
  adminUpdateDocument: (id: number, data: Partial<AdminDocument>) =>
    request(`/api/admin/documents/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  adminDeleteDocument: (id: number) => request(`/api/admin/documents/${id}`, { method: 'DELETE' }),
};

export type AdminUser = { id: number; name: string; email: string; role: string };

export type AdminArticle = {
  id: number; title: string; excerpt: string | null; body: string; category: string;
  locale: string; published_at: string | null;
};
export type AdminProject = {
  id: number; title: string; description: string; status: string; locale: string;
};
export type AdminPartner = {
  id: number; name: string; type: string; website: string | null; description: string | null;
  locale: string; published: boolean;
};
export type AdminDocument = {
  id: number; title: string; type: string; file_path: string; locale: string; published: boolean;
};
