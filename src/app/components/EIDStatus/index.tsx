"use client";

import { DataPanel } from "cim-ui-components";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { debugReportURL, proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const EIDStatus: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    const rowExpansionTemplate = (data: any) => {
        const eidValue = data["GetEidDetailsByAccountNo.SUB_EID"];

        if (!eidValue || !checkGroupPermissionExists("eid_flat_details")) {
            return null;
        }

        return (
            <div className="p-4 bg-muted/50">
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/GetEidFlatDetails`}
                    queryParams={{ EID: eidValue }}
                    headerTitle="Etisalat ID Flat Details"
                    shouldRender={true}
                    viewLayout="table"
                    debugMode={!!isDebugMode}
                    debugRoute={`${debugReportURL}?query=GetEidFlatDetails?EID=${eidValue}`}
                />
            </div>
        );
    };

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetEidDetailsByAccountNo`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber
            }}
            headerTitle="Etisalat ID Inquiry"
            shouldRender={checkGroupPermissionExists("eid_pnlGrp")}
            viewLayout="table"
            rowExpansionTemplate={rowExpansionTemplate}
            showXlsExport
            debugMode={!!isDebugMode}
            showPdfExport={false}
            debugRoute={`${debugReportURL}?query=GetEidDetailsByAccountNo?accountnumber=${Customers[Object.keys(Customers)[0]]?.accountNumber
                }`}
            rowExpansionTitle="Sub EID"
        />
    );
};

export default EIDStatus;
