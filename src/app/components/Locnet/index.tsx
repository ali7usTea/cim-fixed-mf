"use client";

import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import { clientLogger } from '../../clientLogger';

// const LOGGER_LOCNETCIRCUIT_PAGE = 'app.main.Pages.LOCNET_CIRCUIT_DETAILS';

const LocnetCircuitDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { accountNumber } = Customers[Object.keys(Customers)[0]] || "";
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    const [isLoading, setIsLoading] = useState(true);
    const [panelData, setPanelData] = useState<any>(null);
    const [refId, setRefId] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);

    // clientLogger.info(`${LOGGER_LOCNETCIRCUIT_PAGE}:Rendering Locnet Circuit Details`);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const accountId = Object.keys(Customers)[0];
            const response = await axios.get(
                `${proxyURL}/custom/getAccountCircuitDetails`,
                {
                    params: {
                        accountId,
                        actionCode: "GetAccountCircuitDetails",
                        ...(isDebugMode ? { isDebugMode: true } : {})
                    }
                }
            );
            setPanelData(response.data?.data);
            setRefId(response.data?.refId || "");
        } catch (error) {
            console.error("Error fetching locnet circuit details:", error);
            setPanelData(null);
            setError(error instanceof Error ? error : new Error("Failed to fetch Account Circuit Details"));
            setRefId("");
        } finally {
            setIsLoading(false);
        }
    }, [Customers, isDebugMode]);

    useEffect(() => {
        if (Object.keys(Customers).length > 0) {
            fetchData();
        }
    }, [Customers, isDebugMode]);

    return (
        <div className="locnet-circuit-details flex flex-col gap-2">
            <DataPanel
                panelData={{ Non_Table_Data: panelData?.["Non_Table_Data"] }}
                headerTitle="Port Number"
                viewLayout="grid"
                isLoading={isLoading}
                debugMode={!!isDebugMode}
                shouldRender={true}
                autoPublish={true}
                onRefresh={fetchData}
                panelDataRefId={refId}
                error={error}
                showPdfExport={false}
                debugRoute={`/fixed/debugReport?query=/custom/getAccountCircuitDetails?accountnumber=${accountNumber}`}
            />
            <DataPanel
                panelData={{
                    "GetAccountCircuitDetails.COMMON_DETAILS":
                        panelData?.["GetAccountCircuitDetails.COMMON_DETAILS"]
                }}
                headerTitle="Common Details"
                viewLayout="table"
                isLoading={isLoading}
                debugMode={!!isDebugMode}
                shouldRender={true}
                autoPublish={true}
                onRefresh={fetchData}
                error={error}
                panelDataRefId={refId}
                showPdfExport={false}
                debugRoute={`/fixed/debugReport?query=/custom/getAccountCircuitDetails?accountnumber=${accountNumber}`}
            />
            <DataPanel
                panelData={{
                    "GetAccountCircuitDetails.LOCNET_DETAILS":
                        panelData?.["GetAccountCircuitDetails.LOCNET_DETAILS"]
                }}
                headerTitle="Locnet Details"
                viewLayout="table"
                isLoading={isLoading}
                debugMode={!!isDebugMode}
                shouldRender={true}
                autoPublish={true}
                onRefresh={fetchData}
                error={error}
                panelDataRefId={refId}
                showPdfExport={false}
                debugRoute={`/fixed/debugReport?query=/custom/getAccountCircuitDetails?accountnumber=${accountNumber}`}
            />
            <DataPanel
                panelData={{
                    "GetAccountCircuitDetails.CIRCUIT_DETAILS":
                        panelData?.["GetAccountCircuitDetails.CIRCUIT_DETAILS"]
                }}
                headerTitle="Circuit Details"
                viewLayout="grid"
                isLoading={isLoading}
                debugMode={!!isDebugMode}
                shouldRender={true}
                autoPublish={true}
                onRefresh={fetchData}
                error={error}
                panelDataRefId={refId}
                showPdfExport={false}
                debugRoute={`/fixed/debugReport?query=/custom/getAccountCircuitDetails?accountnumber=${accountNumber}`}
            />
        </div>
    );
};

export default LocnetCircuitDetails;
