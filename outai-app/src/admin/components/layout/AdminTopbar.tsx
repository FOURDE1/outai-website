interface AdminTopbarProps {
  onMenuToggle: () => void;
}

export default function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {

  return (
    <header
      style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        backgroundColor: '#151b23',
        borderBottom: '1px solid #1e2a3a',
      }}
    >
      {/* Left: hamburger + search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onMenuToggle}
          className="lg:hidden"
          style={{
            padding: '8px',
            borderRadius: '8px',
            color: '#8b95a5',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Search bar */}
        <div
          className="hidden sm:flex"
          style={{
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            borderRadius: '10px',
            width: '260px',
            backgroundColor: '#0d1117',
            border: '1px solid #253045',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5c6878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            style={{
              backgroundColor: 'transparent',
              fontSize: '13px',
              color: '#ecf0f5',
              outline: 'none',
              border: 'none',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* View site link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex"
          style={{
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#8b95a5',
            border: '1px solid #253045',
            textDecoration: 'none',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Site
        </a>

        {/* Notifications bell */}
        <button
          style={{
            position: 'relative',
            padding: '8px',
            borderRadius: '8px',
            color: '#8b95a5',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '7px',
            height: '7px',
            backgroundColor: '#7AC90E',
            borderRadius: '50%',
            border: '2px solid #151b23',
          }} />
        </button>
      </div>
    </header>
  );
}
