import { Routes, Route } from "react-router-dom"
import { GroupsPage } from "./pages/GroupsPage"
import { AppHeader } from "./cmps/AppHeader"
import { GroupDetailsPage } from "./pages/GroupDetailsPage"

export function RootCmp() {
  return (
    <div className="main-container">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<GroupsPage />} />
          <Route path="/group/:groupId" element={<GroupDetailsPage />} />
        </Routes>
      </main>
    </div>
  )
}
