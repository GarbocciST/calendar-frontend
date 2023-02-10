import { Typography } from "@mui/material"


export const CalendarEvent = ({event}) => {

    const { title, user } = event;
    
  return (
    <>
        <Typography>{title}</Typography>
        <Typography> - {user.name}</Typography>
    </>
  )
}
