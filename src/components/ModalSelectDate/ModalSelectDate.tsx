import {ModalSelectDateProps} from "./ModalSelectDate.types";
import {Modal} from "../Modal";
import {Calendar, CalendarChangeEvent} from "primereact/calendar";
import {useCallback, useEffect, useMemo, useState} from "react";
import {DateSortModEnum} from "../DateSort/DateSort.types";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {dateSortDropdownOptions} from "../DateSort/DateSort.constants";

import cnBind from 'classnames/bind';
import styles from './ModalSelectDate.module.scss';
import {Button} from "primereact/button";
const cx = cnBind.bind(styles);

export const ModalSelectDate = ({sortValue, onChangeSort, values, onChange, className, onClose, ...props}: ModalSelectDateProps) => {
    const [selectedValues, setSelectedValues] = useState<(Date | null)[]>([]);

    const selectionMode = sortValue === DateSortModEnum.SINGLE ? DateSortModEnum.MULTIPLY : sortValue;

    const valuesIsValid = useMemo(() => {
        switch (sortValue) {
            case DateSortModEnum.SINGLE: return selectedValues.length > 0;
            case DateSortModEnum.RANGE: return selectedValues.length === 2;
            case DateSortModEnum.MULTIPLY: return selectedValues.length > 0;
        }
    }, [selectedValues.length, sortValue])
    
    const handleChange = useCallback((event: CalendarChangeEvent) => {
        if (!event.value) { return }

        const currentValue = event.value as (Date | null)[];

        switch (sortValue) {
            case DateSortModEnum.SINGLE: setSelectedValues(() => {
                return currentValue.length ? [currentValue[currentValue.length - 1]] : [];
            }); break;
            case DateSortModEnum.MULTIPLY: setSelectedValues(() => {
                return currentValue;
            }); break;
            case DateSortModEnum.RANGE: setSelectedValues((prevState) => {
                return currentValue.filter(Boolean);
            }); break;
        }
    }, [sortValue]);
    const handleDateSortChange = useCallback((event: DropdownChangeEvent) => onChangeSort(event.value), [onChangeSort]);
    const handleSubmit = useCallback(() => {
        onChange(selectedValues.filter(Boolean) as Date[]);
        onClose();
    }, [onChange, onClose, selectedValues]);
    
    useEffect(() => {
        setSelectedValues([]);
    }, [sortValue])

    return (
        <Modal className={cx('modal', className)} header="Выбор даты" onClose={onClose} {...props}>
            <div className={cx('content')}>
                <Dropdown
                    className={cx('dropdown', ['w-full md:w-14rem'])}
                    value={sortValue}
                    options={dateSortDropdownOptions}
                    onChange={handleDateSortChange}
                    optionLabel='title'
                    placeholder="Укажите тип сортировки"
                />
                <Calendar
                    className={cx('calendar', ['w-full md:w-14rem'])}
                    value={selectedValues.filter(Boolean) as Date[]}
                    selectionMode={selectionMode}
                    inline
                    onChange={handleChange}
                />
                <Button label="Ok" onClick={handleSubmit} disabled={!valuesIsValid} />
            </div>
        </Modal>
    );
}