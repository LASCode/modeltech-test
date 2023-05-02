export interface OilfieldAnalyticsDatasetRaw {
    date: string;
    oil: number;
    water: number;
}

export interface OilfieldAnalyticsDataset {
    date: string,
    oil: AnalyticsDatasetItem;
    water: AnalyticsDatasetItem;
}

export interface AnalyticsDatasetItem {
    totalValue: number;
    currentValue: number | null;
}
