"use client";

import React from "react";
import { CellContext, DataPanel, FlatRow, RowValue } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
import { Button } from "cim-ui-components";

const leadingColumnComponent = ({ row }: CellContext<FlatRow, RowValue>) => {
    return (
        <Button variant="ghost" onClick={() => console.log("Btn clicked", row)}>
            Download
        </Button>
    );
};

const InfoPanel: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            leadingColumns={[
                {
                    title: "Download",
                    component: leadingColumnComponent
                }
            ]}
            api={`${proxyURL}/GetEHospitalityDocuments`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Project Document Details"
            shouldRender={checkGroupPermissionExists("eHospitalityGrp")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default InfoPanel;
