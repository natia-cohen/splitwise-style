import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadGroups, addGroupAction } from "../store/actions/group.actions"
import { GroupList } from "../cmps/GroupList"
import { AddGroupDialog } from "../cmps/AddGroupDialog"
import type { Group } from "../models/group.model"

import { Fab } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export function GroupsPage() {
  const groups = useSelector((state: any) => state.groupModule.groups)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    loadGroups()
  }, [])

  function handleOpenAddDialog(): void {
    setIsAddDialogOpen(true)
  }

  function handleCloseAddDialog(): void {
    setIsAddDialogOpen(false)
  }

  async function handleAddGroup(newGroup: Omit<Group, "_id">): Promise<void> {
    try {
      await addGroupAction(newGroup)
      setIsAddDialogOpen(false)
    } catch (err) {
      console.log("Failed to add group:", err)
    }
  }

  return (
    <main className="groups-page">
      <GroupList groups={groups} />
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenAddDialog}
        sx={{
          position: "fixed",
          right: 32,
          bottom: 32,
          zIndex: 1500,
          background: "#eeeeee",
          color: "#1976d2",
          boxShadow: 6,
          "&:hover": {
            background: "#1976d2",
            color: "#eeeeee",
            boxShadow: 8,
          },
        
        }}
      >
        <AddIcon sx={{ fontSize: 30 }} />
      </Fab>
      {isAddDialogOpen && (
        <AddGroupDialog
          isOpen={isAddDialogOpen}
          onClose={handleCloseAddDialog}
          onSave={handleAddGroup}
        />
      )}
    </main>
  )
}

// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { loadGroups,addGroupAction } from "../store/actions/group.actions"
// import { GroupList } from "../cmps/GroupList"
// import { AddGroupDialog } from "../cmps/AddGroupDialog"
// import type { Group } from "../models/group.model"

// export function GroupsPage() {
//   const groups = useSelector((state: any) => state.groupModule.groups)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

//   useEffect(() => {
//     loadGroups()
//   }, [])

//   function handleOpenAddDialog() {
//     setIsAddDialogOpen(true)
//   }

//   function handleCloseAddDialog() {
//     setIsAddDialogOpen(false)
//   }

//   async function handleAddGroup( newGroup: Omit<Group, "_id">) {
//     await addGroupAction(newGroup)
//     setIsAddDialogOpen(false)
//   }

//   return (
//     <main className="groups-page">
//       <button className="add-group-btn" onClick={handleOpenAddDialog}>
//         + Add Group
//       </button>
//       <GroupList groups={groups} />
//       {isAddDialogOpen && (
//         <AddGroupDialog
//           isOpen={isAddDialogOpen}
//           onClose={handleCloseAddDialog}
//           onSave={handleAddGroup}
//         />
//       )}
//     </main>
//   )
// }
