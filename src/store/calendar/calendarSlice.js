    import { createSlice } from '@reduxjs/toolkit';
    import { addHours } from 'date-fns';


    export const calendarSlice = createSlice({
       name: 'calendar',
       initialState: {
            isLoadingevents: false,
            events: [],
            activeEvent: null,

        },
       reducers: {
            onsetActiveEvent: (state, {payload}) => {
                state.activeEvent = payload;
            },
            onClearActiveEvent: (state) => {
                state.activeEvent = null;
            },
            onAddNewEvent: (state, {payload}) => {
                state.events.push(payload);
                state.activeEvent = null;
            },
            onDeleteEvent: (state) => {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            },
            onUpdateEvent: (state, {payload}) => {
                state.events = state.events.map(event => {
                    if(event.id === payload.id){
                        return payload;
                    }
                    return event;
                    
                });
                state.activeEvent = null;
            },
            onLoadEvents: (state, {payload}) => {
                state.isLoadingevents = false;
                payload.forEach(event => {
                    const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                    if(!exists){
                        state.events.push(event);
                    }
                })

            },
            onClearEvents: (state) => {
                isLoadingevents = false;
                state.events = [];
                activeEvent = null;
            }
        }
    });


    // Action creators are generated for each case reducer function
    export const { 
        onsetActiveEvent,
        onAddNewEvent, 
        onDeleteEvent, 
        onLoadEvents ,
        onUpdateEvent, 
        onClearActiveEvent,
        onClearEvents
        } = calendarSlice.actions;