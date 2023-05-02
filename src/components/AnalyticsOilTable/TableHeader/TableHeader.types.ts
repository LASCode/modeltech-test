import {DateSortModEnum} from "components/DateSort/DateSort.types";

export interface TableHeaderProps {
    onChange: (dates: Date[], type: DateSortModEnum) => void;
}