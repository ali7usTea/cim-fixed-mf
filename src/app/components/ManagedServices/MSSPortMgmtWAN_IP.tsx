"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Managed Services";

const MSSPortMgmtWAN_IP: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetMSSPortMgmtWanIPDetailsByAccountId`}
            queryParams={{
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="MSS Port Management Wan IP Details By AccountId"
            shouldRender={checkGroupPermissionExists("deviceIPGrp")}
            viewLayout="grid"
            showPdfExport={false}
            debugMode={!!isDebugMode}
        />
    );
};

export default MSSPortMgmtWAN_IP;
