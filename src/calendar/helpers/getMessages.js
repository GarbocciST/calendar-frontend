

export const getMessagesES = () => {
    return {
        allDay: 'Todo el día',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento', // Or anything you want
        noEventsInRange: 'No hay eventos en este rango.',
        showMore: total => `+ Ver más (${total})`
    };
}