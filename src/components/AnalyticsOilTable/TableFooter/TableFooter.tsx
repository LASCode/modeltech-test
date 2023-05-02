import {SplitButton} from "primereact/splitbutton";

import cnBind from 'classnames/bind';
import styles from './TableFooter.module.scss';
const cx = cnBind.bind(styles);

export const TableFooter = () => {

    return (
        <div className={cx('table-footer')}>
            <div className={cx('table-actions')}>
                <SplitButton
                    className={cx('table-action')}
                    icon="pi pi-refresh"
                    onClick={console.log}
                    model={[
                        { label: "Импорт", icon: 'pi pi-file-import' },
                        { label: "Экспорт", icon: 'pi pi-file-export' },
                    ]}
                    severity="success"
                />
            </div>
        </div>
    )
};