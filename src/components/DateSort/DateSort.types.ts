import {FormErrors} from "../../types/form.types";

export interface DateSortProps {
    sortValue: DateSortModEnum,
    onChangeSort: (newValue: DateSortModEnum) => void;
    onChangeValues: (values: Date[]) => void;
}

export enum DateSortModEnum {
    SINGLE = 'single',
    MULTIPLY = 'multiple',
    RANGE = 'range',
}

export type DateSortFormValues = {
    singleSort?: string;
    rangeSort?: [string, string];
    multiplySort?: string[];
}
export type DateSortFormErrors = FormErrors<DateSortFormValues>;