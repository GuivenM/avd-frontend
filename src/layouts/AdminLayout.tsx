import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../lib/auth';

const NAV = [
  { to: '/admin', label: 'Candidatures', end: true },
  { to: '/admin/actualites', label: 'Actualités' },
  { to: '/admin/projets', label: 'Projets' },
  { to: '/admin/partenaires', label: 'Partenaires' },
  { to: '/admin/documents', label: 'Documents' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: 'var(--navy)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/admin" style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700 }}>AVD-Congo — Back-office</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, color: '#B9BBCB', fontSize: 13.5 }}>
          <span>{user?.name}</span>
          <button
            onClick={logout}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '8px 16px', cursor: 'pointer', fontFamily: 'var(--font-label)', fontSize: 13 }}
          >
            Déconnexion
          </button>
        </div>
      </header>
      <nav style={{ background: 'var(--white)', borderBottom: '1px solid var(--line)', padding: '0 32px', display: 'flex', gap: 4 }}>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              padding: '14px 16px',
              fontFamily: 'var(--font-label)',
              fontWeight: 600,
              fontSize: 13.5,
              color: isActive ? 'var(--orange)' : 'var(--navy)',
              borderBottom: isActive ? '2px solid var(--orange)' : '2px solid transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main style={{ padding: '40px 32px', maxWidth: 960, margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
