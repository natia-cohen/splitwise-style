import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadGroups,addGroupAction } from "../store/actions/group.actions"
import { GroupList } from "../cmps/GroupList"
import { AddGroupDialog } from "../cmps/AddGroupDialog"
import type { Group } from "../models/group.model"


export function GroupsPage() {
  const groups = useSelector((state: any) => state.groupModule.groups)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    loadGroups()
  }, [])

  function handleOpenAddDialog() {
    setIsAddDialogOpen(true)
  }

  function handleCloseAddDialog() {
    setIsAddDialogOpen(false)
  }

  async function handleAddGroup(newGroup: Group) {
    await addGroupAction(newGroup)
    setIsAddDialogOpen(false)
  }

  return (
    <main className="groups-page">
      <button className="add-group-btn" onClick={handleOpenAddDialog}>
        + Add Group
      </button>
      <GroupList groups={groups} />
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
