import {Column} from "primereact/column";
import {DataTable, DataTableSelectionChangeEvent} from "primereact/datatable";
import {TableHeader} from "./TableHeader";

import cnBind from 'classnames/bind';
import styles from './AnalyticsOilTable.module.scss';
import {useIsMobile} from "hooks/useIsMobile";
import {TableFooter} from "./TableFooter";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {OilfieldAnalyticsDataset} from "types/oilfield.types";
import {selectPeriod} from "store/modules/oilfields/oilfields.reducer";
import {format} from "date-fns";
import {DateSortModEnum} from "../DateSort/DateSort.types";
import {dateSortParseTemplate} from "../DateSort/DateSort.constants";

const cx = cnBind.bind(styles);



export const AnalyticsOilTable = () => {
    const isMobile = useIsMobile();
    const dispatch = useAppDispatch();
    const { selectedPeriods, analyticsDatasets } = useAppSelector(state => state.oilfields);
    
    const [displayedRows, setDisplayedRows] = useState(analyticsDatasets);

    const handleSelect = useCallback((event: DataTableSelectionChangeEvent<OilfieldAnalyticsDataset[]>) => {
        dispatch(selectPeriod(event.value as OilfieldAnalyticsDataset[]));
    }, [dispatch])

    const handleChangeDisplayedRows = useCallback((dates: Date[], sortType: DateSortModEnum) => {
        const formattedDates = dates.map((el) => format(el, dateSortParseTemplate));
        const convertDateToNumber = (date: string): number => {
            const [month, day, year] = date.split('/');
            return Number([day, month, year].join(''));
        };
        
        if (!!selectedPeriods.length) {
            dispatch(selectPeriod([]));
        }

        if (sortType === DateSortModEnum.RANGE) {
            const [fromDateNumber, toDateNumber] = formattedDates.map(convertDateToNumber)
            setDisplayedRows(analyticsDatasets.filter((el) => {
                const currentDateNumber = convertDateToNumber(el.date);
                return currentDateNumber >= fromDateNumber && currentDateNumber <= toDateNumber
            }))
        } else {
            setDisplayedRows(analyticsDatasets.filter((el) => formattedDates.includes(el.date)));
        }
    }, [analyticsDatasets, dispatch, selectedPeriods.length]);

    
    useEffect(() => {
        setDisplayedRows(analyticsDatasets);
    }, [analyticsDatasets])

 
    return (
        <DataTable
            className={cx('table')}
            value={displayedRows}
            footer={isMobile ? TableFooter : null}
            header={<TableHeader onChange={handleChangeDisplayedRows} />}
            showGridlines
            scrollable
            scrollHeight="330px"
            selectionMode={undefined}
            selection={selectedPeriods}
            onSelectionChange={handleSelect}
        >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="date" header="Дата" />
            {isMobile && (
                <Column field="" header="Нефть \ вода (м3)" body={(data: OilfieldAnalyticsDataset) => (
                    <div className={cx('column-mobile')}>
                        <span>{data.oil.totalValue}</span>
                        <span>{data.water.totalValue}</span>
                    </div>
                )} />
            )}
            {/* Должны быть прямыми потомками, фрагмент не катит... */}
            {!isMobile && (<Column field="oil.totalValue" header="Нефть (м3)" />)}
            {!isMobile && (<Column field="water.totalValue" header="Вода (м3)" />)}
        </DataTable>
    );
};