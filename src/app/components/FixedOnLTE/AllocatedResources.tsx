"use client";

import React from "react";
import { DataPanel, RowSelectionState } from "cim-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const AllocatedResources = ({
    selectedRow
}: {
    selectedRow: RowSelectionState | null;
}) => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();

    React.useEffect(() => {
        if (selectedRow && selectedRow["GSM Account Number"]) {
            (globalThis as any)?.allocatedResourceAndAllowanceTableLoadData();
        }
    }, [selectedRow]);

    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <div data-testid="Allocated Resources">
            <DataPanel
                autoPublish={true}
                showRefreshButton={false}
                api={`${proxyURL}/custom/fillAllocatedResources`}
                queryParams={{
                    accountnumber: Object.keys(Customers)[0],
                    GET_GSM_ACCOUNT_NUMBER: selectedRow?.["GET_GSM_ACCOUNT_NUMBER"],
                    ...(isDebugMode ? { isDebugMode } : {}),
                    ConsumedPackFlag: true
                }}
                headerTitle="Allocated Resources"
                shouldRender={checkGroupPermissionExists("allownceDetailsPanel")}
                viewLayout="table"
                debugMode={!!isDebugMode}
            />
        </div>
    );
};

export default AllocatedResources;
