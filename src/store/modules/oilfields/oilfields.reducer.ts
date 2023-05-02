import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncState, FetchStatus} from "types/request.types";
import {loadOilfieldAnalyticDataset} from "./oilfields.actions";
import {OilfieldAnalyticsDataset} from "types/oilfield.types";

export interface OilfieldsState extends AsyncState {
    analyticsDatasets: OilfieldAnalyticsDataset[];
    selectedPeriods: OilfieldAnalyticsDataset[],
}

const initialState: OilfieldsState = {
    status: FetchStatus.IDLE,
    error: undefined,
    analyticsDatasets: [],
    selectedPeriods: [],
};

const oilfieldsSlice = createSlice({
    name: 'OILFIELDS',
    initialState,
    reducers: {
        selectPeriod: (state, {payload}: PayloadAction<OilfieldAnalyticsDataset[]>) => {
            state.selectedPeriods = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadOilfieldAnalyticDataset.pending, (state, { meta }) => {
            state.status = FetchStatus.PENDING;
            state.error = undefined;
        })
        builder.addCase(loadOilfieldAnalyticDataset.fulfilled, (state, action) => {
            state.status = FetchStatus.FULFILLED;
            state.analyticsDatasets = action.payload;
        })
        builder.addCase(loadOilfieldAnalyticDataset.rejected, (state, action) => {
            state.status = FetchStatus.REJECTED;
            state.error = action.error.message;
        })
    },
});

export const { selectPeriod } = oilfieldsSlice.actions;
export const oilfieldsReducer = oilfieldsSlice.reducer;