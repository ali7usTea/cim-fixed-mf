"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.Locnet";

const DIDSummary: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetDIDSummary`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                actionCode: "GetDIDSummary",
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="DID Summary"
            shouldRender={checkGroupPermissionExists(
                "DIDSummaryAndDetails_pnlGrp"
            )}
            viewLayout="grid"
            debugMode={!!isDebugMode}
            debugRoute={`/fixed/debugReport?query=GetDIDSummary`}
        />
    );
};

export default DIDSummary;
