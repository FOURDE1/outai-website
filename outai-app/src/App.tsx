import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CmsProvider, useSiteSettings } from '@/contexts/CmsContext';
import { SmoothScroll, ScrollProgress } from '@/components/common';
import logoImage from '@/assets/common/logo.png';

const Home = lazy(() => import('@/pages/Home'));
const LastMileB2B = lazy(() => import('@/pages/LastMileB2B'));

/* ── Admin (lazy-loaded) ── */
const AdminLogin = lazy(() => import('@/admin/pages/AdminLogin'));
const AdminLayout = lazy(() => import('@/admin/components/layout/AdminLayout'));
const DashboardOverview = lazy(() => import('@/admin/pages/DashboardOverview'));
const ContentManager = lazy(() => import('@/admin/pages/ContentManager'));
const BlogManager = lazy(() => import('@/admin/pages/BlogManager'));
const FAQManager = lazy(() => import('@/admin/pages/FAQManager'));
const ServiceManager = lazy(() => import('@/admin/pages/ServiceManager'));
const SettingsManager = lazy(() => import('@/admin/pages/SettingsManager'));

import { AdminAuthProvider } from '@/admin/contexts/AuthContext';
import ProtectedRoute from '@/admin/guards/ProtectedRoute';


function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 rounded-full border-4 border-primary-start/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-start animate-spin" />
        </div>
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    </div>
  );
}

function MaintenancePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f1419', padding: '24px', fontFamily: '"Roboto", sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <img src={logoImage} alt="OUTAI" style={{ width: '120px', margin: '0 auto 32px', display: 'block' }} />
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(122,201,14,0.15), rgba(1,165,50,0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7AC90E" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
        </div>
        <h1 style={{ color: '#ecf0f5', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Under Maintenance</h1>
        <p style={{ color: '#8b95a5', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>We're currently performing scheduled maintenance to improve your experience. We'll be back online shortly. Thank you for your patience.</p>
        <div style={{ padding: '12px 20px', borderRadius: '12px', backgroundColor: 'rgba(122,201,14,0.08)', border: '1px solid rgba(122,201,14,0.2)', color: '#7AC90E', fontSize: '13px', fontWeight: 500 }}>If you are an admin, go to <a href="/admin" style={{ color: '#7AC90E', textDecoration: 'underline' }}>/admin</a></div>
      </div>
    </div>
  );
}

function MaintenanceGate({ children }: { children: React.ReactNode }) {
  const settings = useSiteSettings();
  const isAdmin = window.location.pathname.startsWith('/admin');
  if (settings.maintenanceMode && !isAdmin) return <MaintenancePage />;
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CmsProvider>
          <SmoothScroll>
            <Router>
              <ScrollProgress />
              <Suspense fallback={<PageLoader />}>
                <MaintenanceGate>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/last-mile-b2b" element={<LastMileB2B />} />

                    {/* ── Admin routes ── */}
                    <Route path="/admin/*" element={
                      <AdminAuthProvider>
                        <Routes>
                          <Route path="login" element={<AdminLogin />} />
                          <Route element={<ProtectedRoute />}>
                            <Route element={<AdminLayout />}>
                              <Route index element={<DashboardOverview />} />
                              <Route path="content" element={<ContentManager />} />
                              <Route path="blog" element={<BlogManager />} />
                              <Route path="faq" element={<FAQManager />} />
                              <Route path="services" element={<ServiceManager />} />
                              <Route path="settings" element={<SettingsManager />} />
                            </Route>
                          </Route>
                        </Routes>
                      </AdminAuthProvider>
                    } />

                    <Route path="*" element={<Home />} />
                  </Routes>
                </MaintenanceGate>
              </Suspense>
            </Router>
          </SmoothScroll>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-bg-secondary)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border)',
              },
              success: {
                iconTheme: {
                  primary: '#01A532',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: 'white',
                },
              },
            }}
          />
        </CmsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
