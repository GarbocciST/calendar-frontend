import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../pages';


export const CalendarRoute = () => {
  return (
    <Routes>
        <Route path="/home" element={<CalendarPage />} />

        <Route path="/*" element={ <Navigate to="/home" /> } />
    </Routes>
  )
}
