import { useEffect, useState, FormEvent } from 'react';
import { api, AdminDocument } from '../../lib/api';

const TYPES = [
  { value: 'statuts', label: 'Statuts' },
  { value: 'reglement_interieur', label: 'Règlement intérieur' },
  { value: 'charte_nationale', label: 'Charte nationale' },
  { value: 'journal_officiel', label: 'Journal Officiel' },
  { value: 'autre', label: 'Autre' },
];

const emptyForm = { title: '', type: 'statuts', file_path: '', locale: 'fr', published: true };

export default function DocumentsAdmin() {
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.adminListDocuments()
      .then((data: any) => setDocuments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function startCreate() { setForm(emptyForm); setEditing(0); }
  function startEdit(d: AdminDocument) {
    setForm({ title: d.title, type: d.type, file_path: d.file_path, locale: d.locale, published: d.published });
    setEditing(d.id);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) await api.adminUpdateDocument(editing, form);
      else await api.adminCreateDocument(form);
      setEditing(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer ce document ?')) return;
    await api.adminDeleteDocument(id);
    load();
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Documents</h1>
          <p style={{ color: 'var(--gray)' }}>Statuts, règlement intérieur, charte, JO — page Ressources.</p>
        </div>
        {editing === null && <button className="btn btn-primary" onClick={startCreate}>+ Nouveau document</button>}
      </div>

      {editing !== null && (
        <div className="form-card" style={{ marginBottom: 32 }}>
          <h2>{editing ? 'Modifier le document' : 'Nouveau document'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field full"><label>Titre *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Type *</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
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
                <label>URL du PDF *</label>
                <input required value={form.file_path} onChange={(e) => setForm({ ...form, file_path: e.target.value })} placeholder="/documents/statuts.pdf ou https://..." />
                <span className="hint">Pas encore d'upload de fichier dans le back-office — héberge le PDF (ex: dans public_html/documents/) et colle son URL ici.</span>
              </div>
            </div>
            <div className="consent">
              <input type="checkbox" id="doc-published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              <label htmlFor="doc-published">Visible publiquement sur le site</label>
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
      {!loading && documents.length === 0 && <p style={{ color: 'var(--gray)' }}>Aucun document pour le moment.</p>}
      {documents.map((d) => (
        <div key={d.id} className="form-card" style={{ marginBottom: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{d.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>
                {TYPES.find((t) => t.value === d.type)?.label} · {d.locale.toUpperCase()} · {d.published ? 'publié' : 'masqué'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline-dark" onClick={() => startEdit(d)}>Modifier</button>
              <button className="btn btn-outline-dark" onClick={() => handleDelete(d.id)}>Supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
