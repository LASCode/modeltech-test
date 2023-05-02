import {ModalProps} from "components/Modal";

export interface ModalServerErrorProps extends ModalProps {
    onRetry: () => void;
    message: string | undefined;
}