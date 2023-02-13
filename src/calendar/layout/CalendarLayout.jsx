import { Box } from "@mui/material"
import { NavBar } from "../components"
import { CalendarModal } from "../components/CalendarModal";


const nombre = {
  nombre: "Juan",
};

export const CalendarLayout = ({children}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <NavBar nombre={nombre} />

      <Box 
        sx={{
          mt: { xs: 1, sm: 0 }
        }}
      >
        <CalendarModal />
        {children}  
      </Box>  
      

    </Box>
  )
}


