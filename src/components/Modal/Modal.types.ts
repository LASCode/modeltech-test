import {DialogProps} from "primereact/dialog";

export interface ModalProps extends Omit<DialogProps, 'visible' | 'onHide'> {
    isOpen: boolean;
    onClose: () => void;
}