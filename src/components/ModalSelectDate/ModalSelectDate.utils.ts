import {DateSortModEnum} from "../DateSort/DateSort.types";

export const getInitialValuesBySortType = (type: DateSortModEnum) => {
    switch (type) {
        case DateSortModEnum.SINGLE: return [];
    }
};