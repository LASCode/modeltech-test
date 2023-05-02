import {PageLayout} from "layouts/PageLayout";

import cnBind from 'classnames/bind';
import styles from './OilfieldAnalyticsPage.module.scss';
import {AnalyticsOilTable} from "components/AnalyticsOilTable";
import {useCallback, useMemo} from "react";
import {AnalyticsOilGraph} from "components/AnalyticsOilGraph";
import {useAppDispatch, useAppSelector} from "hooks/hooks";
import {loadOilfieldAnalyticDataset} from "store/modules/oilfields/oilfields.actions";

const cx = cnBind.bind(styles);

export const OilfieldAnalyticsPage = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.oilfields);
    
    const handleRetry = useCallback(() => {
        void dispatch(loadOilfieldAnalyticDataset());
    }, [dispatch])
    
    useMemo(() => {
        void dispatch(loadOilfieldAnalyticDataset());
    }, [dispatch])
     
    return (
        <PageLayout
            status={status}
            errorMessage={error}
            onRetry={handleRetry}
            skeleton={<span>Loading...</span>}
        >
            <div className={cx('oilfield-analytics-page')}>
                <h1 className={cx('title')}>Месторождение "Северное" - Аналитика</h1>
                <div className={cx('graph-wrapper')}>
                    <AnalyticsOilGraph />
                </div>
                <div className={cx('table-wrapper')}>
                    <AnalyticsOilTable />
                </div>
            </div>
        </PageLayout>
    );
};