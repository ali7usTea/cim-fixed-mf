"use client";

import React, { Fragment, useCallback, useMemo } from "react";
import { Button, DataPanel, FlatRow, PanelData } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL, debugReportURL } from "../../../utils/lib/proxyAPI";
import axios from "axios";
import { toast } from "sonner";

const WebTVAccountDetails: React.FunctionComponent = () => {
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

    const rows = useMemo(() => {
        return panelData?.["GetELifeWebtvDetails_MainTable"]?.rows || [];
    }, [panelData]);

    const getSTBData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${proxyURL}/GetELifeWebtvDetails`, {
                params: {
                    accountId: accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }
            });
            setPanelData(res?.data?.data);
            setRefId(res?.data?.refId || "");
        } catch (error) {
            setError(error instanceof Error ? error : new Error("Failed to fetch WebTV data"));
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
            .map((row) => {
                // Support both flat value or nested value object based on DataPanel processing
                return (
                    row["USER_NAME"] ||
                    row["GetELifeWebtvDetails.USER_NAME"]
                );
            })
            .join(";");

        try {
            await axios.get(
                `${proxyURL}/ResetWebTvPassword?accountnumber=${accountNumber}&userName=${userName}&productCode=${productCode}&IPTV_WEB_USERNAME=${joinedSerialNumber}`
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
                headerTitle="Web TV Details"
                panelData={panelData ?? {}}
                isLoading={isLoading}
                onRefresh={getSTBData}
                error={error}
                panelDataRefId={refId}
                shouldRender={true}
                viewLayout="table"
                debugMode={!!isDebugMode}
                showPdfExport={false}
                debugRoute={`${debugReportURL}?query=/GetELifeWebtvDetails?accountId=${accountID}`}
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

export default WebTVAccountDetails;
