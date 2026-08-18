import { useEffect, useState, FormEvent } from 'react';
import { api, AdminProject } from '../../lib/api';

const STATUSES = [
  { value: 'a_venir', label: 'À venir' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' },
];

const emptyForm = { title: '', description: '', status: 'a_venir', locale: 'fr' };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.adminListProjects()
      .then((data: any) => setProjects(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function startCreate() { setForm(emptyForm); setEditing(0); }
  function startEdit(p: AdminProject) {
    setForm({ title: p.title, description: p.description, status: p.status, locale: p.locale });
    setEditing(p.id);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) await api.adminUpdateProject(editing, form);
      else await api.adminCreateProject(form);
      setEditing(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce projet ?')) return;
    await api.adminDeleteProject(id);
    load();
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Projets</h1>
          <p style={{ color: 'var(--gray)' }}>Les initiatives affichées sur la page Projets.</p>
        </div>
        {editing === null && <button className="btn btn-primary" onClick={startCreate}>+ Nouveau projet</button>}
      </div>

      {editing !== null && (
        <div className="form-card" style={{ marginBottom: 32 }}>
          <h2>{editing ? 'Modifier le projet' : 'Nouveau projet'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field full"><label>Titre *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Statut *</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Langue *</label>
                <select value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>Description *</label>
                <textarea required rows={4} style={{ border: '1.5px solid var(--line)', padding: 12, fontFamily: 'var(--font-body)', fontSize: 14 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
            </div>
            {error && <p role="alert" style={{ color: 'var(--orange)', marginBottom: 16 }}>{error}</p>}
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" className="form-submit" style={{ width: 'auto', padding: '13px 30px' }} disabled={saving}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
              <button type="button" className="btn btn-outline-dark" onClick={() => setEditing(null)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      {loading && <p>Chargement…</p>}
      {!loading && projects.length === 0 && <p style={{ color: 'var(--gray)' }}>Aucun projet pour le moment.</p>}
      {projects.map((p) => (
        <div key={p.id} className="form-card" style={{ marginBottom: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>{STATUSES.find((s) => s.value === p.status)?.label} · {p.locale.toUpperCase()}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline-dark" onClick={() => startEdit(p)}>Modifier</button>
              <button className="btn btn-outline-dark" onClick={() => handleDelete(p.id)}>Supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
