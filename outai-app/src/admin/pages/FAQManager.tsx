import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getFAQItems, saveFAQItems } from '@/lib/cmsStore';
import type { FAQItem } from '@/types/admin';

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

function FAQEditor({ faq, onSave, onCancel }: { faq: FAQItem | null; onSave: (f: FAQItem) => void; onCancel: () => void }) {
  const isNew = !faq;
  const [activeLang, setActiveLang] = useState<'en' | 'fr'>('en');
  const [form, setForm] = useState<FAQItem>(
    faq ?? { id: Date.now().toString(), questionEn: '', questionFr: '', answerEn: '', answerFr: '', sortOrder: 0, isVisible: true }
  );
  const updateField = (key: keyof FAQItem, value: string | boolean | number) => setForm((p) => ({ ...p, [key]: value }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(form); toast.success(isNew ? 'FAQ item created' : 'FAQ item updated'); };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      style={{ backgroundColor: '#1c2432', border: '1px solid rgba(122,201,14,0.2)', borderRadius: '14px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>
          {isNew ? '✦ New FAQ Item' : '✎ Edit FAQ Item'}
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
          <label style={labelStyle}>Question</label>
          <input type="text" value={activeLang === 'en' ? form.questionEn : form.questionFr} onChange={(e) => updateField(activeLang === 'en' ? 'questionEn' : 'questionFr', e.target.value)} style={inputStyle} placeholder="Enter FAQ question..." required />
        </div>

        <div>
          <label style={labelStyle}>Answer</label>
          <textarea value={activeLang === 'en' ? form.answerEn : form.answerFr} onChange={(e) => updateField(activeLang === 'en' ? 'answerEn' : 'answerFr', e.target.value)} rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write the answer..." required />
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
            {isNew ? 'Create FAQ' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} style={btnOutline}>Cancel</button>
        </div>
      </form>
    </motion.div>
  );
}

export default function FAQManager() {
  const [items, setItems] = useState<FAQItem[]>(() => getFAQItems());
  const [editingItem, setEditingItem] = useState<FAQItem | null | 'new'>(null);

  const handleSave = (faq: FAQItem) => {
    const updated = (() => { const ex = items.find((p) => p.id === faq.id); return ex ? items.map((p) => (p.id === faq.id ? faq : p)) : [...items, faq]; })();
    setItems(updated);
    saveFAQItems(updated);
    setEditingItem(null);
  };
  const handleDelete = (id: string) => { if (!confirm('Delete this FAQ item?')) return; const updated = items.filter((p) => p.id !== id); setItems(updated); saveFAQItems(updated); toast.success('FAQ item deleted'); };
  const moveItem = (id: string, direction: 'up' | 'down') => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === prev.length - 1)) return prev;
      const next = [...prev]; const swap = direction === 'up' ? idx - 1 : idx + 1;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      saveFAQItems(next);
      return next;
    });
  };

  if (editingItem !== null) {
    return (
      <AnimatePresence mode="wait">
        <FAQEditor key={editingItem === 'new' ? 'new' : editingItem.id} faq={editingItem === 'new' ? null : editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} />
      </AnimatePresence>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>FAQ Manager</h1>
          <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>Manage frequently asked questions. Drag to reorder.</p>
        </div>
        <button onClick={() => setEditingItem('new')} style={btnPrimary}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add FAQ
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ backgroundColor: '#1c2432', border: '1px solid #253045', borderRadius: '14px', padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>

            {/* Reorder arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '2px' }}>
              <button onClick={() => moveItem(item.id, 'up')} disabled={i === 0} style={{ ...btnIcon, width: '26px', height: '26px', opacity: i === 0 ? 0.3 : 1, color: '#8b95a5' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18,15 12,9 6,15" /></svg>
              </button>
              <button onClick={() => moveItem(item.id, 'down')} disabled={i === items.length - 1} style={{ ...btnIcon, width: '26px', height: '26px', opacity: i === items.length - 1 ? 0.3 : 1, color: '#8b95a5' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6,9 12,15 18,9" /></svg>
              </button>
            </div>

            {/* Number badge */}
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              backgroundColor: item.isVisible ? 'rgba(122,201,14,0.1)' : '#0d1117', color: item.isVisible ? '#7AC90E' : '#5c6878', fontSize: '13px', fontWeight: 700 }}>
              {i + 1}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#ecf0f5' }}>{item.questionEn}</span>
                {!item.isVisible && (
                  <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 600, color: '#5c6878', backgroundColor: '#0d1117', border: '1px solid #253045' }}>Hidden</span>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#5c6878', margin: 0, lineHeight: 1.6, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {item.answerEn}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button onClick={() => setEditingItem(item)} style={{ ...btnIcon, color: '#7AC90E' }} title="Edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ ...btnIcon, color: '#f87171' }} title="Delete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: '#5c6878', fontSize: '13px', backgroundColor: '#1c2432', border: '1px solid #253045', borderRadius: '14px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#253045" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          <p>No FAQ items yet. Click <strong style={{ color: '#7AC90E' }}>Add FAQ</strong> to create one.</p>
        </div>
      )}
    </div>
  );
}
