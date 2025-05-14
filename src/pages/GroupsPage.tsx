import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadGroups } from "../store/actions/group.actions";


export function GroupsPage() {
  const groups = useSelector((state: any) => state.groupModule.groups);

useEffect(() => {
  loadGroups(); 
}, []);

  return (
    <main className="groups-page">
      <h1>Groups</h1>
      <ul>
        {groups.map((group: any) => (
          <li key={group._id}>{group.title}</li>
        ))}
      </ul>
    </main>
  );
}
