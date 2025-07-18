import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

export function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
        width: "100%",
      }}
    >
      <CircularProgress size={48} thickness={4} color="success" />
    </Box>
  )
}
