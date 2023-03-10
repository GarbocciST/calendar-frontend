import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onsetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onsetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(calendarEvent) => {
        
        if(calendarEvent.id){
            const {data} = await calendarApi.put(`/events/${calendarEvent.id}`, {...calendarEvent, user});

            dispatch(onUpdateEvent({...calendarEvent, user}));
        }else{
            const {data} =  await calendarApi.post('/events', calendarEvent);

            const {evento} = data;

            dispatch(onAddNewEvent({...calendarEvent, id: evento.id, user: user }));
        }
    }

    const startDeletingEvent = async(calendarEvent) => {
       
        const {data} = await calendarApi.delete(`/events/${calendarEvent.id}`); 
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch(onLoadEvents(data.eventos));
            
        } catch (error) {
            
        }
    }

    return {
        
        //* Propiedades
        events,
        activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
        


    }

}