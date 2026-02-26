import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getSettings, saveSettings, resetAllCmsData } from '@/lib/cmsStore';
import { useAdminAuth } from '@/admin/contexts/AuthContext';
import type { SiteSettings } from '@/types/admin';

/* ── Shared styles ── */
const btnPrimary: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: 600, border: 'none', color: '#fff', cursor: 'pointer',
  background: 'linear-gradient(135deg, #7AC90E, #01A532)', boxShadow: '0 2px 12px rgba(1,165,50,0.25)',
};
const btnOutline: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: 600, border: '1px solid #253045', color: '#8b95a5', backgroundColor: 'transparent', cursor: 'pointer',
};
const btnDanger: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '10px',
  fontSize: '13px', fontWeight: 600, border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', backgroundColor: 'rgba(248,113,113,0.06)', cursor: 'pointer',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
  color: '#ecf0f5', outline: 'none', backgroundColor: '#0d1117', border: '1px solid #253045',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px',
};
const cardStyle: React.CSSProperties = {
  backgroundColor: '#1c2432', border: '1px solid #253045', borderRadius: '14px', padding: '24px',
};

function SectionHeader({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(122,201,14,0.1)', color: '#7AC90E', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#ecf0f5', margin: 0 }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#5c6878', margin: '2px 0 0' }}>{description}</p>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      style={{ width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        backgroundColor: checked ? '#7AC90E' : '#253045' }}>
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '3px',
        left: checked ? '23px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
    </button>
  );
}

export default function SettingsManager() {
  const { user } = useAdminAuth();
  const [form, setForm] = useState<SiteSettings>(() => getSettings());
  const [saved, setSaved] = useState<SiteSettings>(() => getSettings());
  const hasChanges = JSON.stringify(form) !== JSON.stringify(saved);

  const updateField = (key: keyof SiteSettings, value: string | boolean) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = () => { setSaved({ ...form }); saveSettings(form); toast.success('Settings saved successfully'); };
  const handleDiscard = () => { setForm({ ...saved }); toast('Changes discarded', { icon: '↩️' }); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>Settings</h1>
          <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>Configure your website settings and preferences.</p>
        </div>
        {hasChanges && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleDiscard} style={btnOutline}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
              Discard
            </button>
            <button onClick={handleSave} style={btnPrimary}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12" /></svg>
              Save Settings
            </button>
          </div>
        )}
      </div>

      {/* ── General ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={cardStyle}>
        <SectionHeader
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>}
          title="General" description="Basic site information and meta data"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Site Title</label>
            <input type="text" value={form.siteTitle} onChange={(e) => updateField('siteTitle', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Meta Description</label>
            <textarea value={form.metaDescription} onChange={(e) => updateField('metaDescription', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Brief description for SEO..." />
          </div>
        </div>
      </motion.div>

      {/* ── Localization & Appearance ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cardStyle}>
        <SectionHeader
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
          title="Localization & Appearance" description="Language and theme preferences"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Default Language</label>
            <select value={form.defaultLanguage} onChange={(e) => updateField('defaultLanguage', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 French</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Default Theme</label>
            <select value={form.defaultTheme} onChange={(e) => updateField('defaultTheme', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="dark">🌙 Dark</option>
              <option value="light">☀️ Light</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* ── Maintenance ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        style={{ ...cardStyle, border: form.maintenanceMode ? '1px solid rgba(251,191,36,0.3)' : '1px solid #253045' }}>
        <SectionHeader
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>}
          title="Maintenance Mode" description="Enable maintenance mode to temporarily disable the site"
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '10px', backgroundColor: '#0d1117', border: '1px solid #253045' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: form.maintenanceMode ? '#fbbf24' : '#ecf0f5' }}>
              {form.maintenanceMode ? '⚠ Maintenance mode is ON' : 'Site is live and accessible'}
            </span>
          </div>
          <ToggleSwitch checked={form.maintenanceMode} onChange={(v) => updateField('maintenanceMode', v)} />
        </div>
        {form.maintenanceMode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: '12px', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p style={{ fontSize: '12px', color: '#fbbf24', margin: 0, lineHeight: 1.6 }}>
              ⚠ The website is currently in maintenance mode. Visitors will see a maintenance page. Only admins can access the site.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* ── Danger Zone ── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ ...cardStyle, border: '1px solid rgba(248,113,113,0.2)' }}>
        <SectionHeader
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
          title="Danger Zone" description="Irreversible actions — requires super_admin role"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '10px', backgroundColor: '#0d1117', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#ecf0f5', margin: 0 }}>Reset All Content</p>
              <p style={{ fontSize: '11px', color: '#5c6878', margin: '2px 0 0' }}>Restore all content to factory defaults.</p>
            </div>
            <button disabled={user?.role !== 'super_admin'} onClick={() => { if (confirm('This will reset ALL content to defaults. Are you sure?')) { resetAllCmsData(); setForm(getSettings()); setSaved(getSettings()); toast.success('All content reset to defaults'); } }} style={{ ...btnDanger, opacity: user?.role !== 'super_admin' ? 0.4 : 1, cursor: user?.role !== 'super_admin' ? 'not-allowed' : 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1,4 1,10 7,10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
              Reset
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: '10px', backgroundColor: '#0d1117', border: '1px solid rgba(248,113,113,0.15)' }}>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 500, color: '#ecf0f5', margin: 0 }}>Clear Cache</p>
              <p style={{ fontSize: '11px', color: '#5c6878', margin: '2px 0 0' }}>Clear all cached data and regenerate.</p>
            </div>
            <button disabled={user?.role !== 'super_admin'} onClick={() => toast.error('Not available in demo mode')} style={{ ...btnDanger, opacity: user?.role !== 'super_admin' ? 0.4 : 1, cursor: user?.role !== 'super_admin' ? 'not-allowed' : 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              Clear
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sticky save bar */}
      {hasChanges && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ position: 'sticky', bottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderRadius: '14px',
            backgroundColor: 'rgba(28,36,50,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(122,201,14,0.2)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
          <span style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 500 }}>⚠ You have unsaved changes</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleDiscard} style={btnOutline}>Discard</button>
            <button onClick={handleSave} style={btnPrimary}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12" /></svg>
              Save Settings
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
