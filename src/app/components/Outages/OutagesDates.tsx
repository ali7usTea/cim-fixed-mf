"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Managed Services";

const OutagesDates: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services page.`);

    return (
        <div title="outages-dates-table">
            <div className="px-2 py-2 w-full h-full mb-2">
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/GetFreezeOutages`}
                    queryParams={{
                        accountId: Object.keys(Customers)[0],
                        actionCode: "GetFreezeOutages",
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    headerTitle="Outages Dates"
                    shouldRender={checkGroupPermissionExists(
                        "outagesfreezedatesTbl"
                    )}
                    viewLayout="table"
                    debugMode={!!isDebugMode}
                />
            </div>
        </div>
    );
};

export default OutagesDates;
