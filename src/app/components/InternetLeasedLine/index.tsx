"use client";

import {
    Button,
    CellContext,
    DataPanel,
    FlatRow,
    RowValue
} from "cim-ui-components";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../../providers/FetchDataProvider";
import { RootState } from "../../../redux/store";
import { debugReportURL, proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
import { DesktopIcon } from "../../icons/DesktopIcon";
// import { clientLogger } from '../../../../clientLogger';

// interface GetInternetLeasedLineSecondDetailsInterface extends FlatRow {
//     "GetInternetLeasedLineSecondDetails.PVP FRP ID": string;
// }
// const LOGGER_PAGE = 'app.main.Pages.InternetLeasedLine';

const CloudExpress = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    const { data } = useFetchData<any>(
        `${proxyURL}/GetCloudDetailsByAccount?accountId=${
            Customers[Object.keys(Customers)[0]]?.accountID
        }${isDebugMode ? `&isDebugMode=${isDebugMode}` : ""}`
    );

    const refId = data?.refId || "";

    return (
        <div
            title="Parents - Cloud Express Details"
            className="flex flex-col gap-2"
        >
            <DataPanel
                panelData={data?.data["GetCloudDetailsByAccount_MainTable"]}
                panelDataRefId={refId}
                autoPublish={true}
                headerTitle="Cloud Express Details"
                shouldRender={checkGroupPermissionExists(
                    "cloudExpressDetails_pnlGrp"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
                debugRoute={`${debugReportURL}?query=/GetCloudDetailsByAccount?accountId=${
                    Customers[Object.keys(Customers)[0]]?.accountID
                }`}
            />

            <DataPanel
                panelData={data?.data["privatePeering"]}
                panelDataRefId={refId}
                autoPublish={true}
                headerTitle="Private Peering"
                shouldRender={checkGroupPermissionExists(
                    "cloudExpressDetails_pnlGrp"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
                debugRoute={`${debugReportURL}?query=/GetCloudDetailsByAccount?accountId=${
                    Customers[Object.keys(Customers)[0]]?.accountID
                }`}
            />

            <DataPanel
                panelData={data?.data["publicPeering"]}
                panelDataRefId={refId}
                autoPublish={true}
                headerTitle="Public Peering"
                shouldRender={checkGroupPermissionExists(
                    "cloudExpressDetails_pnlGrp"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
                debugRoute={`${debugReportURL}?query=/GetCloudDetailsByAccount?accountId=${
                    Customers[Object.keys(Customers)[0]]?.accountID
                }`}
            />
        </div>
    );
};

const InternetLeasedLine: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    // 1. Only one state for the data (the truth)
    const [selectedRowData, setSelectedRowData] = React.useState<
        (FlatRow & { index: number }) | undefined
    >();
    const [selectedRows, setSelectedRows] = React.useState<FlatRow[]>([]);

    const onRowSelectionChange = React.useCallback(
        (updater: FlatRow[] | ((prev: FlatRow[]) => FlatRow[])) => {
            setSelectedRows(updater);
        },
        []
    );

    const handleSelection = React.useCallback(
        ({ row, table }: CellContext<FlatRow, RowValue>) => {
            const isSelected = row.getIsSelected();
            table.resetRowSelection();

            if (!isSelected) {
                row.toggleSelected(true, { selectChildren: false });
                setSelectedRowData({ ...row.original, index: row.index });
            } else {
                setSelectedRowData(undefined);
            }
        },
        []
    );

    // 3. Clean Button
    const preColumnButton = (ctx: CellContext<FlatRow, RowValue>) => (
        <Button variant="ghost" onClick={() => handleSelection(ctx)}>
            <DesktopIcon
                className={
                    ctx.row.getIsSelected() ? "text-primary" : "text-orange-500"
                }
            />
        </Button>
    );
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering InternetLeasedLine Details`);

    return (
        <div className="flex flex-col gap-2">
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetInternetLeasedLineDetails`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Data/Leased Line"
                shouldRender={checkGroupPermissionExists(
                    "internetLeasedLine_pnlGrp"
                )}
                viewLayout="table"
                debugMode={!!isDebugMode}
            />

            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetInternetLeasedLineSecondDetails`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                shouldRender={checkGroupPermissionExists(
                    "internetLeasedLine_pnlGrp"
                )}
                headerTitle="Internet Leased Line Second Details"
                viewLayout="table"
                debugMode={!!isDebugMode}
                selectedRows={selectedRows}
                setSelectedRows={onRowSelectionChange}
                hideSelectionCheckbox
                leadingColumns={[
                    {
                        title: "Details",
                        component: preColumnButton
                    }
                ]}
            />

            {selectedRowData && (
                <Fragment>
                    <DataPanel
                        autoPublish={true}
                        api={`${proxyURL}/custom/accountPVPInquiry`}
                        queryParams={{
                            IN_PVP_FRP_ID: `${selectedRowData?.["GetInternetLeasedLineSecondDetails.PVP FRP ID"]}`,
                            tableName: "globalNetworkDetails",
                            ...(isDebugMode ? { isDebugMode } : {})
                        }}
                        shouldRender={checkGroupPermissionExists(
                            "internetLeasedLine_pnlGrp"
                        )}
                        headerTitle="Global Network Details"
                        viewLayout="table"
                        debugMode={!!isDebugMode}
                    />

                    <DataPanel
                        autoPublish={true}
                        api={`${proxyURL}/custom/accountPVPInquiry`}
                        queryParams={{
                            IN_PVP_FRP_ID: `${selectedRowData["GetInternetLeasedLineSecondDetails.PVP FRP ID"]}`,
                            tableName: "siteADetails",
                            ...(isDebugMode ? { isDebugMode } : {})
                        }}
                        shouldRender={checkGroupPermissionExists(
                            "internetLeasedLine_pnlGrp"
                        )}
                        headerTitle="Site A Details"
                        viewLayout="table"
                        debugMode={!!isDebugMode}
                    />

                    <DataPanel
                        autoPublish={true}
                        api={`${proxyURL}/custom/accountPVPInquiry`}
                        queryParams={{
                            IN_PVP_FRP_ID: `${selectedRowData["GetInternetLeasedLineSecondDetails.PVP FRP ID"]}`,
                            tableName: "siteBDetails",
                            ...(isDebugMode ? { isDebugMode } : {})
                        }}
                        shouldRender={checkGroupPermissionExists(
                            "internetLeasedLine_pnlGrp"
                        )}
                        headerTitle="Site B Details"
                        viewLayout="table"
                        debugMode={!!isDebugMode}
                    />

                    <DataPanel
                        autoPublish={true}
                        api={`${proxyURL}/custom/accountPVPInquiry`}
                        queryParams={{
                            IN_PVP_FRP_ID: `${selectedRowData["GetInternetLeasedLineSecondDetails.PVP FRP ID"]}`,
                            tableName: "circuitPointDetails",
                            ...(isDebugMode ? { isDebugMode } : {})
                        }}
                        shouldRender={checkGroupPermissionExists(
                            "internetLeasedLine_pnlGrp"
                        )}
                        headerTitle="Circuit Point Details"
                        viewLayout="table"
                        debugMode={!!isDebugMode}
                    />
                </Fragment>
            )}

            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetPOPDetails`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="POP Details"
                shouldRender={checkGroupPermissionExists("popDetailsGrd")}
                viewLayout="grid"
                debugMode={!!isDebugMode}
            />

            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetIPRanges`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="IP Ranges"
                shouldRender={checkGroupPermissionExists("ipRangesTbl")}
                viewLayout="table"
                debugMode={!!isDebugMode}
            />

            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetAccountPortInquiry`}
                queryParams={{
                    "PVP FRP ID":
                        Customers[Object.keys(Customers)[0]]?.["PVP FRP ID"],
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Account Port/XPath Summary"
                shouldRender={checkGroupPermissionExists("accountPortHeader")}
                viewLayout="grid"
                debugMode={!!isDebugMode}
            />

            <DataPanel
                autoPublish={selectedRowData ? true : false}
                api={`${proxyURL}/custom/accountPVPInquiry`}
                queryParams={{
                    IN_PVP_FRP_ID: `${selectedRowData?.["GetInternetLeasedLineSecondDetails.PVP FRP ID"]}`,
                    tableName: "accountPortXpathDetails",
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Account Port/XPath Details"
                shouldRender={checkGroupPermissionExists(
                    "accountPortHeaderDetails"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
            />

            <CloudExpress />
        </div>
    );
};

export default InternetLeasedLine;
