import {OilfieldAnalyticsDatasetRaw, OilfieldAnalyticsDataset} from "types/oilfield.types";

export const convertAnalytics = (data: OilfieldAnalyticsDatasetRaw[]): OilfieldAnalyticsDataset[] => {
    return data.map((el, i, acc) => {
        const prevElement = acc[i - 1];

        return ({
            date: el.date,
            oil: { totalValue: el.oil, currentValue: prevElement ? el.oil - prevElement.oil : null },
            water: { totalValue: el.water, currentValue: prevElement ? el.water - prevElement.water : null }
        });
    }, [])
}