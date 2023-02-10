import { CalendarMonthOutlined, Logout } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../store/auth/thunks';

export const NavBar = ( nombre ) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
  return (
    <AppBar
        position="static"
        sx={{
            backgroundColor: "secondary.light",
        }}
    >
        <Toolbar
            sx={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <CalendarMonthOutlined 
                    sx={{
                        color: "white",
                    }}
                />
                <Typography
                    variant="h7"
                    fontSize={20}
                    color={"white"}
                    ml={1}
                >
                    {`Calendario de ${user.name}`}
                </Typography>
            </Box>


            <IconButton
            onClick={() => dispatch(startLogout())}
            >
                <Logout 
                    sx={{
                        color: "error.main",
                    }}
                />
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}
