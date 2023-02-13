import { Button, Input, TextField, Typography } from '@mui/material';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form';
import es from 'date-fns/locale/es';
import { useCalendarStore } from '../../hooks';

registerLocale('es', es)

const startDate = new Date();

export const FormModal = ({handleClose}) => {
  const { events, activeEvent, startSavingEvent } = useCalendarStore();
  
  const { register, formState: {errors}, reset, handleSubmit, control, watch} = useForm ({
        defaultValues: {
            title:  activeEvent ? activeEvent.title : '',
            start:  activeEvent ? activeEvent.start : '',
            end:    activeEvent ? activeEvent.end : '',
            notes:  activeEvent ? activeEvent.notes : ''
        }
  })

    const onSubmitted = async(data) => {
        
        (activeEvent) 
        ? await startSavingEvent({...data, id: activeEvent.id})
        : await startSavingEvent( data )
        
        reset ({
            title: '',
            start: '',
            end: '',
            notes: ''
        })
        
        handleClose();
    }

  return (
    <form  onSubmit={handleSubmit(onSubmitted)} >
        <Typography id="modal-modal-description" sx={{ mt: 2 }} >Fecha y hora inicio</Typography>
        
        <Controller 
            control={control}
            name="start"
            render={({ field }) => (
                <ReactDatePicker 
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                    minDate={startDate}
                    locale="es"
                    placeholderText="Elegir fecha"
                    dateFormat="dd-MM-yyyy h:mm aa"
                    className='form-control'
                    showTimeSelect
                />
            )}
            rules={{ required: true }}
        />
        {errors.start && <span style={{ color: 'red' }} >Este campo es requerido</span>}
        <Typography id="modal-modal-description" sx={{ mt: 2 }} >Fecha y hora fin</Typography>
        <Controller 
            control={control}
            name="end"
            render={({ field }) => (
                <ReactDatePicker 
                    selected={field.value}
                    onChange={(e) => field.onChange(e)}
                    minDate={startDate}
                    locale="es"
                    placeholderText="Elegir fecha"
                    dateFormat="dd-MM-yyyy h:mm aa"
                    className='form-control'
                    showTimeSelect
                />
            )}
            rules={{ required: true}}
        />
        {errors.end && <span style={{ color: 'red' }} >Este campo es requerido</span>}

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>Titulos y notas</Typography>
        <Input
            inputProps={{ 'aria-label': 'description' }}
            sx={{ width: '100%', border: '1px solid grey', borderRadius: '5px'  }}
            {...register('title', { required: true })}
        />
        {errors.title && <span style={{ color: 'red' }} >Este campo es requerido</span>}

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>Una descripcion corta</Typography>
        <TextField 
            id="outlined-multiline-static"    
            multiline
            rows={4}
            variant="outlined"
            sx={{ width: '100%', border: '1px solid grey', borderRadius: '5px' }}
            {...register('notes', { required: true })}
        />
        {errors.notes && <span style={{ color: 'red' }} >Este campo es requerido</span>}

        <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            type="submit"
        >
            Guardar
        </Button>
    </form>
  )
}
