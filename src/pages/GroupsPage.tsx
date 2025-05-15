import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadGroups } from "../store/actions/group.actions";
import { GroupList } from "../cmps/GroupList";


export function GroupsPage() {
  const groups = useSelector((state: any) => state.groupModule.groups);

useEffect(() => {
  loadGroups(); 
}, []);
function handleSelectGroup(){
  
}

  return (
    <main className="groups-page">

      <h1>Groups</h1>
     <GroupList groups={groups} onSelectGroup={handleSelectGroup} />
    </main>
  );
}
