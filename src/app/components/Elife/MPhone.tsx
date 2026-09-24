"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";

const MPhone: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetELifeMphoneDetails`}
            queryParams={{
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Mphone Details"
            shouldRender={true}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default MPhone;
