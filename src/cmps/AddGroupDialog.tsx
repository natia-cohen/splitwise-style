import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
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
  const [newGroup, setNewGroup] = useState<GroupWithoutId>(
    groupService.getEmptyGroup()
  )
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

  function handleTitleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value
    setNewGroup((prev) => ({
      ...prev,
      title: value,
    }))
    if (value && !showMembersInputs) {
      setMembers([
        groupService.getEmptyMember(),
        groupService.getEmptyMember(),
        groupService.getEmptyMember(),
      ])
      setShowMembersInputs(true)
    }
    if (!value && showMembersInputs) {
      setMembers([])
      setShowMembersInputs(false)
    }
  }

  function handleMemberChange(idx: number, name: string) {
    setMembers((prev) =>
      prev.map((member, i) => (i === idx ? { ...member, name } : member))
    )
  }

  function handleAddMember() {
    if (members.length < MAX_MEMBERS) {
      setMembers((prev) => [...prev, groupService.getEmptyMember()])
    }
  }

  function handleRemoveMember(idx: number) {
    if (members.length > 1) {
      setMembers((prev) => prev.filter((_, i) => i !== idx))
      setInputErrors((prev) => prev.filter((_, i) => i !== idx))
    }
  }

  function validateMembers() {
    const errors: string[] = []
    const trimmedNames = members.map((m) => m.name.trim())
    members.forEach((member, i) => {
      if (!member.name.trim()) errors[i] = "Name required"
      else if (trimmedNames.indexOf(member.name.trim()) !== i)
        errors[i] = "Duplicate name"
      else errors[i] = ""
    })
    setInputErrors(errors)
    return errors.every((err) => !err)
  }

  function handleSave() {
    if (!newGroup.title.trim()) return
    if (!validateMembers()) return
    const validMembers = members.filter((m) => m.name.trim())
    onSave({ ...newGroup, members: validMembers })
    handleDialogClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 0,
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 8px 32px 0 rgba(60,60,90,.12)",
          minWidth: { xs: 310, sm: 350 },
          maxWidth: 420,
        },
      }}
    >
      <DialogContent
        sx={{
          px: { xs: 2, sm: 4 },
          pt: 3,
          pb: 1,
        }}
      >
        {/* כותרת מינימלית */}
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            textAlign: "left",
            marginBottom: "16px",
            color: "#222",
          }}
        >
          Start a new group
        </div>
        {/* שדה כותרת עם עיצוב מינימליסטי */}
        <TextField
          placeholder="Group title"
          fullWidth
          variant="standard"
          value={newGroup.title}
          onChange={handleTitleChange}
          autoFocus
          sx={{
            mb: showMembersInputs ? 1 : 0.5,
            "& .MuiInputBase-root": {
              fontWeight: 500,
              fontSize: "1.05rem",
              background: "#fafbfc",
              px: 0.5,
              borderRadius: 1,
              borderBottom: "1.5px solid #e0e5eb",
              transition: "box-shadow 0.2s",
              "&:focus-within": {
                boxShadow: "0 2px 8px 0 #d1e0ea5c",
              },
            },
            "& input": {
              padding: "10px 8px",
            },
          }}
        />

        {showMembersInputs && (
          <div>
            {members.map((member, idx) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <TextField
                  placeholder={`Member #${idx + 1}`}
                  variant="standard"
                  value={member.name}
                  onChange={(e) => handleMemberChange(idx, e.target.value)}
                  error={!!inputErrors[idx]}
                  helperText={inputErrors[idx] || ""}
                  fullWidth
                  sx={{
                    background: "#fafbfc",
                    borderRadius: 1,
                    "& .MuiInputBase-root": {
                      fontWeight: 400,
                      fontSize: "1rem",
                      borderBottom: "1.1px solid #e0e5eb",
                    },
                    "& input": { padding: "8px 8px" },
                    "& .MuiFormHelperText-root": {
                      fontSize: "0.82em",
                      mt: 0,
                      color: "#c00",
                    },
                  }}
                />
                {members.length > 1 && (
                  <IconButton
                    onClick={() => handleRemoveMember(idx)}
                    aria-label="remove"
                    size="small"
                    sx={{
                      color: "#d32f2f",
                      "&:hover": {
                        background: "#ffeaea",
                      },
                      p: "6px",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
            <IconButton
              onClick={handleAddMember}
              disabled={members.length >= MAX_MEMBERS}
              sx={{
                color: "#1976d2",
                mx: "auto",
                display: "block",
                mb: 1,
                mt: 0.5,
                background: "#f5faff",
                border: "1.1px solid #d6ebf7",
                "&:hover": { background: "#e2f1fb" },
                p: "7px",
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={handleDialogClose}
          variant="text"
          sx={{
            color: "#1976d2",
            fontWeight: 500,
            fontSize: "1rem",
            minWidth: 80,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          sx={{
            px: 2.2,
            borderRadius: 2,
            fontWeight: 600,
            fontSize: "1.03rem",
            textTransform: "none",
            boxShadow: "none",
            ml: 1,
            height: 36,
            minWidth: 80,
          }}
          disabled={!newGroup.title.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
