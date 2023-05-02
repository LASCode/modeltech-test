import {DateSortFormValues, DateSortModEnum} from "./DateSort.types";
import {SelectItem} from "primereact/selectitem";

export const dateSortParseTemplate = 'MM/dd/yyyy';

export const dateSortDropdownOptions: SelectItem[] = [
    { title: 'Тип сортировки: Одна дата', value: DateSortModEnum.SINGLE },
    { title: 'Тип сортировки: Диапазон', value: DateSortModEnum.RANGE },
    { title: 'Тип сортировки: Несколько дат', value: DateSortModEnum.MULTIPLY },
];

export const dateSortFormNames: Record<DateSortModEnum, keyof DateSortFormValues> = {
    [DateSortModEnum.SINGLE]: 'singleSort',
    [DateSortModEnum.RANGE]: 'rangeSort',
    [DateSortModEnum.MULTIPLY]: 'multiplySort',
}