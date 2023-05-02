import {Chart} from "primereact/chart";
import {useMemo} from "react";

import cnBind from 'classnames/bind';
import styles from './AnalyticsOilGraph.module.scss';
import {useAppSelector} from "hooks/hooks";
const cx = cnBind.bind(styles);

export const AnalyticsOilGraph = () => {
    const { selectedPeriods, analyticsDatasets } = useAppSelector(state => state.oilfields);
    
    const datasets = useMemo(() => !!selectedPeriods.length ? selectedPeriods : analyticsDatasets, [analyticsDatasets, selectedPeriods])
    
    const [totalOilValue, totalWaterValue] = useMemo(() => {
        return datasets.reduce((acc, curr) => {
            acc[0] += curr.oil.currentValue || 0;
            acc[1] += curr.water.currentValue || 0;
            return acc;
        }, [0, 0]);
    }, [datasets])
    
    const chartData = useMemo(() => ({
        labels: ['Нефть м3', 'Вода м3'],
        datasets: [
            {
                data: [totalOilValue, totalWaterValue],
                backgroundColor: [
                    '#000000a8',
                    '#4356f8a8',
                ],
                hoverBackgroundColor: [
                    '#000000a8',
                    '#4356f8a8',
                ]
            }
        ]
    }), [totalOilValue, totalWaterValue])
    const chartOptions = useMemo(() => ({cutout: '60%'}), [])

    const graphData = useMemo(() => ({
        labels: datasets.map((el) => el.date),
        datasets: [
            {
                label: 'Нефть м3',
                fill: false,
                borderColor: '#000000a8',
                yAxisID: 'y',
                tension: 0.4,
                data: datasets.map((el) => el.oil.currentValue)
            },
            {
                label: 'Вода м3',
                fill: false,
                borderColor: '#4356f8a8',
                // yAxisID: 'y1',
                // tension: 0.4,
                data: datasets.map((el) => el.water.currentValue)
            }
        ]
    }), [datasets])

    return (
        <div className={cx('analytics-oil-graph')}>
            <div className={cx('graph-wrapper')}>
                <Chart type="line" data={graphData} className={cx('graph')} width="100%" />
            </div>
            <div className={cx('chart-wrapper')}>
                <Chart type="doughnut" data={chartData} options={chartOptions} className={cx('chart')} width="100%" />
            </div>
        </div>
    );
};