import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react"
import type { Group, GroupMember } from "../models/group.model"
import { groupService } from "../services/group/group.service"

interface AddGroupDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (group: Omit<Group, "_id">) => void
}

type GroupWithoutId = Omit<Group, "_id">
const MAX_MEMBERS = 10

export function AddGroupDialog({
  isOpen,
  onClose,
  onSave,
}: AddGroupDialogProps) {
  const [newGroup, setNewGroup] = useState<GroupWithoutId>(groupService.getEmptyGroup())
  const [members, setMembers] = useState<GroupMember[]>([])
  const [inputErrors, setInputErrors] = useState<string[]>([])
  const [showMembersInputs, setShowMembersInputs] = useState(false)

  function handleDialogClose() {
    setNewGroup(groupService.getEmptyGroup())
    setMembers([])
    setInputErrors([])
    setShowMembersInputs(false)
    onClose()
  }

  // Show/hide member inputs depending on title
  function handleTitleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value
    setNewGroup(prev => ({
      ...prev,
      title: value,
    }))
    if (value && !showMembersInputs) {
      setMembers([
        groupService.getEmptyMember(),
        groupService.getEmptyMember(),
        groupService.getEmptyMember()
      ])
      setShowMembersInputs(true)
    }
    if (!value && showMembersInputs) {
      setMembers([])
      setShowMembersInputs(false)
    }
  }

  function handleMemberChange(idx: number, name: string) {
    setMembers(prev =>
      prev.map((member, i) =>
        i === idx ? { ...member, name } : member
      )
    )
  }

  function handleAddMember() {
    if (members.length < MAX_MEMBERS) {
      setMembers(prev => [...prev, groupService.getEmptyMember()])
    }
  }

  function handleRemoveMember(idx: number) {
    if (members.length > 1) {
      setMembers(prev => prev.filter((_, i) => i !== idx))
      setInputErrors(prev => prev.filter((_, i) => i !== idx))
    }
  }

  function validateMembers() {
    const errors: string[] = []
    const trimmedNames = members.map(m => m.name.trim())
    members.forEach((member, i) => {
      if (!member.name.trim()) errors[i] = "Name required"
      else if (trimmedNames.indexOf(member.name.trim()) !== i)
        errors[i] = "Duplicate name"
      else errors[i] = ""
    })
    setInputErrors(errors)
    return errors.every(err => !err)
  }

  function handleSave() {
    if (!newGroup.title.trim()) return
    if (!validateMembers()) return
    const validMembers = members.filter(m => m.name.trim())
    onSave({ ...newGroup, members: validMembers })
    handleDialogClose()
  }

  return (
    <Dialog open={isOpen} onClose={handleDialogClose}>
      <DialogTitle>Start a new group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group Title"
          fullWidth
          value={newGroup.title}
          onChange={handleTitleChange}
          autoFocus
          sx={{ mb: 2 }}
        />

        {showMembersInputs && (
          <>
            {members.map((member, idx) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <TextField
                  placeholder={`Member #${idx + 1}`}
                  value={member.name}
                  onChange={e => handleMemberChange(idx, e.target.value)}
                  error={!!inputErrors[idx]}
                  helperText={inputErrors[idx] || ""}
                  fullWidth
                />
                {members.length > 1 && (
                  <IconButton onClick={() => handleRemoveMember(idx)} aria-label="remove" size="small">
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}

            <Button
              onClick={handleAddMember}
              disabled={members.length >= MAX_MEMBERS}
              sx={{ mt: 1 }}
            >
              +
            </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!newGroup.title.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// import Dialog from "@mui/material/Dialog"
// import DialogTitle from "@mui/material/DialogTitle"
// import DialogContent from "@mui/material/DialogContent"
// import DialogActions from "@mui/material/DialogActions"
// import Button from "@mui/material/Button"
// import TextField from "@mui/material/TextField"
// import { useState } from "react"
// import type { Group, GroupMember } from "../models/group.model"
// import { groupService } from "../services/group/group.service"
// import { GroupMembersInputs } from "./GroupMembersInputs"

// interface AddGroupDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (group: Omit<Group, "_id">) => void
// }

// type GroupWithoutId = Omit<Group, "_id">

// export function AddGroupDialog({
//   isOpen,
//   onClose,
//   onSave,
// }: AddGroupDialogProps) {
//   const [newGroup, setNewGroup] = useState<GroupWithoutId>(
//     groupService.getEmptyGroup()
//   )
//   const [members, setMembers] = useState<GroupMember[]>([])
//   const [showMembersInputs, setShowMembersInputs] = useState(false)

//   function handleDialogClose() {
//     setNewGroup(groupService.getEmptyGroup())
//     onClose()
//   }

// function handleAddMember(member: GroupMember) {
//   setMembers(prev => [...prev, member])
// }

//   function handleTitleChange(ev: React.ChangeEvent<HTMLInputElement>) {
//     const title = ev.target.value
//     setNewGroup((prev) => ({
//       ...prev,
//       title,
//     }))
//     if (title && !showMembersInputs) setShowMembersInputs(true)
//     if (!title && showMembersInputs) setShowMembersInputs(false)
//   }
//   function handleCancelMember() {
//     setShowMembersInputs(false)
//   }

//   function handleSave() {
//     if (!newGroup.title.trim()) return
//     onSave(newGroup)
//     setNewGroup(groupService.getEmptyGroup())
//   }

//   return (
//     <Dialog open={isOpen} onClose={handleDialogClose}>
//       <DialogTitle>Start a new group</DialogTitle>

//       <DialogContent>
//         <TextField
//           label="Group Title"
//           fullWidth
//           value={newGroup.title}
//           onChange={handleTitleChange}
//           autoFocus
//         />

//         {showMembersInputs && (
//           <GroupMembersInputs
//             onAdd={handleAddMember}
//             onCancel={handleCancelMember}
//           />
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleDialogClose}>Cancel</Button>
//         <Button onClick={handleSave} disabled={!newGroup.title.trim()}>
//           Save
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }
