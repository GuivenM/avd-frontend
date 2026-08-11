import { useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import Seo from '../../components/Seo';

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
      <Seo title="Connexion back-office" description="Espace réservé à l'équipe AVD-Congo." path="/admin/login" noindex />
      <div className="form-card" style={{ width: 360, background: 'var(--white)' }}>
        <h2>Back-office AVD-Congo</h2>
        <p className="sub">Connexion réservée à l'équipe.</p>
        <form onSubmit={handleSubmit}>
          <div className="field" style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field" style={{ marginBottom: 20 }}>
            <label>Mot de passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p role="alert" style={{ color: 'var(--orange)', marginBottom: 16, fontSize: 13.5 }}>{error}</p>}
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
