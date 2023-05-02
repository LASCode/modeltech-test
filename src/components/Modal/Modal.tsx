import {ModalProps} from "./Modal.types";
import {useIsMobile} from "../../hooks/useIsMobile";
import {Dialog} from "primereact/dialog";

import cnBind from 'classnames/bind';
import styles from './Modal.module.scss';
const cx = cnBind.bind(styles);

export const Modal = ({isOpen, onClose, children, className, ...props}: ModalProps) => {
    const isMobile = useIsMobile();

    return (
        <Dialog
            className={cx('modal', {mobile: isMobile}, className)}
            onHide={onClose}
            visible={isOpen}
            position={!isMobile ? 'center' : 'bottom'}
            dismissableMask={true}
            draggable={false}
            resizable={false}

            {...props}
        >
            {children}
        </Dialog>
    );
}