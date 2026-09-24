"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Internet Bundles Internet Net Details";

const AdminDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetCRMGatewayContacts`}
            queryParams={{
                partyId: Customers[Object.keys(Customers)[0]]?.partyID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Admin Details"
            shouldRender={checkGroupPermissionExists("adminDetails_pnl")}
            viewLayout="table"
            showPdfExport={false}
            debugMode={!!isDebugMode}
        />
    );
};

export default AdminDetails;
