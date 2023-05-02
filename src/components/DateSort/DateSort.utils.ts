import {DateSortFormErrors, DateSortFormValues} from "./DateSort.types";
import {isValid, parse} from "date-fns";
import {dateSortParseTemplate} from "./DateSort.constants";

const validateStringDate = (date: string): boolean => {
    const [month, day, year] = date.split('/').map(Number);
    let isValid = true;

    switch (true) {
        case day > 31 || day < 1: isValid = false; break;
        case month > 12 || month < 1: isValid = false; break;
        case year.toString().length < 4: isValid = false; break;
    }

    return isValid;
};
const checkIsValidDate = (date: string): boolean => isValid(parse(date, dateSortParseTemplate, new Date()));
const hasPropertyGuard = <T>(prop: T, func: (prop: NonNullable<T>) => boolean, message: string): undefined | string => {
    if (!prop) { return undefined }

    return func(prop) ? undefined : message;
};

export const validateDateSortForm = (values: DateSortFormValues): DateSortFormErrors => {

    return ({
        singleSort: hasPropertyGuard(
            values.singleSort,
            (prop) => checkIsValidDate(prop) && validateStringDate(prop),
            'Дата некорректна'
        )
    });
}
//     ({
//     // singleSort: !!values.singleSort,
//     // singleSort: (
//     //         !!values.singleSort &&
//     //         checkIsValidDate(values.singleSort) &&
//     //         validateStringDate(values.singleSort)) ? undefined : "Дата некорректна",
//     rangeSort: values.rangeSort &&
//         values.rangeSort.map((el) => checkIsValidDate(el) && validateStringDate(el) ? undefined : "Дата некорректна"),
//     multiplySort:
//         values.multiplySort &&
//         (values.multiplySort.every((el) => checkIsValidDate(el) && validateStringDate(el))
//         ? undefined : "Дата некорректна")
// });