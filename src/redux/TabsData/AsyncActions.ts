import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../notifications";
import { proxyURL } from "../../utils/lib/proxyAPI";

import {
    ActionReportResponseInterface,
    ActionReportType,
    ShortCodeDetails
} from "../../interfaces/interfaces";
import axios from "axios";

export const fetchApiSMSShortCodeDetailsTabData = createAsyncThunk<
    ShortCodeDetails[]
>(
    "SMSShortCodeDetailsTab/fetchSMSShortCodeDetails",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get<ShortCodeDetails[]>(
                `${proxyURL}/GetShortCodeDetailsByAccountId`
            );
            return data;
        } catch (error) {
            // Handle the error and dispatch the setErrorText action
            let errorMessage =
                "Failed to fetch data for GetShortCodeDetailsByAccountId";
            dispatch(
                setError({
                    notificationHeader: "error",
                    infoText: errorMessage,
                    notificationType: "error"
                })
            );
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchApiGetSMSShortCodeName = createAsyncThunk<ShortCodeDetails[]>(
    "GetSMSShortCodeName",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get<ShortCodeDetails[]>(
                `${proxyURL}/GetSMSShortCodeName`
            );
            return data;
        } catch (error) {
            // Handle the error and dispatch the setErrorText action
            let errorMessage = "Failed to fetch data for GetSMSShortCodeName";
            dispatch(
                setError({
                    notificationHeader: "error",
                    infoText: errorMessage,
                    notificationType: "info"
                })
            );
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchApiGetMailBoxDetails = createAsyncThunk<ShortCodeDetails[]>(
    "GetMailBoxDetails",
    async (prams) => {
        const { data } = await axios.get<ShortCodeDetails[]>(
            `${proxyURL}/GetMailBoxDetails`
        );
        return data;
    }
);

export const fetchApiGetCMSAccountDetails = createAsyncThunk<
    ShortCodeDetails[]
>("GetCMSAccountDetails", async (prams) => {
    const { data } = await axios.get<ShortCodeDetails[]>(
        `${proxyURL}/GetCMSAccountDetails`
    );
    return data;
});

export const fetchApiGetIOTAssetDetails = createAsyncThunk<ShortCodeDetails[]>(
    "GetIOTAssetDetails",
    async (prams) => {
        const { data } = await axios.get<ShortCodeDetails[]>(
            `${proxyURL}/GetIOTAssetDetails`
        );
        return data;
    }
);

export const fetchApiGetActionReport = createAsyncThunk<
    ActionReportResponseInterface,
    string
>("GetActionReport", async (prams) => {
    const { data } = await axios.get<ActionReportResponseInterface>(
        `${proxyURL}/actionReport/${prams}`
    );
    return data;
});

export const fetchApiGetSMSAccountDetails = createAsyncThunk<
    ActionReportType,
    string
>("fetchApiGetSMSAccountDetails", async (prams) => {
    const { data } = await axios.get<ActionReportType>(
        `${proxyURL}/GetSMPDetails?accountId=900300249263&noOfRecords=0&isDebugMode=true&actionCode=GetSMPDetails&action=GetSMPDetails`
    );
    return data;
});
