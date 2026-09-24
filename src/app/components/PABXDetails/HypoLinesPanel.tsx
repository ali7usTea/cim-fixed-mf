"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.Locnet";

const HypoLinesPanel: React.FunctionComponent = () => {
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
            api={`${proxyURL}/GetHypoLinesDetails`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                actionCode: "GetHypoLinesDetails",
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Hypo Lines Inquiry"
            shouldRender={checkGroupPermissionExists("Hypo_Lines_pnlGrp")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default HypoLinesPanel;
