import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import Seo from '../../components/Seo';

type PendingMember = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  grade: string;
  city: string | null;
  created_at: string;
};

const GRADE_LABELS: Record<string, string> = {
  vendeur_independant: 'Vendeur indépendant',
  distributeur: 'Distributeur',
  responsable_equipe: "Responsable d'équipe",
  entreprise: 'Entreprise',
};

export default function Dashboard() {
  const [applications, setApplications] = useState<PendingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<number | null>(null);

  function loadPending() {
    setLoading(true);
    api.adminListApplications('pending')
      .then((data: any) => setApplications(data.data ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadPending(); }, []);

  async function handleValidate(id: number) {
    setActioningId(id);
    try {
      await api.adminValidateMember(id, true); // true = visible dans l'annuaire public par défaut
      setApplications((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la validation.');
    } finally {
      setActioningId(null);
    }
  }

  async function handleReject(id: number) {
    const notes = prompt('Motif du rejet (optionnel, à usage interne) :') ?? undefined;
    setActioningId(id);
    try {
      await api.adminRejectMember(id, notes);
      setApplications((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors du rejet.');
    } finally {
      setActioningId(null);
    }
  }

  return (
    <>
      <Seo title="Tableau de bord" description="Back-office AVD-Congo." path="/admin" noindex />

      <h1 style={{ fontSize: 26, marginBottom: 8 }}>Candidatures en attente</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 32 }}>
        Vérifiez chaque candidature avant validation — une fois validée, elle génère automatiquement
        un numéro de membre et rejoint l'annuaire public (sauf désactivation explicite).
      </p>

      {loading && <p>Chargement…</p>}
      {!loading && applications.length === 0 && (
        <p style={{ color: 'var(--gray)' }}>Aucune candidature en attente. 🎉</p>
      )}

      {applications.map((m) => (
        <div key={m.id} className="form-card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: 17, marginBottom: 6 }}>{m.first_name} {m.last_name}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--gray)', marginBottom: 4 }}>
                {m.company_name} — {GRADE_LABELS[m.grade] ?? m.grade}{m.city ? ` · ${m.city}` : ''}
              </p>
              <p style={{ fontSize: 13.5, color: 'var(--gray)' }}>{m.email} · {m.phone}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <button
                className="btn btn-outline-dark"
                disabled={actioningId === m.id}
                onClick={() => handleReject(m.id)}
              >
                Rejeter
              </button>
              <button
                className="btn btn-primary"
                disabled={actioningId === m.id}
                onClick={() => handleValidate(m.id)}
              >
                {actioningId === m.id ? '…' : 'Valider'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
