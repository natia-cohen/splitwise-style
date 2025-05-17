import { useParams } from "react-router-dom"
import { loadGroup, updateGroupAction } from "../store/actions/group.actions"
import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { GroupHeader } from "../cmps/GroupHeader"
import { ExpenseList } from "../cmps/ExpenseList"
import { AddExpenseDialog } from "../cmps/AddExpenseDialog"
import type { Expense } from "../models/group.model"

export function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const group = useSelector((state: any) => state.groupModule.group)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (groupId) loadGroup(groupId)
  }, [groupId])

  function handleOpenDialog() {
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
  }

  function handleSaveExpense(expense: Expense) {
    const updatedExpenses = [...group.expenses, expense]
    const updatedGroup = { ...group, expenses: updatedExpenses }
    updateGroupAction(updatedGroup)
    setIsDialogOpen(false)
  }

  function handleDeleteExpense(expenseId: string) {
    const updatedExpenses = group.expenses.filter(
      (exp: Expense) => exp.id !== expenseId
    )
    const updatedGroup = { ...group, expenses: updatedExpenses }
    updateGroupAction(updatedGroup)
  }

  console.log("group from GroupDetailsPage", group)
  return (
    <div className="group-details-page">
      <GroupHeader group={group} onAddExpenseClick={handleOpenDialog} />
      <ExpenseList group={group} onDelete={handleDeleteExpense} />
      <AddExpenseDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        group={group}
        onSave={handleSaveExpense}
      />
    </div>
  )
}
