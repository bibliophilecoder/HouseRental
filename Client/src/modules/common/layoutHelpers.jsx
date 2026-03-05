export function BrandHeader({ userName, onLogout, rightLinks = [] }) {
  return (
    <header className="topbar">
      <h1 className="brand">RentEase</h1>
      <div className="topbar-right">
        {rightLinks.map((link) => (
          <button key={link.label} className={`nav-link ${link.active ? 'active' : ''}`} onClick={link.onClick}>
            {link.label}
          </button>
        ))}
        {userName && <span className="welcome">Hi, {userName}</span>}
        {onLogout && (
          <button className="btn btn-danger" onClick={onLogout}>
            Log Out
          </button>
        )}
      </div>
    </header>
  )
}

export function TabBar({ tabs }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button key={tab.label} className={`tab ${tab.active ? 'active' : ''}`} onClick={tab.onClick}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function ContentShell({ children }) {
  return <div className="content-shell">{children}</div>
}
