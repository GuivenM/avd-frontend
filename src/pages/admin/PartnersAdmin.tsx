import { useEffect, useState, FormEvent } from 'react';
import { api, AdminPartner } from '../../lib/api';

const emptyForm = { name: '', type: 'entreprise', website: '', description: '', locale: 'fr', published: true };

export default function PartnersAdmin() {
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.adminListPartners()
      .then((data: any) => setPartners(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function startCreate() { setForm(emptyForm); setEditing(0); }
  function startEdit(p: AdminPartner) {
    setForm({ name: p.name, type: p.type, website: p.website ?? '', description: p.description ?? '', locale: p.locale, published: p.published });
    setEditing(p.id);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, website: form.website || null };
      if (editing) await api.adminUpdatePartner(editing, payload);
      else await api.adminCreatePartner(payload);
      setEditing(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce partenaire ?')) return;
    await api.adminDeletePartner(id);
    load();
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Partenaires</h1>
          <p style={{ color: 'var(--gray)' }}>Entreprises et institutions affichées sur la page Partenaires.</p>
        </div>
        {editing === null && <button className="btn btn-primary" onClick={startCreate}>+ Nouveau partenaire</button>}
      </div>

      {editing !== null && (
        <div className="form-card" style={{ marginBottom: 32 }}>
          <h2>{editing ? 'Modifier le partenaire' : 'Nouveau partenaire'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field full"><label>Nom *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Type *</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="entreprise">Entreprise</option>
                  <option value="institution">Institution</option>
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
              <div className="field full"><label>Site web</label><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." /></div>
            </div>
            <div className="form-row">
              <div className="field full"><label>Description</label><input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            </div>
            <div className="consent">
              <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              <label htmlFor="published">Visible publiquement sur le site</label>
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
      {!loading && partners.length === 0 && <p style={{ color: 'var(--gray)' }}>Aucun partenaire pour le moment.</p>}
      {partners.map((p) => (
        <div key={p.id} className="form-card" style={{ marginBottom: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{p.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>
                {p.type === 'entreprise' ? 'Entreprise' : 'Institution'} · {p.locale.toUpperCase()} · {p.published ? 'publié' : 'masqué'}
              </p>
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
