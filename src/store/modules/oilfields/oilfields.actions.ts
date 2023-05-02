import {createAsyncThunk} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "store";
import {convertAnalytics} from "utils/convertAnalytics";
import {OilfieldAnalyticsDataset, OilfieldAnalyticsDatasetRaw} from "types/oilfield.types";

export const loadOilfieldAnalyticDataset = createAsyncThunk<
    OilfieldAnalyticsDataset[],
    undefined,
    AsyncThunkConfig
>(
    'LOAD_DATASET/OILFIELDS',
    async (_, {rejectWithValue}) => {
        const response = await fetch('https://LASCodeTest.com/analytics');

        if (!response.ok || response.status !== 200) { rejectWithValue('Произошла ошибка сервера.') }

        const data = await response.json() as OilfieldAnalyticsDatasetRaw[];

        return convertAnalytics(data);
    },
);