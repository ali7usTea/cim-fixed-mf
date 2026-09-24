"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Managed Services - Main";

const Main_ManagedServices: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services Main page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetManagedServicesDataPortDetails`}
            queryParams={{
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Main Info"
            shouldRender={checkGroupPermissionExists(
                "managed_services_main_info_pnlGrp"
            )}
            viewLayout="grid"
            showPdfExport={false}
            debugMode={!!isDebugMode}
        />
    );
};

export default Main_ManagedServices;
