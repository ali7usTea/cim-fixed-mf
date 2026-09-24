"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const UMSSubscription: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetSubscriberInfoFromUMSForSubscriptions`}
            queryParams={{
                UNIQUE_NUMBER:
                    Customers[Object.keys(Customers)[0]]?.UNIQUE_NUMBER,
                ACTION_CODE: "GetSubscriberInfoFromUMSForSubscriptions",
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="UMS Subscription Details"
            shouldRender={checkGroupPermissionExists("elife_iptv_subDtls_pnl")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default UMSSubscription;
