import {ModalProps} from "components/Modal";
import {DateSortFormValues, DateSortModEnum} from "../DateSort/DateSort.types";

export interface ModalSelectDateProps extends ModalProps {
    sortValue: DateSortModEnum,
    onChangeSort: (newValue: DateSortModEnum) => void;
    values: DateSortFormValues;
    onChange: (newValue: Date[]) => void;
}
