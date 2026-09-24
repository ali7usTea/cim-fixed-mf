"use client";

import axios from "axios";
import {
    Button,
    DataPanel,
    FlatRow,
    PanelData
} from "cim-ui-components";
import React, { Fragment, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "../../../redux/store";
import { debugReportURL, proxyURL } from "../../../utils/lib/proxyAPI";

const STBAccountDetails: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const customer = Customers[Object.keys(Customers)[0]];
    const isDebugMode = customer?.debugReport;

    const { accountNumber, productCode, userName, accountID } = customer || {};

    const [selectedRows, setSelectedRows] = React.useState<FlatRow[]>([]);

    const onRowSelectionChange = React.useCallback(
        (updater: FlatRow[] | ((prev: FlatRow[]) => FlatRow[])) => {
            setSelectedRows(updater);
        },
        []
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const [panelData, setPanelData] = React.useState<PanelData | null>(null);
    const [refId, setRefId] = React.useState<string>("");
    const [error, setError] = React.useState<Error | null>(null);

    // Memoize the flat data for easier mapping/extraction
    const rows = useMemo(() => {
        return panelData?.["GetELifeStbDetails_MainTable"]?.rows || [];
    }, [panelData]);

    const getSTBData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${proxyURL}/GetELifeStbDetails`, {
                params: {
                    accountId: accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }
            });
            setPanelData(res?.data?.data);
            setRefId(res?.data?.refId || "");
        } catch (error) {
            console.error("Failed to fetch STB data", error);
            setError(error instanceof Error ? error : new Error("Failed to fetch STB data"));
        } finally {
            setIsLoading(false);
        }
    }, [accountID, isDebugMode]);

    React.useEffect(() => {
        getSTBData();
    }, [getSTBData]);

    const resetPassword = async () => {
        if (!selectedRows.length) {
            return toast.error("Error", {
                description: "No rows selected!",
                duration: 3000
            });
        }

        const joinedSerialNumber = selectedRows
            .map(
                (row) =>
                    row["GetELifeStbDetails.STB_NUMBER"]
            )
            .join(";");

        try {
            await axios.get(
                `${proxyURL}/ResetSTBPassword?accountnumber=${accountNumber}&userName=${userName}&productCode=${productCode}&STB_SERIAL_NUMBER=${joinedSerialNumber}`
            );
            toast.success("Success", {
                description: "Request sent successfully",
                duration: 3000
            });
        } catch (error) {
            toast.error("Error", {
                description: "An error occured while sending your request!",
                duration: 3000
            });
        }
    };

    return (
        <Fragment>
            <DataPanel
                selectedRows={selectedRows}
                setSelectedRows={onRowSelectionChange}
                autoPublish={true}
                headerTitle="STB Details"
                panelData={panelData ?? {}}
                isLoading={isLoading}
                onRefresh={getSTBData}
                error={error}
                panelDataRefId={refId}
                shouldRender={true}
                viewLayout="table"
                debugMode={!!isDebugMode}
                showPdfExport={false}
                debugRoute={`${debugReportURL}?query=/GetELifeStbDetails?accountId=${accountID}`}
            />

            <div className="flex justify-end">
                <Button
                    type="button"
                    onClick={resetPassword}
                    disabled={rows.length === 0}
                    className={'text-xs'}
                >
                    Reset Password
                </Button>
            </div>
        </Fragment>
    );
};

export default STBAccountDetails;
