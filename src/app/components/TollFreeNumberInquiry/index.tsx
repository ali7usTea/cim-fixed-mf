"use client";
import {
    Button,
    CellContext,
    DataPanel,
    FlatRow,
    RowValue
} from "cim-ui-components";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
import { DesktopIcon } from "../../icons/DesktopIcon";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.BusinessFlatPlus";

const TollFreeNumberInquiry: React.FunctionComponent = () => {
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
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    return (
        <div title="BusinessFlatPlus" className="flex flex-col gap-2">
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/getTollFreeNumberInquiryUser`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="AFS Details"
                shouldRender={checkGroupPermissionExists(
                    "tollFreeNumberInquiry_pnlGrp"
                )}
                viewLayout="grid"
                debugMode={!!isDebugMode}
                debugRoute={`/fixed/debugReport?query=getTollFreeNumberInquiryUser`}
            />
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/getTollFreeNumberInquiry`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="Number Details"
                shouldRender={checkGroupPermissionExists(
                    "tollFreeNumberInquiry_pnlGrp"
                )}
                viewLayout="table"
                debugMode={!!isDebugMode}
                selectedRows={selectedRows}
                setSelectedRows={onRowSelectionChange}
                hideSelectionCheckbox
                debugRoute={`/fixed/debugReport?query=getTollFreeNumberInquiry`}
                leadingColumns={[
                    {
                        title: "Details",
                        component: preColumnButton
                    }
                ]}
            />
            {selectedRowData && (
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/GetCorporateCustomerVoiceUsagePlanDetails`}
                    queryParams={{
                        IN_CCID: `${selectedRowData["getTollFreeNumberInquiry.TERM_ID"]}`,
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    headerTitle="Alternate Routing Number"
                    shouldRender={checkGroupPermissionExists(
                        "inquireAlternateRoutingDetails_pnlGrp"
                    )}
                    viewLayout="table"
                    debugMode={!!isDebugMode}
                    debugRoute={`/fixed/debugReport?query=GetCorporateCustomerVoiceUsagePlanDetails`}
                />
            )}
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetAFSOriginList`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    ...(isDebugMode ? { isDebugMode } : {})
                }}
                headerTitle="AFS Origin List"
                shouldRender={checkGroupPermissionExists(
                    "inquireAFSOriginListbyAccountID_pnlGrp"
                )}
                viewLayout="table"
                debugMode={!!isDebugMode}
                debugRoute={`/fixed/debugReport?query=GetAFSOriginList`}
            />
        </div>
    );
};

export default TollFreeNumberInquiry;
