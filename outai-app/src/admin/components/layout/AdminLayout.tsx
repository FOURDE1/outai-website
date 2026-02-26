import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import '@/admin/admin.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Force dark theme for admin panel — restore user's theme on unmount
  useEffect(() => {
    const html = document.documentElement;
    const prevTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', 'dark');
    return () => {
      if (prevTheme) {
        html.setAttribute('data-theme', prevTheme);
      } else {
        html.removeAttribute('data-theme');
      }
    };
  }, []);

  return (
    <div
      className="admin-theme"
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0f1419',
        color: '#ecf0f5',
      }}
    >
      {/* Sidebar — fixed width, never collapses on desktop */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right column — fills remaining width */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        <AdminTopbar onMenuToggle={() => setSidebarOpen((o) => !o)} />

        {/* Main content area */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '24px',
            backgroundColor: '#0f1419',
          }}
        >
          <Outlet />
        </main>

        {/* Status bar */}
        <footer
          style={{
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            fontSize: '11px',
            color: '#5c6878',
            borderTop: '1px solid #253045',
            backgroundColor: '#151b23',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-heading)' }}>OUTAI Admin Dashboard</span>
          <span style={{ fontFamily: 'monospace' }}>v0.1.0</span>
        </footer>
      </div>
    </div>
  );
}
