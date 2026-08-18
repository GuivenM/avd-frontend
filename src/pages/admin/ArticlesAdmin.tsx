import { useEffect, useState, FormEvent } from 'react';
import { api, AdminArticle } from '../../lib/api';

const CATEGORIES = [
  { value: 'communique', label: 'Communiqué' },
  { value: 'alerte', label: 'Alerte' },
  { value: 'formation', label: 'Formation' },
];

const emptyForm = { title: '', excerpt: '', body: '', category: 'communique', locale: 'fr', published_at: '' };

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null); // null = pas de formulaire ouvert, 0 = nouveau
  const [form, setForm] = useState<any>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function load() {
    setLoading(true);
    api.adminListArticles()
      .then((data: any) => setArticles(data.data ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function startCreate() {
    setForm(emptyForm);
    setEditing(0);
  }

  function startEdit(a: AdminArticle) {
    setForm({
      title: a.title, excerpt: a.excerpt ?? '', body: a.body, category: a.category,
      locale: a.locale, published_at: a.published_at ? a.published_at.slice(0, 16) : '',
    });
    setEditing(a.id);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, published_at: form.published_at || null };
      if (editing) {
        await api.adminUpdateArticle(editing, payload);
      } else {
        await api.adminCreateArticle(payload);
      }
      setEditing(null);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cet article ? Cette action est irréversible.')) return;
    await api.adminDeleteArticle(id);
    load();
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Actualités</h1>
          <p style={{ color: 'var(--gray)' }}>Communiqués, alertes et formations publiés sur le site.</p>
        </div>
        {editing === null && <button className="btn btn-primary" onClick={startCreate}>+ Nouvel article</button>}
      </div>

      {editing !== null && (
        <div className="form-card" style={{ marginBottom: 32 }}>
          <h2>{editing ? "Modifier l'article" : 'Nouvel article'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field"><label>Titre *</label><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="field">
                <label>Catégorie *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Langue *</label>
                <select value={form.locale} onChange={(e) => setForm({ ...form, locale: e.target.value })}>
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="field">
                <label>Date de publication</label>
                <input type="datetime-local" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} />
                <span className="hint">Vide = brouillon, non visible publiquement.</span>
              </div>
            </div>
            <div className="form-row">
              <div className="field full"><label>Extrait (résumé court)</label><input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
            </div>
            <div className="form-row">
              <div className="field full">
                <label>Contenu * (HTML simple accepté : &lt;p&gt;, &lt;strong&gt;, &lt;a&gt;...)</label>
                <textarea required rows={8} style={{ border: '1.5px solid var(--line)', padding: 12, fontFamily: 'var(--font-body)', fontSize: 14 }} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
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
      {!loading && articles.length === 0 && <p style={{ color: 'var(--gray)' }}>Aucun article pour le moment.</p>}
      {articles.map((a) => (
        <div key={a.id} className="form-card" style={{ marginBottom: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: 15.5, marginBottom: 4 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray)' }}>
                {a.category} · {a.locale.toUpperCase()} · {a.published_at ? `publié le ${new Date(a.published_at).toLocaleDateString('fr-FR')}` : 'brouillon'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline-dark" onClick={() => startEdit(a)}>Modifier</button>
              <button className="btn btn-outline-dark" onClick={() => handleDelete(a.id)}>Supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
