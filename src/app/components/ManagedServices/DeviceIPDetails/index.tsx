"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Device IP Details";

const DeviceIPDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Device IP Details page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetDeviceIPDetailsByAccountId`}
            queryParams={{
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Device IP Details"
            shouldRender={checkGroupPermissionExists("deviceIPDetailsGrp")}
            viewLayout="grid"
            debugMode={!!isDebugMode}
        />
    );
};

export default DeviceIPDetails;
