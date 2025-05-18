import { useNavigate } from "react-router-dom"

export function AppHeader() {
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-content">
          <span
            className="logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Splitwise
          </span>
          <div className="user-section">
            <img
              className="user-avatar"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
            />
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  )
}
