import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./auth/authSlice";
import settingSlice from "./settings/settingSlice";
import agentSlice from "./TabsData/SMSShortCodeDetailsTabSlice";
import SMSShortCodeDetailsTab from "./TabsData/SMSShortCodeDetailsTabSlice";
import customerslice from "./customer/customerSlice";
import TabPermisionslice from "./tabPermission/tabPermssionSlice";
import GroupPermisionslice from "./groupPermission/groupPermssionSlice";
import ActionReportTabSlice from "./TabsData/ActionReportTabSlice";
import notifications from "./notifications";

const rootReducer = combineReducers({
    auth: authSlice,
    settingSlice,
    agentSlice,
    SMSShortCodeDetailsTab,
    customerslice,
    TabPermisionslice,
    GroupPermisionslice,
    ActionReportTabSlice,
    notifications
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export const UseAppDispatch: () => AppDispatch = useDispatch;
