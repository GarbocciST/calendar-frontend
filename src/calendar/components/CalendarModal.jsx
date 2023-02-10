import { Box, Typography } from "@mui/material"
import Modal from '@mui/material/Modal';
import { useUiStore } from "../../hooks";
import { FormModal } from "./";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
  };

export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();


  const handleClose = () => {
    closeDateModal();
  };

  return (
        <Modal
        open={isDateModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Nuevo evento
                </Typography>
                <hr />
                <FormModal handleClose={handleClose}/>
            </Box>
        </Modal>
  )
}
