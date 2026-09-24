"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.Locnet";

const DIDDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetDIDDetails`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                actionCode: "GetDIDDetails",
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="View Details"
            shouldRender={checkGroupPermissionExists(
                "DIDSummaryAndDetails_pnlGrp"
            )}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default DIDDetails;
