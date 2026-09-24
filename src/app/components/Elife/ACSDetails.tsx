"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";

const ACSDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetDeviceInfoFromACS`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="ACS Details"
            shouldRender={true}
            viewLayout="table"
            debugMode={!!isDebugMode}
            data-testid="data-testid"
        />
    );
};

export default ACSDetails;
