"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Managed Services";

const MRWANProv: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering Services page.`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetManagedServicesMRWANProvDetails`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Managed Services MRWANProv Details"
            shouldRender={checkGroupPermissionExists(
                "managedServicesMrwanProvDetails_pnlGrp"
            )}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default MRWANProv;
