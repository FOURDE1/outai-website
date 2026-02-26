import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getContentSections, saveContentSections } from '@/lib/cmsStore';
import type { ContentSection, ContentField } from '@/types/admin';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  hero: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  stats: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  services: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  contact: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  outai_way: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
};

function getSectionIcon(id: string) {
  return SECTION_ICONS[id] ?? SECTION_ICONS.hero;
}

function SectionEditor({ section, onSave, index }: { section: ContentSection; onSave: (fields: ContentField[]) => void; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState<ContentField[]>(section.fields);
  const [activeLang, setActiveLang] = useState<'en' | 'fr'>('en');

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.key === key
          ? { ...f, [activeLang === 'en' ? 'valueEn' : 'valueFr']: value }
          : f
      )
    );
  };

  const handleSave = () => {
    onSave(fields);
    setIsEditing(false);
    toast.success(`${section.title} saved`);
  };

  const handleCancel = () => {
    setFields(section.fields);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{
        backgroundColor: '#1c2432',
        border: isOpen ? '1px solid rgba(122,201,14,0.2)' : '1px solid #253045',
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            backgroundColor: isOpen ? 'rgba(122,201,14,0.12)' : '#0d1117',
            color: isOpen ? '#7AC90E' : '#5c6878', transition: 'all 0.3s',
          }}>
            {getSectionIcon(section.id)}
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ecf0f5', margin: 0 }}>{section.title}</h3>
            <p style={{ fontSize: '12px', color: '#5c6878', margin: '2px 0 0' }}>{section.fields.length} editable fields</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, backgroundColor: '#0d1117', color: '#5c6878' }}>
            {section.fields.length}
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5c6878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div style={{ padding: '0 20px 20px', borderTop: '1px solid #253045' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0 12px' }}>
                <div style={{ display: 'flex', gap: '4px', padding: '3px', borderRadius: '10px', backgroundColor: '#0d1117' }}>
                  {(['en', 'fr'] as const).map((lang) => (
                    <button key={lang} onClick={() => setActiveLang(lang)} style={{
                      padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer',
                      color: activeLang === lang ? '#fff' : '#8b95a5',
                      background: activeLang === lang ? 'linear-gradient(135deg, #7AC90E, #01A532)' : 'transparent',
                    }}>
                      {lang === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
                    </button>
                  ))}
                </div>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                    border: '1px solid #253045', backgroundColor: 'transparent', color: '#7AC90E', cursor: 'pointer',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Edit Section
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={handleCancel} style={{ padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: '1px solid #253045', backgroundColor: 'transparent', color: '#8b95a5', cursor: 'pointer' }}>
                      Cancel
                    </button>
                    <button onClick={handleSave} style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                      border: 'none', background: 'linear-gradient(135deg, #7AC90E, #01A532)', color: '#fff', cursor: 'pointer', boxShadow: '0 2px 10px rgba(1,165,50,0.25)',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12" /></svg>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {fields.map((field) => (
                  <div key={field.key} style={{
                    padding: '14px 16px', borderRadius: '10px',
                    backgroundColor: isEditing ? '#151b23' : 'transparent',
                    border: isEditing ? '1px solid #253045' : '1px solid transparent',
                  }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '8px' }}>
                      {field.label}
                      <span style={{ marginLeft: '8px', fontSize: '10px', color: '#3d4a5c', fontWeight: 400, textTransform: 'none', letterSpacing: '0' }}>
                        {field.type === 'textarea' ? '• Multi-line' : field.type === 'number' ? '• Number' : '• Text'}
                      </span>
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea value={activeLang === 'en' ? field.valueEn : field.valueFr} onChange={(e) => handleFieldChange(field.key, e.target.value)} disabled={!isEditing} rows={3}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#ecf0f5', outline: 'none', resize: 'none', backgroundColor: isEditing ? '#0d1117' : 'transparent', border: isEditing ? '1px solid #253045' : '1px solid transparent', opacity: isEditing ? 1 : 0.7 }} />
                    ) : (
                      <input type="text" value={activeLang === 'en' ? field.valueEn : field.valueFr} onChange={(e) => handleFieldChange(field.key, e.target.value)} disabled={!isEditing}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', color: '#ecf0f5', outline: 'none', backgroundColor: isEditing ? '#0d1117' : 'transparent', border: isEditing ? '1px solid #253045' : '1px solid transparent', opacity: isEditing ? 1 : 0.7 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContentManager() {
  const [sections, setSections] = useState<ContentSection[]>(() => getContentSections());

  const handleSave = (sectionId: string, fields: ContentField[]) => {
    const updated = sections.map((s) => (s.id === sectionId ? { ...s, fields } : s));
    setSections(updated);
    saveContentSections(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>Content Manager</h1>
          <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>Edit text content across all sections of your website.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', backgroundColor: '#1c2432', border: '1px solid #253045', fontSize: '12px', color: '#5c6878' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
          {sections.length} Sections · {sections.reduce((n, s) => n + s.fields.length, 0)} Fields
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sections.map((section, i) => (
          <SectionEditor key={section.id} section={section} index={i} onSave={(fields) => handleSave(section.id, fields)} />
        ))}
      </div>
    </div>
  );
}
