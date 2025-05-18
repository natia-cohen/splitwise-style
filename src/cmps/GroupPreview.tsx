import { useNavigate } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import type { Group } from "../models/group.model"

interface GroupPreviewProps {
  group: Group
}

export function GroupPreview({ group }: GroupPreviewProps) {
  const navigate = useNavigate()
  function handleSelectGroup() {
    navigate(`/group/${group._id}`)
  }

  return (
    <div className="group-card" onClick={handleSelectGroup}>
      <span className="group-card-icon">
        <HomeIcon sx={{ fontSize: 32, color: "#48be9d" }} />
      </span>
      <span className="group-card-title">{group.title}</span>
    </div>
  )
}


// import { useNavigate } from "react-router-dom"
// import type { Group } from "../models/group.model"

// interface GroupPreviewProps {
//   group: Group
// }

// export function GroupPreview({ group }: GroupPreviewProps) {
//   const navigate = useNavigate()
//   function handleSelectGroup(group: Group) {
//     navigate(`/group/${group._id}`)
//   }

//   return (
//     <div className="group-card" onClick={() => handleSelectGroup(group)}>
//       <h3>{group.title}</h3>
//     </div>
//   )
// }
