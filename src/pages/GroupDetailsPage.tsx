import { useNavigate, useParams } from "react-router-dom"
import {
  loadGroup,
  updateGroupAction,
  removeGroupAction,
} from "../store/actions/group.actions"
import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { GroupHeader } from "../cmps/GroupHeader"
import { ExpenseList } from "../cmps/ExpenseList"

import { Loader } from "../cmps/Loader"

import type { Expense } from "../models/group.model"
import { AddExpenseDialog } from "../cmps/AddExpenseDialog"

export function GroupDetailsPage() {
  const navigate = useNavigate()
  const { groupId } = useParams<{ groupId: string }>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isLoading = useSelector((state: any) => state.groupModule.isLoading)
  const group = useSelector((state: any) => state.groupModule.group)

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
    try {
      const updatedExpenses = [...group.expenses, expense]
      const updatedGroup = { ...group, expenses: updatedExpenses }
      updateGroupAction(updatedGroup)
      setIsDialogOpen(false)
    } catch (err) {
      console.log("Failed to save expense:", err)
    }
  }

  function handleDeleteExpense(expenseId: string) {
    try {
      const updatedExpenses = group.expenses.filter(
        (exp: Expense) => exp.id !== expenseId
      )
      const updatedGroup = { ...group, expenses: updatedExpenses }
      updateGroupAction(updatedGroup)
    } catch (err) {
      console.log("Failed to delete expense:", err)
    }
  }

  function handleDeleteGroup(groupId: string) {
    try {
      removeGroupAction(groupId)
      navigate("/")
    } catch (err) {
      console.log("Failed to delete group:", err)
    }
  }

  if (isLoading) return <Loader />
  console.log("group from GroupDetailsPage", group)
  return (
    <div className="group-details-page">
      <GroupHeader
        group={group}
        onAddExpenseClick={handleOpenDialog}
        onDeleteGroup={handleDeleteGroup}
      />
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
