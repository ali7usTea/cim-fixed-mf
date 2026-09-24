"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const IPTVDetail: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetELifeIptvDetails`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="IPTV Details"
            shouldRender={checkGroupPermissionExists("elife_iptv_pnl")}
            viewLayout="table"
            showPdfExport={false}
            debugMode={!!isDebugMode}
        />
    );
};

export default IPTVDetail;
