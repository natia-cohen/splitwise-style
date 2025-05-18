import { useState } from "react"
import type { Group } from "../models/group.model"

interface GroupHeaderProps {
  group: Group
  onAddExpenseClick: () => void
  onDeleteGroup: (groupId: string) => void
}

export function GroupHeader({
  group,
  onAddExpenseClick,
  onDeleteGroup,
}: GroupHeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  if (!group) return <div className="group-header">Loading...</div>
  return (
    <header className="group-header">
      <div className="group-header-main">
        <div className="group-header-avatar">
          <img
            src="https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-teal37-house-100px.png"
            alt="Group"
          />
        </div>
        <div className="group-header-info">
          <h1>{group.title}</h1>
          <h2>{group.members.length} people</h2>
        </div>
      </div>
      <div className="group-header-actions">
        <button className="add-expense-btn" onClick={onAddExpenseClick}>
          Add an expense
        </button>
        <button
          className="delete-group-btn"
          onClick={() => setShowConfirm(true)}
        >
          Delete group
        </button>
      </div>

      {showConfirm && (
        <div className="confirm-dialog">
          <div className="confirm-dialog-content">
            <div style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: 16 }}>
              Are you sure you want to delete this group?
            </div>
            <div className="confirm-dialog-actions">
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  background: "#f5f5f5", color: "#222", border: "none",
                  borderRadius: "1.5rem", padding: "9px 28px", fontWeight: 500, fontSize: "1rem", cursor: "pointer",
                }}>
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={() => {
                  setShowConfirm(false)
                  onDeleteGroup(group._id)
                }}
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


// import { useState } from "react"
// import type { Group } from "../models/group.model"

// interface GroupHeaderProps {
//   group: Group
//   onAddExpenseClick: () => void
//   onDeleteGroup: (groupId: string) => void
// }

// export function GroupHeader({
//   group,
//   onAddExpenseClick,
//   onDeleteGroup,
// }: GroupHeaderProps) {
//   const [showConfirm, setShowConfirm] = useState(false)

//   if (!group) return <div className="group-header">Loading...</div>
//   return (
//     <header className="group-header">
//       <div className="group-header-avatar">
//         <img
//           src="https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-teal37-house-100px.png"
//           alt="Group"
//         />
//       </div>
//       <div className="group-header-info">
//         <h1>{group.title}</h1>
//         <h2>{group.members.length} people</h2>
//       </div>
//       <div className="group-header-actions">
//         <button className="add-expense-btn" onClick={onAddExpenseClick}>
//           Add an expense
//         </button>
//         <button
//           className="delete-group-btn"
//           onClick={() => setShowConfirm(true)}
//           style={{
//             background: "#ffe3e3",
//             color: "#c62828",
//             borderRadius: "2rem",
//             marginLeft: "10px",
//             border: "none",
//             padding: "9px 22px",
//             fontWeight: 500,
//             cursor: "pointer",
//             transition: "background 0.15s",
//           }}
//         >
//           Delete group
//         </button>
//       </div>

//       {showConfirm && (
//         <div className="confirm-dialog" style={{
//           position: "fixed",
//           left: 0, top: 0, right: 0, bottom: 0,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           background: "rgba(0,0,0,0.10)", zIndex: 2000,
//         }}>
//           <div style={{
//             background: "#fff",
//             borderRadius: 10,
//             boxShadow: "0 2px 16px #0002",
//             padding: "30px 30px 18px 30px",
//             minWidth: 320,
//             textAlign: "center",
//           }}>
//             <div style={{ fontWeight: 600, fontSize: "1.15rem", marginBottom: 16 }}>
//               Are you sure you want to delete this group?
//             </div>
//             <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 style={{
//                   background: "#f5f5f5", color: "#222", border: "none",
//                   borderRadius: "1.5rem", padding: "9px 28px", fontWeight: 500, fontSize: "1rem", cursor: "pointer",
//                 }}>
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   setShowConfirm(false)
//                   onDeleteGroup(group._id)
//                 }}
//                 style={{
//                   background: "#ffe3e3", color: "#c62828", border: "none",
//                   borderRadius: "1.5rem", padding: "9px 28px", fontWeight: 500, fontSize: "1rem", cursor: "pointer",
//                 }}>
//                 Yes, delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


