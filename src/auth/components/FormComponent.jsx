import { Button, Grid, Link, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link as RouterLink} from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import { startLogin, startRegister } from '../../store/auth/thunks';


export const FormComponent = ({title}) => {

    const dispatch = useDispatch();

    const { status, user, errorMessage } = useAuthStore();

    const { register, formState: {errors}, handleSubmit, reset  } = useForm({
        defaultValues: {
            name: '',
            email:'',
            password: ''
        }
    })

    const onSubmitted = (data) => {
        // console.log(data);
        (title === 'Login') ?  dispatch(startLogin(data)) : dispatch(startRegister(data))
        
        reset({
            name: '',
            email:'',
            password: ''

        })
    }
    

  return (
    <>
        <form onSubmit={handleSubmit(onSubmitted)}>
                <TextField
                    placeholder="Name"
                    label="Name"
                    type="text"
                    name="name"
                    fullWidth        
                    sx={{
                        borderRadius: 2,    
                        marginBottom: 2,
                        boxShadow: 2,
                        backgroundColor: 'white',
                        display: `${title === 'Register' ? 'block' : 'none'}`
                    }}
                    { ...title === 'Register' && register("name", {required: 'El nombre es obligatorio '}) }
                />
                {errors?.name && <span className="text-danger text-small d-block mb-2">{errors.name.message}</span>}
                
                <TextField
                    placeholder="Email"
                    label="Email"   
                    type="email"
                    name="email"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        marginBottom: 2,
                        boxShadow: 2,
                        backgroundColor: 'white',
                    }}
                    {...register("email", {required: 'El nombre es obligatorio ' })}
                />
                {errors?.email && <span className="text-danger text-small d-block mb-2">{errors.email.message}</span>}
                
                <TextField
                    placeholder="Password"
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth
                    sx={{
                        borderRadius: 2,
                        marginBottom: 2,
                        boxShadow: 2,
                        backgroundColor: 'white'
                    }}
                    {...register("password", {required: 'El nombre es obligatorio ' })}
                />
                {errors?.password && <span className="text-danger text-small d-block mb-2">{errors.password.message}</span>}


                <Grid 
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'around',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                    >
                    <Button
                        variant="contained"
                        type='submit'
                        sx={{
                            borderRadius: 2,
                            marginBottom: 1,
                        }}
                        fullWidth
                        >
                        {title}
                    </Button>
                </Grid>
                <Link
                    component={RouterLink}
                    to={title === 'Login' ? '/auth/register' : '/auth/login'}
                    variant="body2"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 1,
                    }}
                    >
                    {title === 'Login' ? 'Crear cuenta' : 'Ya tienes cuenta?'} 
                </Link>
            </form>
    </>
  )
}
