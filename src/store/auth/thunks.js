import calendarApi from "../../api/calendarApi";
import { onChecking, onLogin, onLogout } from "./authSlice"


export const startLogin = ( userData ) => {
    return async (dispatch, getState) => {
        dispatch(onChecking());
       
        try {
            const {data} = await calendarApi.post('/auth', { email: userData.email, password: userData.password })
            localStorage.setItem('token', data.token);

            const {ok, name, uid, msg}= data;

            if (ok) {
                dispatch(onLogin({ok: ok, name: name, uid: uid}));
            }else{
                dispatch(onLogout(msg));
            }
            
        } catch (error) {
            console.log(error);
            dispatch(onLogout('Error al iniciar sesión'))
        }

    }
}

export const startRegister = ( userData) => {
    return async(dispatch, getState) => {
        
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post('/auth/new', { name: userData.name ,email: userData.email, password: userData.password })
            
            const {ok, uid, name, msg} = data;

            if (ok) {
                dispatch(onRegister({ok: ok, name: name, uid: uid}));
            }else{
                dispatch(onLogout(msg));
            }
            
        } catch (error) {
            dispatch(onLogout('Error al registrar usuario'))

        }



    }
}

export const startLogout = () => {
    return async(dispatch) => {
        localStorage.clear();
        dispatch(onLogout());
    }

}

export const checkAuthToken = () => {
    return async(dispatch, getState) => {
        

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());
        
        try {
            const {data} = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid}));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout('Error al renovar token'))
        }
    }
}

