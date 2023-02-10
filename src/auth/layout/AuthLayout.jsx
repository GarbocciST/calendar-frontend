import { Grid, Typography } from "@mui/material"
import { FormComponent} from "../components";


export const AuthLayout = ({children, title}) => {
  return (
    <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            bgcolor: 'primary.main'
        }}
    >

        <Grid
            backgroundColor="secondary.main"
            sx={{
                width: { xs: '300px', sm: '400px' },
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                boxShadow: 2,
                padding: 2,
            }}
            >
                <Typography 
                    variant="h6"
                    mb={1}
                >
                    {title}
                </Typography> 

                <FormComponent title={title} />
            
        </Grid>
    </Grid>
  )
}
