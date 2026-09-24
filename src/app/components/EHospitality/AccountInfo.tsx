"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const AccountInfo: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetEHospitalityAccountDetails`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="E-Hospitality Accounts"
            shouldRender={checkGroupPermissionExists("eHospitalityAccDtlGrp")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default AccountInfo;
