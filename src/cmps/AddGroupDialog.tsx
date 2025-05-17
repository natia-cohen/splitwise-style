import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import type { Group } from "../models/group.model" 

interface AddGroupDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (group: Group) => void
}

export function AddGroupDialog({
  isOpen,
  onClose,
  onSave
}: AddGroupDialogProps) {
  const [title, setTitle] = useState("")

  function handleSave() {
    if (!title.trim()) return
    const newGroup: Group = {
      _id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
      members: [],
      expenses: []
    }
    onSave(newGroup)
    setTitle("")
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Group</DialogTitle>
      <DialogContent>
        <TextField
          label="Group Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!title.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
