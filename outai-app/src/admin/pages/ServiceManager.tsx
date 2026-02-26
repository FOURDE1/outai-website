import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getServices, saveServices } from '@/lib/cmsStore';
import type { ServiceItem } from '@/types/admin';

/* ── Reusable styles ── */
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: 600, border: 'none', color: '#fff', cursor: 'pointer',
  background: 'linear-gradient(135deg, #7AC90E, #01A532)', boxShadow: '0 2px 12px rgba(1,165,50,0.25)',
};
const btnOutline: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: 600, border: '1px solid #253045', color: '#8b95a5', backgroundColor: 'transparent', cursor: 'pointer',
};
const btnIcon: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px',
  borderRadius: '8px', border: '1px solid #253045', backgroundColor: 'transparent', cursor: 'pointer',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
  color: '#ecf0f5', outline: 'none', backgroundColor: '#0d1117', border: '1px solid #253045',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px',
};

const ICON_MAP: Record<string, JSX.Element> = {
  car: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a1 1 0 0 0-.98.75L3 11H2v5h1m16 0a2 2 0 1 1-4 0M7 16a2 2 0 1 1-4 0" /></svg>,
  calendar: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  taxi: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 17h14v-5H5v5zM14 7h-4l-1 5h6L14 7z" /><circle cx="7.5" cy="17.5" r="1.5" /><circle cx="16.5" cy="17.5" r="1.5" /></svg>,
  truck: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  winch: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22V8M5 12l7-8 7 8" /><path d="M5 20h14" /></svg>,
  default: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>,
};
const getIcon = (name: string) => ICON_MAP[name] || ICON_MAP['default'];

function ServiceEditor({ service, onSave, onCancel }: { service: ServiceItem | null; onSave: (s: ServiceItem) => void; onCancel: () => void }) {
  const isNew = !service;
  const [activeLang, setActiveLang] = useState<'en' | 'fr'>('en');
  const [form, setForm] = useState<ServiceItem>(
    service ?? { id: Date.now().toString(), titleEn: '', titleFr: '', descriptionEn: '', descriptionFr: '', iconName: 'default', linkHref: '', sortOrder: 0, isVisible: true }
  );
  const updateField = (key: keyof ServiceItem, value: string | boolean | number) => setForm((p) => ({ ...p, [key]: value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(form); toast.success(isNew ? 'Service created' : 'Service updated'); };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      style={{ backgroundColor: '#1c2432', border: '1px solid rgba(122,201,14,0.2)', borderRadius: '14px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>
          {isNew ? '✦ New Service' : '✎ Edit Service'}
        </h2>
        <button onClick={onCancel} style={{ ...btnOutline, padding: '7px 14px', fontSize: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6" /></svg>
          Back to list
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', gap: '4px', padding: '3px', borderRadius: '10px', backgroundColor: '#0d1117', width: 'fit-content' }}>
          {(['en', 'fr'] as const).map((lang) => (
            <button key={lang} type="button" onClick={() => setActiveLang(lang)} style={{
              padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer',
              color: activeLang === lang ? '#fff' : '#8b95a5', background: activeLang === lang ? 'linear-gradient(135deg, #7AC90E, #01A532)' : 'transparent',
            }}>{lang === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}</button>
          ))}
        </div>

        <div>
          <label style={labelStyle}>Title</label>
          <input type="text" value={activeLang === 'en' ? form.titleEn : form.titleFr} onChange={(e) => updateField(activeLang === 'en' ? 'titleEn' : 'titleFr', e.target.value)} style={inputStyle} placeholder="Service title..." required />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea value={activeLang === 'en' ? form.descriptionEn : form.descriptionFr} onChange={(e) => updateField(activeLang === 'en' ? 'descriptionEn' : 'descriptionFr', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Service description..." required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Icon Name</label>
            <select value={form.iconName} onChange={(e) => updateField('iconName', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {Object.keys(ICON_MAP).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Link Href</label>
            <input type="text" value={form.linkHref} onChange={(e) => updateField('linkHref', e.target.value)} style={inputStyle} placeholder="/services/..." />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Sort Order</label>
            <input type="number" value={form.sortOrder} onChange={(e) => updateField('sortOrder', Number(e.target.value))} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.isVisible} onChange={(e) => updateField('isVisible', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#7AC90E' }} />
              <span style={{ fontSize: '13px', color: '#8b95a5' }}>Visible on site</span>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
          <button type="submit" style={btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12" /></svg>
            {isNew ? 'Create Service' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} style={btnOutline}>Cancel</button>
        </div>
      </form>
    </motion.div>
  );
}

export default function ServiceManager() {
  const [services, setServices] = useState<ServiceItem[]>(() => getServices());
  const [editing, setEditing] = useState<ServiceItem | null | 'new'>(null);

  const handleSave = (svc: ServiceItem) => {
    const updated = (() => { const ex = services.find((p) => p.id === svc.id); return ex ? services.map((p) => (p.id === svc.id ? svc : p)) : [...services, svc]; })();
    setServices(updated);
    saveServices(updated);
    setEditing(null);
  };
  const handleDelete = (id: string) => { if (!confirm('Delete this service?')) return; const updated = services.filter((p) => p.id !== id); setServices(updated); saveServices(updated); toast.success('Service deleted'); };
  const toggleVisibility = (id: string) => {
    const updated = services.map((s) => s.id === id ? { ...s, isVisible: !s.isVisible } : s);
    setServices(updated);
    saveServices(updated);
    toast.success('Visibility toggled');
  };
  const moveItem = (id: string, direction: 'up' | 'down') => {
    setServices((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === prev.length - 1)) return prev;
      const next = [...prev]; const swap = direction === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      saveServices(next);
      return next;
    });
  };

  if (editing !== null) {
    return (
      <AnimatePresence mode="wait">
        <ServiceEditor key={editing === 'new' ? 'new' : editing.id} service={editing === 'new' ? null : editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      </AnimatePresence>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>Service Manager</h1>
          <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>Manage your services offered to customers.</p>
        </div>
        <button onClick={() => setEditing('new')} style={btnPrimary}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Service
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
        {services.map((svc, i) => (
          <motion.div key={svc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ backgroundColor: '#1c2432', border: `1px solid ${svc.isVisible ? '#253045' : 'rgba(92,104,120,0.25)'}`, borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', opacity: svc.isVisible ? 1 : 0.6 }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              {/* Icon */}
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                backgroundColor: svc.isVisible ? 'rgba(122,201,14,0.1)' : '#0d1117', color: svc.isVisible ? '#7AC90E' : '#5c6878' }}>
                {getIcon(svc.iconName)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ecf0f5', margin: 0 }}>{svc.titleEn}</h3>
                  {!svc.isVisible && (
                    <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 600, color: '#5c6878', backgroundColor: '#0d1117', border: '1px solid #253045' }}>Hidden</span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: '#5c6878', margin: '4px 0 0', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {svc.descriptionEn}
                </p>
              </div>
            </div>

            {/* Link */}
            {svc.linkHref && (
              <div style={{ fontSize: '11px', color: '#5c6878', padding: '6px 10px', borderRadius: '8px', backgroundColor: '#0d1117', fontFamily: 'monospace' }}>
                {svc.linkHref}
              </div>
            )}

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px', borderTop: '1px solid #253045' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button onClick={() => moveItem(svc.id, 'up')} disabled={i === 0} style={{ ...btnIcon, width: '28px', height: '28px', opacity: i === 0 ? 0.3 : 1, color: '#8b95a5' }} title="Move up">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18,15 12,9 6,15" /></svg>
                </button>
                <button onClick={() => moveItem(svc.id, 'down')} disabled={i === services.length - 1} style={{ ...btnIcon, width: '28px', height: '28px', opacity: i === services.length - 1 ? 0.3 : 1, color: '#8b95a5' }} title="Move down">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6,9 12,15 18,9" /></svg>
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button onClick={() => toggleVisibility(svc.id)} style={{ ...btnIcon, color: svc.isVisible ? '#7AC90E' : '#5c6878' }} title={svc.isVisible ? 'Hide' : 'Show'}>
                  {svc.isVisible
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  }
                </button>
                <button onClick={() => setEditing(svc)} style={{ ...btnIcon, color: '#7AC90E' }} title="Edit">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
                <button onClick={() => handleDelete(svc.id)} style={{ ...btnIcon, color: '#f87171' }} title="Delete">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: '#5c6878', fontSize: '13px', backgroundColor: '#1c2432', border: '1px solid #253045', borderRadius: '14px' }}>
          <p>No services yet. Click <strong style={{ color: '#7AC90E' }}>Add Service</strong> to create one.</p>
        </div>
      )}
    </div>
  );
}
