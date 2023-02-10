import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Navigate, Route, Routes } from "react-router-dom"
import { AuthRoute } from "../auth/routes/AuthRoute"
import { CalendarRoute } from "../calendar/routes/CalendarRoute"
import { useAuthStore } from "../hooks";
import { checkAuthToken } from "../store/auth/thunks";


export const AppRouter = () => {

  const { status, } = useAuthStore();
  const dispatch = useDispatch();
 
  
  useEffect(() => {
    dispatch(checkAuthToken());
  }, [])
  
  if (status === 'checking') {
    return (
      <h1>Cargando...</h1>
      )
    }
    

  return (
    <Routes>
      {
        // (status === 'checking') && (<h1>Wait...</h1>)
        (status === 'authenticated') 
        ? <Route path="/*" element={<CalendarRoute />} />
        : <Route path="/auth/*" element={<AuthRoute />} />
      }

      <Route path="/*" element={<Navigate to="/auth/login" />} />
       
    </Routes>
  )
}
