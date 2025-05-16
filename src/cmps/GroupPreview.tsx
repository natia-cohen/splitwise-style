import { useNavigate } from "react-router-dom"
import type { Group } from "../models/group.model"

interface GroupPreviewProps {
  group: Group
}

export function GroupPreview({ group }: GroupPreviewProps) {
  const navigate = useNavigate()
  function handleSelectGroup(group: Group) {
    navigate(`/group/${group._id}`)
  }

  return (
    <div className="group-card" onClick={() => handleSelectGroup(group)}>
      <h3>{group.title}</h3>
    </div>
  )
}
