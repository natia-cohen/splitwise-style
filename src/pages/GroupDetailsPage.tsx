import { useParams } from "react-router-dom"
import { loadGroup } from "../store/actions/group.actions"
import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { GroupHeader } from "../cmps/GroupHeader"
import { ExpenseList } from "../cmps/ExpenseList"
import { AddExpenseDialog } from "../cmps/AddExpenseDialog"

export function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const group = useSelector((state: any) => state.groupModule.group)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleOpenDialog() {
    setIsDialogOpen(true)
  }
  function handleCloseDialog() {
    setIsDialogOpen(false)
  }
  useEffect(() => {
    if (groupId) loadGroup(groupId)
  }, [groupId])
  console.log("group from GroupDetailsPage", group)
  return (
    <div className="group-details-page">
      <GroupHeader group={group} onAddExpenseClick={handleOpenDialog}/>
      <ExpenseList group={group} />
      <AddExpenseDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </div>
  )
}
