import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '@/admin/contexts/AuthContext';
import logoImage from '@/assets/common/logo.png';
import type { AdminNavItem } from '@/types/admin';

const LANDING_NAV_ITEMS: AdminNavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'grid', href: '/admin' },
  { id: 'content', label: 'Content', icon: 'edit', href: '/admin/content' },
  { id: 'blog', label: 'Blog', icon: 'file-text', href: '/admin/blog' },
  { id: 'faq', label: 'FAQ', icon: 'help-circle', href: '/admin/faq' },
  { id: 'services', label: 'Services', icon: 'briefcase', href: '/admin/services' },
  { id: 'settings', label: 'Settings', icon: 'settings', href: '/admin/settings', requiredRole: 'super_admin' },
];

const APP_NAV_ITEMS = [
  { id: 'app-dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'users', label: 'Users', icon: 'users' },
  { id: 'rides', label: 'Rides', icon: 'car' },
  { id: 'captains', label: 'Captains', icon: 'shield' },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart' },
  { id: 'app-settings', label: 'Settings', icon: 'settings' },
];

function SidebarIcon({ name }: { name: string }) {
  const s = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const iconMap: Record<string, React.ReactNode> = {
    grid: <svg {...s}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    edit: <svg {...s}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    'file-text': <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    'help-circle': <svg {...s}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    briefcase: <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
    settings: <svg {...s}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    users: <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    car: <svg {...s}><path d="M16 6l3 4H5l3-4h8zM5 10v7a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-7" /><circle cx="7.5" cy="13" r="0.5" fill="currentColor" /><circle cx="16.5" cy="13" r="0.5" fill="currentColor" /></svg>,
    shield: <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    'bar-chart': <svg {...s}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>,
  };
  return <>{iconMap[name] ?? null}</>;
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { user, logout } = useAdminAuth();
  const [wsOpen, setWsOpen] = useState(false);
  const [workspace, setWorkspace] = useState<'landing' | 'app'>('landing');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!wsOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [wsOpen]);

  const navItems = workspace === 'landing' ? LANDING_NAV_ITEMS : [];
  const visibleItems = navItems.filter(
    (item) => !item.requiredRole || item.requiredRole === user?.role
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 40,
          }}
          className="lg:hidden"
        />
      )}

      <aside
        style={{
          width: '240px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0d1117',
          borderRight: '1px solid #1e2a3a',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease',
        }}
        className={`
          max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-50 max-lg:h-full
          ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        {/* Logo area + workspace switcher */}
        <div
          ref={dropdownRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0 16px',
            height: '60px',
            borderBottom: '1px solid #1e2a3a',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <img src={logoImage} alt="OUTAI" style={{ width: '72px', height: 'auto', objectFit: 'contain', flexShrink: 0 }} />
          <div style={{ width: '1px', height: '20px', backgroundColor: '#253045', flexShrink: 0 }} />
          <button
            onClick={() => setWsOpen((o) => !o)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: wsOpen ? '#1e2a3a' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '5px 8px',
              borderRadius: '6px',
              transition: 'background 0.2s',
              minWidth: 0,
            }}
            onMouseEnter={(e) => { if (!wsOpen) e.currentTarget.style.background = '#1e2a3a'; }}
            onMouseLeave={(e) => { if (!wsOpen) e.currentTarget.style.background = 'transparent'; }}
          >
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#8b95a5',
                fontFamily: 'var(--font-heading)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {workspace === 'landing' ? 'Landing Page' : 'App Admin'}
            </span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5c6878"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, transform: wsOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>

          {/* Workspace dropdown */}
          {wsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '56px',
                left: '12px',
                right: '12px',
                backgroundColor: '#151b23',
                border: '1px solid #253045',
                borderRadius: '10px',
                padding: '6px',
                zIndex: 100,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              {/* Landing Page option */}
              <button
                onClick={() => { setWorkspace('landing'); setWsOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: workspace === 'landing' ? 'rgba(122, 201, 14, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (workspace !== 'landing') e.currentTarget.style.background = '#1e2a3a'; }}
                onMouseLeave={(e) => { if (workspace !== 'landing') e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #7AC90E, #01A532)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: workspace === 'landing' ? '#7AC90E' : '#ecf0f5' }}>Landing Page</div>
                  <div style={{ fontSize: '10px', color: '#5c6878', marginTop: 1 }}>Website content & settings</div>
                </div>
                {workspace === 'landing' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7AC90E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </button>

              <div style={{ height: '1px', backgroundColor: '#1e2a3a', margin: '4px 8px' }} />

              {/* App Administration option */}
              <button
                onClick={() => { setWorkspace('app'); setWsOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: workspace === 'app' ? 'rgba(122, 201, 14, 0.1)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (workspace !== 'app') e.currentTarget.style.background = '#1e2a3a'; }}
                onMouseLeave={(e) => { if (workspace !== 'app') e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#253045', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b95a5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: workspace === 'app' ? '#7AC90E' : '#ecf0f5' }}>App Administration</div>
                  <div style={{ fontSize: '10px', color: '#5c6878', marginTop: 1 }}>Application & user management</div>
                </div>
                {workspace === 'app' && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7AC90E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          <p
            style={{
              padding: '0 12px',
              marginBottom: '8px',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#5c6878',
            }}
          >
            {workspace === 'landing' ? 'Menu' : 'App Menu'}
          </p>

          {workspace === 'landing' ? (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {visibleItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    end={item.href === '/admin'}
                    onClick={onClose}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      color: isActive ? '#fff' : '#8b95a5',
                      background: isActive ? 'linear-gradient(135deg, #7AC90E, #01A532)' : 'transparent',
                      boxShadow: isActive ? '0 2px 12px rgba(1,165,50,0.3)' : 'none',
                    })}
                  >
                    <SidebarIcon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {APP_NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#5c6878',
                      cursor: 'default',
                    }}
                  >
                    <SidebarIcon name={item.icon} />
                    <span>{item.label}</span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '9px',
                        fontWeight: 600,
                        color: '#3a4a5c',
                        backgroundColor: '#1e2a3a',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Soon
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* User section at bottom */}
        <div style={{ padding: '16px', flexShrink: 0, borderTop: '1px solid #1e2a3a' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              backgroundColor: '#151b23',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7AC90E, #01A532)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {user?.fullName?.charAt(0) ?? 'U'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#ecf0f5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.fullName}
              </p>
              <p style={{ fontSize: '11px', color: '#5c6878', textTransform: 'capitalize' }}>
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#8b95a5',
              border: '1px solid #253045',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = '#f8717133'; e.currentTarget.style.backgroundColor = '#f8717110'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8b95a5'; e.currentTarget.style.borderColor = '#253045'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
