import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { getBlogPosts, saveBlogPosts, fileToBase64, saveImage, getImage } from '@/lib/cmsStore';
import type { BlogPost, BlogStatus } from '@/types/admin';

const STATUS_MAP: Record<BlogStatus, { color: string; bg: string; border: string }> = {
  published: { color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  draft: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
  archived: { color: '#5c6878', bg: '#0d1117', border: '#253045' },
};

/* ── Shared button styles ── */
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
  borderRadius: '8px', border: '1px solid #253045', backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
};

function BlogEditor({ post, onSave, onCancel }: { post: BlogPost | null; onSave: (post: BlogPost) => void; onCancel: () => void }) {
  const isNew = !post;
  const [activeLang, setActiveLang] = useState<'en' | 'fr'>('en');
  const [form, setForm] = useState<BlogPost>(
    post ?? { id: Date.now().toString(), titleEn: '', titleFr: '', excerptEn: '', excerptFr: '', contentEn: '', contentFr: '', coverImageUrl: '', isFeatured: false, status: 'draft', publishedAt: '', author: 'Admin OUTAI', createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }
  );
  const [imagePreview, setImagePreview] = useState<string | null>(() => getImage(`blog_cover_${post?.id}`));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateField = (key: keyof BlogPost, value: string | boolean) => setForm((p) => ({ ...p, [key]: value }));
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    const base64 = await fileToBase64(file);
    const imgKey = `blog_cover_${form.id}`;
    saveImage(imgKey, base64);
    setImagePreview(base64);
    updateField('coverImageUrl', imgKey);
    toast.success('Cover image uploaded');
  };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...form, updatedAt: new Date().toISOString().split('T')[0] }); toast.success(isNew ? 'Blog post created' : 'Blog post updated'); };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', color: '#ecf0f5', outline: 'none', backgroundColor: '#0d1117', border: '1px solid #253045' };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      style={{ backgroundColor: '#1c2432', border: '1px solid rgba(122,201,14,0.2)', borderRadius: '14px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>
          {isNew ? '✦ New Blog Post' : '✎ Edit Blog Post'}
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
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px' }}>Title</label>
          <input type="text" value={activeLang === 'en' ? form.titleEn : form.titleFr} onChange={(e) => updateField(activeLang === 'en' ? 'titleEn' : 'titleFr', e.target.value)} style={inputStyle} placeholder="Enter blog post title..." required />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px' }}>Excerpt</label>
          <textarea value={activeLang === 'en' ? form.excerptEn : form.excerptFr} onChange={(e) => updateField(activeLang === 'en' ? 'excerptEn' : 'excerptFr', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'none' }} placeholder="Short summary..." />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px' }}>Content</label>
          <textarea value={activeLang === 'en' ? form.contentEn : form.contentFr} onChange={(e) => updateField(activeLang === 'en' ? 'contentEn' : 'contentFr', e.target.value)} rows={8} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write your blog post content..." />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px' }}>Cover Image</label>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            {imagePreview ? (
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #253045' }}>
                <img src={imagePreview} alt="Cover" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}>
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)', color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', cursor: 'pointer' }}>Change</button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '120px', borderRadius: '10px', border: '2px dashed #253045', backgroundColor: '#0d1117', color: '#5c6878', fontSize: '13px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                Click to upload cover image
              </button>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878', marginBottom: '6px' }}>Status</label>
            <select value={form.status} onChange={(e) => updateField('status', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField('isFeatured', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#7AC90E' }} />
          <span style={{ fontSize: '13px', color: '#8b95a5' }}>Featured post</span>
        </label>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
          <button type="submit" style={btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20,6 9,17 4,12" /></svg>
            {isNew ? 'Create Post' : 'Save Changes'}
          </button>
          <button type="button" onClick={onCancel} style={btnOutline}>Cancel</button>
        </div>
      </form>
    </motion.div>
  );
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [editingPost, setEditingPost] = useState<BlogPost | null | 'new'>(null);

  const handleSave = (post: BlogPost) => {
    const updated = (() => { const ex = posts.find((p) => p.id === post.id); return ex ? posts.map((p) => (p.id === post.id ? post : p)) : [...posts, post]; })();
    setPosts(updated);
    saveBlogPosts(updated);
    setEditingPost(null);
  };
  const handleDelete = (id: string) => { if (!confirm('Are you sure you want to delete this post?')) return; const updated = posts.filter((p) => p.id !== id); setPosts(updated); saveBlogPosts(updated); toast.success('Blog post deleted'); };

  if (editingPost !== null) {
    return (
      <AnimatePresence mode="wait">
        <BlogEditor key={editingPost === 'new' ? 'new' : editingPost.id} post={editingPost === 'new' ? null : editingPost} onSave={handleSave} onCancel={() => setEditingPost(null)} />
      </AnimatePresence>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', fontFamily: 'var(--font-heading)', margin: 0 }}>Blog Manager</h1>
          <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>Create, edit and manage your blog posts.</p>
        </div>
        <button onClick={() => setEditingPost('new')} style={btnPrimary}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          New Post
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#1c2432', border: '1px solid #253045', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #253045', backgroundColor: '#151b23' }}>
                <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878' }}>Author</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#5c6878' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => {
                const st = STATUS_MAP[post.status];
                return (
                  <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: i < posts.length - 1 ? '1px solid #253045' : 'none' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 500, color: '#ecf0f5' }}>{post.titleEn}</span>
                        {post.isFeatured && (
                          <span style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 600, backgroundColor: 'rgba(122,201,14,0.1)', color: '#7AC90E' }}>
                            ★ Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, color: st.color, backgroundColor: st.bg, border: `1px solid ${st.border}` }}>
                        {post.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#5c6878', fontSize: '12px' }}>{post.publishedAt || post.createdAt}</td>
                    <td style={{ padding: '14px 16px', color: '#5c6878', fontSize: '12px' }}>{post.author}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <button onClick={() => setEditingPost(post)} style={{ ...btnIcon, color: '#7AC90E' }} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(post.id)} style={{ ...btnIcon, color: '#f87171' }} title="Delete">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {posts.length === 0 && (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: '#5c6878', fontSize: '13px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#253045" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
            <p>No blog posts yet. Click <strong style={{ color: '#7AC90E' }}>New Post</strong> to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
