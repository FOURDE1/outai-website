import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MOCK_STATS, MOCK_ACTIVITY, MOCK_CHART_DATA } from '@/admin/data/mockData';
import type { StatCard } from '@/types/admin';

function StatIcon({ name }: { name: string }) {
  const map: Record<string, React.ReactNode> = {
    users: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    inbox: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 16,12 14,15 10,15 8,12 2,12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    'file-text': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    briefcase: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  };
  return <>{map[name] ?? null}</>;
}

const STAT_COLORS = [
  { bg: 'rgba(122, 201, 14, 0.08)', text: '#7AC90E', shadow: 'rgba(122, 201, 14, 0.15)' },
  { bg: 'rgba(59, 130, 246, 0.08)', text: '#3B82F6', shadow: 'rgba(59, 130, 246, 0.15)' },
  { bg: 'rgba(168, 85, 247, 0.08)', text: '#A855F7', shadow: 'rgba(168, 85, 247, 0.15)' },
  { bg: 'rgba(249, 115, 22, 0.08)', text: '#F97316', shadow: 'rgba(249, 115, 22, 0.15)' },
];

function StatCardComponent({ stat, index }: { stat: StatCard; index: number }) {
  const color = STAT_COLORS[index % STAT_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      style={{
        backgroundColor: '#1c2432',
        border: '1px solid #253045',
        borderRadius: '14px',
        padding: '20px',
        transition: 'all 0.3s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5c6878', marginBottom: '6px' }}>{stat.label}</p>
          <p style={{ fontSize: '28px', fontWeight: 700, color: '#ecf0f5', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
            {stat.value}
          </p>
        </div>
        <div
          style={{ padding: '10px', borderRadius: '10px', backgroundColor: color.bg, color: color.text }}
        >
          <StatIcon name={stat.icon} />
        </div>
      </div>
      {stat.change && (
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #253045' }}>
          <p style={{
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: stat.changeType === 'positive' ? '#34d399' : stat.changeType === 'negative' ? '#f87171' : '#5c6878',
          }}>
            {stat.changeType === 'positive' && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
            )}
            {stat.changeType === 'negative' && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23,18 13.5,8.5 8.5,13.5 1,6" /><polyline points="17,18 23,18 23,12" /></svg>
            )}
            {stat.change}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function DashboardOverview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#ecf0f5', letterSpacing: '-0.01em', fontFamily: 'var(--font-heading)' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '13px', color: '#8b95a5', marginTop: '4px' }}>
          Welcome back. Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Stat cards — 2 cols default, 4 on large screens */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {MOCK_STATS.map((stat, i) => (
          <StatCardComponent key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Chart + Activity row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="xl:!grid-cols-[2fr_1fr]">
        {/* Traffic chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            backgroundColor: '#1c2432',
            border: '1px solid #253045',
            borderRadius: '14px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#ecf0f5' }}>Traffic Overview</h2>
              <p style={{ fontSize: '11px', color: '#5c6878', marginTop: '2px' }}>Last 30 days</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#5c6878' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7AC90E', display: 'inline-block' }} />
                Visitors
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#01A532', opacity: 0.5, display: 'inline-block' }} />
                Page Views
              </span>
            </div>
          </div>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7AC90E" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#7AC90E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#01A532" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#01A532" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#253045" strokeOpacity={0.5} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5c6878' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 11, fill: '#5c6878' }} tickLine={false} axisLine={false} width={40} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1117',
                    border: '1px solid #253045',
                    borderRadius: 10,
                    fontSize: 12,
                    color: '#ecf0f5',
                    padding: '8px 12px',
                  }}
                  cursor={{ stroke: '#253045', strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#7AC90E" strokeWidth={2.5} fill="url(#visitorsGrad)" dot={false} activeDot={{ r: 5, strokeWidth: 2, fill: '#7AC90E' }} />
                <Area type="monotone" dataKey="pageViews" stroke="#01A532" strokeWidth={2} fill="url(#pageViewsGrad)" dot={false} strokeDasharray="6 3" activeDot={{ r: 4, strokeWidth: 2, fill: '#01A532' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            backgroundColor: '#1c2432',
            border: '1px solid #253045',
            borderRadius: '14px',
            padding: '20px',
          }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#ecf0f5', marginBottom: '16px' }}>
            Recent Activity
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_ACTIVITY.map((item, idx) => (
              <li key={item.id} style={{ display: 'flex', gap: '10px', position: 'relative' }}>
                {idx < MOCK_ACTIVITY.length - 1 && (
                  <div style={{ position: 'absolute', left: '5px', top: '16px', width: '1px', height: 'calc(100% + 8px)', backgroundColor: '#253045' }} />
                )}
                <div style={{ marginTop: '4px', width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#7AC90E', flexShrink: 0, boxShadow: '0 0 0 4px #1c2432', position: 'relative', zIndex: 1 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', color: '#ecf0f5', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 600 }}>{item.user}</span>{' '}
                    <span style={{ color: '#8b95a5' }}>{item.action}</span>{' '}
                    <span style={{ fontWeight: 600 }}>{item.target}</span>
                  </p>
                  <p style={{ fontSize: '11px', color: '#5c6878', marginTop: '2px' }}>{item.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          backgroundColor: '#1c2432',
          border: '1px solid #253045',
          borderRadius: '14px',
          padding: '20px',
        }}
      >
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#ecf0f5', marginBottom: '14px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <a
            href="/admin/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #7AC90E, #01A532)',
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(1,165,50,0.2)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Blog Post
          </a>
          <a
            href="/admin/content"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ecf0f5',
              border: '1px solid #253045',
              textDecoration: 'none',
              backgroundColor: 'transparent',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
            Edit Content
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#ecf0f5',
              border: '1px solid #253045',
              textDecoration: 'none',
              backgroundColor: 'transparent',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            View Live Site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
