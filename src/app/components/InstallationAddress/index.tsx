"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = 'app.main.Pages.InstallationAddress';

const InstallationAddress: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const CustomersInfo = Customers[Object.keys(Customers)[0]];
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <div className="flex flex-col gap-2">
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetInstallationAddress`}
                queryParams={{
                    accountId: CustomersInfo?.accountID,
                    partyId: CustomersInfo?.partyID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Installation Address"
                shouldRender={checkGroupPermissionExists(
                    "installationAddress_pnlGrp"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
                showPdfExport={false}
                debugRoute={`/fixed/debugReport?query=GetInstallationAddress&accountId=${CustomersInfo?.accountID}&partyId=${CustomersInfo?.partyID}`}
            />

            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetInstalledDeviceSiteDetailsFixed`}
                queryParams={{
                    accountId: CustomersInfo?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Installation Site"
                shouldRender={checkGroupPermissionExists(
                    "installationSite_pnlGrp"
                )}
                viewLayout="table"
                debugMode={!!isDebugMode}
                debugRoute={`/fixed/debugReport?query=GetInstalledDeviceSiteDetailsFixed&accountId=${CustomersInfo?.accountID}`}
            />
        </div>
    );
};

export default InstallationAddress;
