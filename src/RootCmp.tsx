import { Routes, Route } from "react-router-dom";
import { GroupsPage } from "./pages/GroupsPage";
import { AppHeader } from "./cmps/AppHeader";


export function RootCmp() {
  return (
    <div className="main-container">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<GroupsPage />} />
        </Routes>
      </main>
    </div>
  );
}
