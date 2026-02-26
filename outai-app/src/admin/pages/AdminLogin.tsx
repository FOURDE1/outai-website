import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useAdminAuth } from '@/admin/contexts/AuthContext';
import logoImage from '@/assets/common/logo.png';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

const inputBase: React.CSSProperties = {
  width: '100%',
  paddingLeft: '44px',
  paddingRight: '16px',
  paddingTop: '13px',
  paddingBottom: '13px',
  borderRadius: '12px',
  fontSize: '14px',
  color: '#ecf0f5',
  backgroundColor: '#0f1419',
  border: '1px solid #253045',
  outline: 'none',
  fontFamily: '"Inter", sans-serif',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#8b95a5',
  marginBottom: '8px',
};

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Force dark theme for admin login
  useEffect(() => {
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'dark');
    return () => {
      if (prevTheme) html.setAttribute('data-theme', prevTheme);
      else html.removeAttribute('data-theme');
    };
  }, []);

  if (isAuthenticated) {
    navigate('/admin', { replace: true });
    return null;
  }

  const onSubmit = async (data: LoginForm) => {
    setError('');
    const result = await login(data);
    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setError(result.error ?? 'Login failed');
    }
  };

  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focusedField === field ? '#7AC90E' : '#253045',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(122, 201, 14, 0.15)' : 'none',
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#0f1419',
      fontFamily: '"Inter", sans-serif',
    }}>
      {/* Background decorative elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-160px', right: '-160px', width: '384px', height: '384px',
          borderRadius: '50%', opacity: 0.07,
          background: 'radial-gradient(circle, #7AC90E, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-160px', left: '-160px', width: '384px', height: '384px',
          borderRadius: '50%', opacity: 0.05,
          background: 'radial-gradient(circle, #01A532, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%', opacity: 0.03,
          background: 'radial-gradient(circle, #7AC90E, transparent 60%)',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}
      >
        {/* Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ display: 'inline-block', marginBottom: '20px' }}
          >
            <img src={logoImage} alt="OUTAI" style={{ height: 'auto', width: '112px', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
          </motion.div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#ecf0f5', letterSpacing: '-0.01em', margin: 0, fontFamily: '"Sulphur Point", sans-serif' }}>
            Admin Panel
          </h1>
          <p style={{ fontSize: '14px', color: '#8b95a5', marginTop: '6px' }}>
            Sign in to manage your website
          </p>
        </div>

        {/* Login Card */}
        <div style={{
          borderRadius: '16px',
          padding: '32px',
          backgroundColor: '#1c2432',
          border: '1px solid #253045',
          boxShadow: '0 22px 30px -5px rgb(0 0 0 / 0.4), 0 8px 12px -6px rgb(0 0 0 / 0.35), 0 0 40px rgba(122, 201, 14, 0.04)',
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: '20px', padding: '12px 14px', borderRadius: '12px',
                  fontSize: '13px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5c6878', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@outai.com"
                  {...register('email')}
                  style={getInputStyle('email')}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {errors.email && (
                <p style={{ marginTop: '6px', fontSize: '12px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label htmlFor="password" style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#5c6878', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  style={getInputStyle('password')}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              {errors.password && (
                <p style={{ marginTop: '6px', fontSize: '12px', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                background: 'linear-gradient(107deg, rgba(122, 201, 14, 1) 0%, rgba(1, 165, 50, 1) 76%)',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.5 : 1,
                boxShadow: '0 4px 14px rgba(1, 165, 50, 0.25)',
                transition: 'box-shadow 0.2s, transform 0.1s',
                fontFamily: '"Inter", sans-serif',
              }}
              onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.boxShadow = '0 0 24px rgba(122, 201, 14, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(1, 165, 50, 0.25)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isSubmitting ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid #fff', borderRadius: '50%',
                    animation: 'spin 1s linear infinite', display: 'inline-block',
                  }} />
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Dev hint */}
          <div style={{ marginTop: '24px', paddingTop: '20px', textAlign: 'center', borderTop: '1px solid #253045' }}>
            <p style={{ fontSize: '11px', color: '#5c6878', lineHeight: 1.7, margin: 0 }}>
              Dev credentials:{' '}
              <span style={{ fontFamily: 'monospace', color: '#7AC90E', fontWeight: 500 }}>admin@outai.com</span>
              {' / '}
              <span style={{ fontFamily: 'monospace', color: '#7AC90E', fontWeight: 500 }}>admin123</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#5c6878', marginTop: '24px', opacity: 0.6 }}>
          © {new Date().getFullYear()} OUTAI Transportation. All rights reserved.
        </p>
      </motion.div>

      {/* Spinner keyframe animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
