"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const CCB: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetPiddFixed`}
            queryParams={{
                EID: Customers[Object.keys(Customers)[0]]?.EID,
                accountNumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="CCB"
            shouldRender={checkGroupPermissionExists("pidd_pnlGrp")}
            debugMode={!!isDebugMode}
            viewLayout="table"
        />
    );
};

export default CCB;
