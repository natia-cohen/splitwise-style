export function AppHeader() {
  return (
    <header className="app-header full">
      <div className="app-header-content">
        <span className="logo">Splitwise</span>
        <div className="user-section">
          <img
            className="user-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User avatar"
          />
          <span className="user-name">John Doe</span>
        </div>
      </div>
    </header>
  )
}


