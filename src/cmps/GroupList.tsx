import type { Group } from "../models/group.model";
import { GroupPreview } from "./GroupPreview";

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (group: Group) => void;
}

export function GroupList({ groups, onSelectGroup }: GroupListProps) {
  return (
    <div className="group-list">
      {groups.map(group => (
        <GroupPreview key={group._id} group={group} onSelectGroup={onSelectGroup} />
      ))}
    </div>
  )

    
}
