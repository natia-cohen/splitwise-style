import type { Group } from "../models/group.model"
interface GroupHeaderProps {
  group: Group
  onAddExpenseClick: () => void
}

export function GroupHeader({ group, onAddExpenseClick }: GroupHeaderProps) {
  console.log("group from GroupHeader", group)

  if (!group) return <div className="group-header">Loading...</div>
  return (
    <header className="group-header">
      <div className="group-header-left">
        <img src="https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-teal37-house-100px.png" />
        <div className="info">
          <h1>{group.title}</h1>
          <h2>{group.members.length} people </h2>
        </div>
      </div>

      <div className="group-header-actions">
        <button className="add-expense-btn" onClick={onAddExpenseClick}>Add an expense</button>
        <button className="leave-group-btn">Leave group</button>
      </div>
    </header>
  )
}
