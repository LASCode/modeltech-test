import {ModalServerErrorProps} from "./ModalServerError.types";
import {Modal} from "components/Modal";
import {Button} from "primereact/button";

export const ModalServerError = ({message, onRetry, ...props}: ModalServerErrorProps) => {

    return (
        <Modal {...props} showHeader={false} dismissableMask={false}>
            <div>
                {message}
            </div>
            <Button label="Повторить попытку" onClick={onRetry}/>
        </Modal>
    );
};