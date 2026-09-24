"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.Locnet";

const DIDRange: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    return (
        <DataPanel
            showRefreshButton={false}
            autoPublish={true}
            api={`${proxyURL}/GetDIDRangeDetails`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                actionCode: "GetDIDRangeDetails",
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="DID Range"
            shouldRender={checkGroupPermissionExists("DID_Range_pnlGrp")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default DIDRange;
