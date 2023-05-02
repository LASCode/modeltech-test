import {DateSortFormValues, DateSortModEnum, DateSortProps} from "./DateSort.types";

import cnBind from 'classnames/bind';
import styles from './DateSort.module.scss';
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {Button} from "primereact/button";
import {InputMask} from "primereact/inputmask";
import {InputTextarea} from "primereact/inputtextarea";
import {useCallback} from "react";
import {useBooleanState} from "hooks/useBooleanState";
import {Field, Form, FormSpy} from "react-final-form";
import {
    dateSortDropdownOptions,
    dateSortFormNames,
    dateSortParseTemplate
} from "./DateSort.constants";
import {FormApi, FormState} from "final-form";
import {format, parse} from "date-fns";
import {validateDateSortForm} from "./DateSort.utils";
import {ModalSelectDate} from "components/ModalSelectDate";
import {useIsMobile} from "hooks/useIsMobile";
import {noop} from "chart.js/helpers";
const cx = cnBind.bind(styles);



export const DateSort = ({ sortValue, onChangeSort, onChangeValues }: DateSortProps) => {
    const isMobile = useIsMobile();
    const [isOpen, open, close] = useBooleanState(false);

    const handleDateSortChange = useCallback((event: DropdownChangeEvent) => onChangeSort(event.value), [onChangeSort]);
    const handleFormValuesChange = useCallback(({ values, valid }:  FormState<DateSortFormValues, Partial<DateSortFormValues>>) => {
        if (!valid) { return false }
        
        switch (sortValue) {
            case DateSortModEnum.SINGLE:
                values.singleSort &&
                onChangeValues([parse(values.singleSort, dateSortParseTemplate, new Date())]);
                break;
            case DateSortModEnum.RANGE:
                values.rangeSort &&
                values.rangeSort.length === 2 &&
                onChangeValues(values.rangeSort.map((el) => parse(el, dateSortParseTemplate, new Date())));
                break;
            case DateSortModEnum.MULTIPLY:
                values.multiplySort &&
                onChangeValues(values.multiplySort.map((el) => parse(el, dateSortParseTemplate, new Date())));
                break;
        }
    }, [onChangeValues, sortValue]);
    const handleModalSubmit = useCallback((values: Date[], formInstance: FormApi<DateSortFormValues, Partial<DateSortFormValues>>) => {
        const convertedValues = values.map((el) => format(el, dateSortParseTemplate));
        
        switch (sortValue) {
            case DateSortModEnum.SINGLE:
                formInstance.change(dateSortFormNames[sortValue], convertedValues[0]);
                break;
            case DateSortModEnum.RANGE:
                formInstance.change(dateSortFormNames[sortValue], convertedValues);
                break;
            case DateSortModEnum.MULTIPLY:
                formInstance.change(dateSortFormNames[sortValue], convertedValues);
                break;
        }
    }, [sortValue]);
    
    return (
        <div className={cx('date-sort')}>
            <div className={cx('date-sort-header')}>
                <Dropdown
                    className={cx('input-dropdown', ['w-full md:w-14rem'])}
                    value={sortValue}
                    options={dateSortDropdownOptions}
                    onChange={handleDateSortChange}
                    optionLabel='title'
                    placeholder="Укажите тип сортировки"
                />
                <Button
                    className={cx('button-calendar', ['p-button-success'])}
                    icon="pi pi-calendar"
                    outlined
                    onClick={open}
                    tooltip="Ого, это же календарик!"
                    tooltipOptions={{position: isMobile ? 'top' : 'right'}}
                />
            </div>

            <div className={cx('date-sort-content')}>
                <Form<DateSortFormValues> onSubmit={noop} validate={validateDateSortForm} destroyOnUnregister>
                    {({values, form }) => (
                        <>
                            {sortValue === DateSortModEnum.SINGLE && (
                                <Field<DateSortFormValues['singleSort']> name="singleSort">
                                    {({input, meta}) => (
                                        <InputMask
                                            {...input}
                                            value={input.value || ''}
                                            className={cx('input-date', {"p-invalid": !!meta.error && meta.dirty})}
                                            mask="99/99/9999"
                                            placeholder="Введите дату"
                                        />
                                    )}
                                </Field>

                            )}
                            {sortValue === DateSortModEnum.RANGE && (
                                <>
                                    <Field<string> name="rangeSort.0">
                                        {({input, meta}) => (
                                            <InputMask
                                                {...input}
                                                value={input.value || ''}
                                                className={cx('input-date', {"p-invalid": !!meta.error && meta.dirty})}
                                                mask="99/99/9999"
                                                placeholder="Введите дату (От)"
                                            />
                                        )}
                                    </Field>
                                    <Field<string> name="rangeSort.1">
                                        {({input, meta}) => (
                                            <InputMask
                                                {...input}
                                                value={input.value || ''}
                                                className={cx('input-date', {"p-invalid": !!meta.error && meta.dirty})}
                                                mask="99/99/9999"
                                                placeholder="Введите дату (До)"
                                            />
                                        )}
                                    </Field>
                                </>
                            )}
                            {sortValue === DateSortModEnum.MULTIPLY && (
                                <Field<string[]> name="multiplySort">
                                    {({input, meta}) => (
                                        <InputTextarea
                                            className={cx('input-date', {"p-invalid": !!meta.error && meta.dirty})}
                                            value={(input.value || []).join(', ')}
                                            onChange={(event) => input.onChange(event.target.value?.split(', '))}
                                        />
                                    )}
                                </Field>
                            )}

                            <ModalSelectDate
                                sortValue={sortValue}
                                onChangeSort={onChangeSort}
                                values={values}
                                onChange={(newValue) => handleModalSubmit(newValue, form)}
                                isOpen={isOpen}
                                onClose={close}
                            />

                            <FormSpy<DateSortFormValues>
                                subscription={{ values: true, valid: true }}
                                onChange={handleFormValuesChange}
                            />
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
};