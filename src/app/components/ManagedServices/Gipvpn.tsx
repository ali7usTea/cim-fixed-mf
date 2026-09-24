"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Managed Services";

const Gipvpn: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services page.`);

    return (
        <>
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetManagedServicesDataPortDetails`}
                queryParams={{
                    accountnumber:
                        Customers[Object.keys(Customers)[0]]?.accountNumber,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Main Details"
                shouldRender={checkGroupPermissionExists(
                    "managedServicesGIPVPNDetailsGrd"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
            />
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetManagedServicesDataPortDetails`}
                queryParams={{
                    accountnumber:
                        Customers[Object.keys(Customers)[0]]?.accountNumber,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Account Details"
                shouldRender={checkGroupPermissionExists(
                    "GIPVPNAccountDetailsGrd"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
            />
        </>
    );
};

export default Gipvpn;
