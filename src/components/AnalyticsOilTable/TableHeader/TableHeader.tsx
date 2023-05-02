import cnBind from 'classnames/bind';
import styles from './TableHeader.module.scss';
import {useCallback, useState} from "react";
import {DateSort} from "components/DateSort";
import {DateSortModEnum} from "components/DateSort/DateSort.types";
import {useIsMobile} from "hooks/useIsMobile";
import {SplitButton} from "primereact/splitbutton";
import {TableHeaderProps} from "./TableHeader.types";
import {useAppDispatch} from "hooks/hooks";
import {loadOilfieldAnalyticDataset} from "store/modules/oilfields/oilfields.actions";

const cx = cnBind.bind(styles);

export const TableHeader = ({ onChange }: TableHeaderProps) => {
    const isMobile = useIsMobile();
    const dispatch = useAppDispatch();
    const [dateSortType, setDateSortType] = useState<DateSortModEnum>(DateSortModEnum.SINGLE);
    
    const handleUpdate = useCallback(() => {
        dispatch(loadOilfieldAnalyticDataset());
    }, [dispatch]);
    const handleSortValuesChange = useCallback((dates: Date[]) => {
        onChange(dates, dateSortType);
    }, [dateSortType, onChange])

    return(
        <div className={cx('table-header')}>
            <DateSort sortValue={dateSortType} onChangeSort={setDateSortType} onChangeValues={handleSortValuesChange} />

            {!isMobile && (
                <div className={cx('table-actions')}>
                        <SplitButton
                            className={cx('table-action')}
                            icon="pi pi-refresh"
                            onClick={handleUpdate}
                            model={[
                                { label: "Импорт", icon: 'pi pi-file-import' },
                                { label: "Экспорт", icon: 'pi pi-file-export' },
                            ]}
                            severity="success"
                        />
                </div>
            )}
        </div>
    );
};