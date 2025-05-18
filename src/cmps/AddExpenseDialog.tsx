import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import MenuItem from "@mui/material/MenuItem"
import { useState } from "react"
import type { Group, Expense, GroupMember } from "../models/group.model"
import { groupService } from "../services/group/group.service"
import { buildSplitBetween } from "../services/expense.utils"

interface AddExpenseDialogProps {
  isOpen: boolean
  onClose: () => void
  group: Group
  onSave: (expense: Expense) => void
}

export function AddExpenseDialog({
  isOpen,
  onClose,
  group,
  onSave,
}: AddExpenseDialogProps) {
  if (!group) return null

  const [expense, setExpense] = useState<Expense>(
    groupService.getEmptyExpense(group)
  )

  function handleTitleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setExpense({ ...expense, title: ev.target.value })
  }

  function handleAmountChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const input = ev.target.value

    if (input === "") {
      setExpense({ ...expense, amount: 0 })
      return
    }
    const value = Number(input)
    setExpense({ ...expense, amount: value })
  }

  function handleAmountBlur(ev: React.FocusEvent<HTMLInputElement>) {
    ev.stopPropagation()
    let value = Number(ev.target.value)
    if (!isNaN(value) && value < 0) {
      value = Math.abs(value)
      setExpense({ ...expense, amount: value })
    }
  }

  function toggleSplitMember(member: GroupMember) {
    const updatedSplit = expense.splitBetween.map((split) =>
      split.id === member.id ? { ...split, isChecked: !split.isChecked } : split
    )
    setExpense({ ...expense, splitBetween: updatedSplit })
  }

  function getSplitAmount() {
    const selected = expense.splitBetween.filter((s) => s.isChecked)
    return selected.length
      ? (expense.amount / selected.length).toFixed(2)
      : "0.00"
  }

  function handlePaidByChange(ev: React.ChangeEvent<HTMLInputElement>) {
    ev.preventDefault()
    const payerId = ev.target.value
    const payer = group.members.find((member) => member.id === payerId)
    if (!payer) return
    setExpense({
      ...expense,
      paidBy: [{ id: payer.id, name: payer.name, amount: expense.amount }],
    })
  }

  function handleSave() {
    const payerId = expense.paidBy[0]?.id
    const updatedSplitBetween = buildSplitBetween(expense, payerId)
    const updatedExpense = {
      ...expense,
      splitBetween: updatedSplitBetween,
      paidBy: [{ ...expense.paidBy[0], amount: expense.amount }],
    }
    onSave(updatedExpense)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 0,
          background: "#fff",
          minWidth: { xs: 310, sm: 350 },
          maxWidth: 410,
        }
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
        <div style={{
          fontSize: "1.18rem",
          fontWeight: 700,
          textAlign: "left",
          marginBottom: "14px",
          color: "#222"
        }}>
          Add New Expense
        </div>
        {/* שדה TITLE – בלי label, רק placeholder, קו דק ועדין */}
        <TextField
          placeholder="Expense title"
          variant="standard"
          fullWidth
          value={expense.title}
          onChange={handleTitleChange}
          autoFocus
          sx={{
            mb: 1.5,
            "& .MuiInputBase-root": {
              fontWeight: 500,
              fontSize: "1.08rem",
              background: "#fafbfc",
              borderRadius: 1,
              borderBottom: "1.2px solid #e0e5eb"
            },
            "& input": {
              padding: "10px 8px",
            }
          }}
        />

        {/* Amount */}
        <TextField
          placeholder="Amount"
          variant="standard"
          type="number"
          fullWidth
          value={expense.amount === 0 ? "" : expense.amount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          sx={{
            mb: 1.5,
            "& .MuiInputBase-root": {
              fontWeight: 500,
              fontSize: "1.08rem",
              background: "#fafbfc",
              borderRadius: 1,
              borderBottom: "1.2px solid #e0e5eb"
            },
            "& input": {
              padding: "10px 8px",
            }
          }}
        />

        {/* Paid By */}
        <TextField
          select
          placeholder="Paid By"
          variant="standard"
          fullWidth
          value={expense.paidBy[0]?.id || ""}
          onChange={handlePaidByChange}
          sx={{
            mb: 1.5,
            "& .MuiInputBase-root": {
              fontWeight: 500,
              fontSize: "1.08rem",
              background: "#fafbfc",
              borderRadius: 1,
              borderBottom: "1.2px solid #e0e5eb"
            }
          }}
        >
          {group.members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.name}
            </MenuItem>
          ))}
        </TextField>

        {/* splitBetween */}
        <FormGroup sx={{ mt: 2 }}>
          {expense.splitBetween.map((split) => {
            const splitAmount = split.isChecked
              ? getSplitAmount()
              : "Not included"
            return (
              <FormControlLabel
                key={split.id}
                control={
                  <Checkbox
                    checked={split.isChecked}
                    onChange={() =>
                      toggleSplitMember({ id: split.id, name: split.name })
                    }
                    sx={{ color: "#1976d2" }}
                  />
                }
                label={
                  <span style={{
                    fontWeight: split.isChecked ? 600 : 400,
                    color: split.isChecked ? "#1976d2" : "#999",
                  }}>
                    {split.name}
                    {" — "}
                    {split.isChecked ? `${splitAmount}₪` : "Not included"}
                  </span>
                }
                sx={{ mb: 0.2 }}
              />
            )
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="text"
          sx={{
            color: "#1976d2",
            fontWeight: 500,
            fontSize: "1rem",
            minWidth: 80
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
            minWidth: 80
          }}
          disabled={!expense.title.trim() || !expense.amount}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
