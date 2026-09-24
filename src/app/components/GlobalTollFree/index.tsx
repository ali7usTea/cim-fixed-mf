"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Global Toll Free";

const GlobalTollFree: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering call forwading page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetTollFreeRoutingNumberInfo`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Global Toll Free Details"
            shouldRender={checkGroupPermissionExists("global_toll_Pnl")}
            viewLayout="table"
            debugMode={!!isDebugMode}
            debugRoute={`/fixed/debugReport?query=GetTollFreeRoutingNumberInfo&accountnumber=${
                Customers[Object.keys(Customers)[0]]?.accountNumber
            }`}
        />
    );
};

export default GlobalTollFree;
