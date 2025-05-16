import { useParams } from "react-router-dom"
import { loadGroup } from "../store/actions/group.actions"
import { useEffect } from "react"

import { useSelector } from "react-redux"
import { GroupHeader } from "../cmps/GroupHeader"
import { ExpenseList } from "../cmps/ExpenseList"

export function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>()

  const group = useSelector((state: any) => state.groupModule.group)

  useEffect(() => {
    if (groupId) loadGroup(groupId)
  }, [groupId])
  console.log("group from GroupDetailsPage", group)
  return (
    <div className="group-details-page">
      <GroupHeader group={group} />
      <ExpenseList group={group} />
    </div>
  )
}
