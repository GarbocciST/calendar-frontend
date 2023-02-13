import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Box, IconButton } from '@mui/material';
import { AddOutlined, DeleteOutlined } from '@mui/icons-material';

import { getMessagesES, localizer } from '../helpers';
import { CalendarEvent } from './';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { onClearActiveEvent } from '../../store';
import { useDispatch } from 'react-redux';


export const BigCalendar = () => {

    const dispatch = useDispatch();
    const {events, activeEvent, setActiveEvent, startDeletingEvent, startLoadingEvents} = useCalendarStore();
    const { user } = useAuthStore();
    const {  openDateModal } = useUiStore();

    const [view, setView] = useState(localStorage.getItem('lastView') || 'month');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = ( user.uid === event.user._id) || (user.uid === event.user.uid );

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }
        return {
            style
        }
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onDoubleClick = (event) => {
        openDateModal();
        
    }

    const onViewChanged = (event) => {
        setView(event)
        localStorage.setItem('lastView', event)
    }

    const onDelete = () => {
        startDeletingEvent(activeEvent);
    }

    const onClickNewEvent = () => {
        dispatch(onClearActiveEvent());
        openDateModal();
    }
     
    useEffect(() => {
        startLoadingEvents();
    }, []);

  return (
    <Box>   
        <Calendar 
            culture='es'
            localizer={localizer}
            events={events}
            defaultView={view}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 64px)'}}
            messages={getMessagesES()}
            eventPropGetter={eventStyleGetter}
            components={{ event: CalendarEvent }}
            onSelectEvent={ onSelect }
            onDoubleClickEvent={ onDoubleClick }
            onView={ onViewChanged }
        />
        
        <IconButton
            sx={{
                display: `${events.length > 0 ? 'flex' : 'none'}`,
                position: 'fixed',
                bottom: '80px',
                right: '20px',
                backgroundColor: 'error.main',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'error.dark'
                },                
            }}
            onClick={ onDelete }
        >
            <DeleteOutlined 
            />
        </IconButton>
        
        <IconButton
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'primary.dark'
                }
            }}
            onClick={ onClickNewEvent}
        >
            <AddOutlined 
                fontSize='large'
            />
        </IconButton>
  </Box>
  )
}
