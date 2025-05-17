import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
// import InputAdornment from "@mui/material/InputAdornment"

import type { Group, Expense, GroupMember } from "../models/group.model"
import { useState } from "react"
import { groupService } from "../services/group/group.service"
import { buildSplitBetween } from "../services/expense.utils"
import { MenuItem } from "@mui/material"

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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Expense</DialogTitle>
      <DialogContent>
        {/* Title */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={expense.title}
          onChange={handleTitleChange}
          required
        />

        {/* Amount */}
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          placeholder="0.00"
          fullWidth
          value={expense.amount === 0 ? "" : expense.amount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          required
          // InputProps={{
          //   endAdornment: <InputAdornment position="end">$</InputAdornment>,
          // }}
        />

        {/* Paid By */}
        <TextField
          select
          label="Paid By"
          variant="outlined"
          fullWidth
          value={expense.paidBy[0]?.id || ""}
          onChange={handlePaidByChange}
          required
          style={{ margin: "16px 0" }}
        >
          {group.members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.name}
            </MenuItem>
          ))}
        </TextField>

        {/* splitBetween */}
        <FormGroup>
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
                  />
                }
                label={`${split.name} - ${
                  split.isChecked ? `${splitAmount}₪` : "Not included"
                }`}
              />
            )
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSave()}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
