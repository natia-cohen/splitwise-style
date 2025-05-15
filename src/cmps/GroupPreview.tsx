import type { Group } from "../models/group.model"


interface GroupPreviewProps {
  group: Group
  onSelectGroup: (group: Group) => void
}

export function GroupPreview({ group, onSelectGroup }: GroupPreviewProps) {
  return (
    <div className="group-card" onClick={() => onSelectGroup(group)}>
      
      <h3>{group.title}</h3>
    </div>
  )
}
