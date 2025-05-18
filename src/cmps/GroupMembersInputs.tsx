
import { useState } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import type { GroupMember } from "../models/group.model"
import { groupService } from "../services/group/group.service"

interface GroupMembersInputsProps {
  onAdd: (member: GroupMember) => void
  onCancel: () => void
}

export function GroupMembersInputs({ onAdd, onCancel }: GroupMembersInputsProps) {
  const [member, setMember] = useState<GroupMember>(groupService.getEmptyMember())

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMember(prev => ({ ...prev, name: e.target.value }))
  }

  
  function handleBlur() {
    if (member.name.trim()) {
      onAdd(member)
    } else {
      onCancel()
    }
  }

 
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && member.name.trim()) {
      onAdd(member)
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
      <TextField
        placeholder="Member name"
        value={member.name}
        onChange={handleNameChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        fullWidth
      />
      <IconButton onClick={onCancel} aria-label="Cancel" size="small">
        <DeleteIcon color="error" fontSize="small" />
      </IconButton>
    </div>
  )
}



// import { useState } from "react"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"
// import IconButton from "@mui/material/IconButton"
// import DeleteIcon from "@mui/icons-material/Delete"
// import type { GroupMember } from "../models/group.model"
// import { groupService } from "../services/group/group.service"

// interface GroupMembersInputsProps {
//   onAdd: (member: GroupMember) => void
//   onCancel?: () => void  
// }

// export function GroupMembersInputs({ onAdd, onCancel }: GroupMembersInputsProps) {
//   const [member, setMember] = useState<GroupMember>(groupService.getEmptyMember())

//   function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setMember(prev => ({ ...prev, name: e.target.value }))
//   }

//   function handleAdd() {
//     if (!member.name.trim()) return
//     onAdd(member)
//     setMember(groupService.getEmptyMember()) 
//   }

//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
//       <TextField
//         placeholder="Member name"
//         value={member.name}
//         onChange={handleNameChange}
//         fullWidth
//       />
//       <Button onClick={handleAdd} disabled={!member.name.trim()}>
      
//       </Button>
//       {onCancel && (
//         <IconButton onClick={onCancel} aria-label="Cancel" size="small">
//           <DeleteIcon color="error" fontSize="small" />
//         </IconButton>
//       )}
//     </div>
//   )
// }
