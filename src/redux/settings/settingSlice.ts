import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { proxyURL } from "../../utils/lib/proxyAPI";

export interface Setting {
    CS_KEY: string;
    CS_VALUE: any;
    CS_CREATED_DATE: any;
    CS_UPDATED_DATE: any;
}
interface SettingState {
    settings: Setting[];
}
const initialState: SettingState = {
    settings: []
};

export const fetchApiSettings = createAsyncThunk(
    "settings/fetchSettings",
    async () => {
        const result = await fetch(`${proxyURL}/generalsettings`);
        if (!result.ok) {
            throw new Error("Faile to fetch settings ");
        }

        const data = await result.json();
        const serializedData = JSON.parse(JSON.stringify(data));
        return data as unknown as Setting[];
    }
);

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        addSettings: (state, action: PayloadAction<Setting>) => {
            state.settings.push(action.payload);
        },
        updateSetting: (state, action: PayloadAction<Setting>) => {
            const { CS_KEY, CS_VALUE } = action.payload;
            const index = state.settings.findIndex(
                (item) => item.CS_KEY === CS_KEY
            );
            if (index != -1) {
                state.settings[index].CS_VALUE = CS_VALUE;
            }
        },
        // Action to delete data
        deleteSettings: (state, action: PayloadAction<Setting>) => {
            const { CS_KEY, CS_VALUE } = action.payload;
            state.settings = state.settings.filter(
                (item) => item.CS_KEY !== CS_KEY
            );
        },
        getSetting: (state, action: PayloadAction<{ key: string }>) => {
            const { key } = action.payload;
            const setting = state.settings.find((item) => item.CS_KEY === key);
            // You can handle what to do if setting is not found// For example, you can throw an error or log a message
            if (setting) {
                console.log(setting);
            } else {
                console.log(`Setting with key ${key} not found.`);
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchApiSettings.fulfilled, (state, action) => {
            state.settings = action.payload;
        });
    }
});

export const { addSettings, updateSetting, deleteSettings } =
    settingSlice.actions;
export default settingSlice.reducer;
