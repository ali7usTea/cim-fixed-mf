"use client";

import { DataPanel, PanelData } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";

const FixedOnLTEPanel = ({
    onDataLoaded
}: {
    onDataLoaded: (data: { data: PanelData; refId?: string }) => void;
}) => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetDELOverLTEAccountDetailsFixed`}
            queryParams={{
                accountId: Object.keys(Customers)[0],
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            onDataLoaded={onDataLoaded}
            headerTitle="Fixed On LTE"
            shouldRender={checkGroupPermissionExists("DELoverLTE_group")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default FixedOnLTEPanel;
