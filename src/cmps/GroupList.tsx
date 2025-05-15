import type { Group } from "../models/group.model";
import { GroupPreview } from "./GroupPreview";

interface GroupListProps {
  groups: Group[];

}

export function GroupList({ groups }: GroupListProps) {
  return (
    <div className="group-list">
      {groups.map(group => (
        <GroupPreview key={group._id} group={group}  />
      ))}
    </div>
  )

    
}
