import { useDispatch, useSelector } from "react-redux";
import { onClearActiveEvent, onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {
    const dispatch = useDispatch();
    
    const {isDateModalOpen} = useSelector((state) => state.ui);
    
    const openDateModal = () => {
       dispatch(onOpenDateModal())
       dispatch(onClearActiveEvent())
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    
    return {
        //* Propiedades 
        isDateModalOpen,
    
        //* Metodos
        openDateModal,
        closeDateModal,
    };
};