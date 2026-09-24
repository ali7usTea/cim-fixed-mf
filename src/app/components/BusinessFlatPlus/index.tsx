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

// interface BusinessFlatPlusDetails extends FlatRow {
//     "GetBusinessFlatPlusDetails.RATE_PLAN_CODE": string;
//     "GetBusinessFlatPlusDetails.EFFECTIVEFROMDATE": string;
//     "GetBusinessFlatPlusDetails.CORPORATE_NAME": string;
//     "GetBusinessFlatPlusDetails.CCID": string;
//     "GetBusinessFlatPlusDetails.SITE_ID": string;
//     "GetBusinessFlatPlusDetails.SITE_NAME": string;
// }

const BusinessFlatPlus: React.FunctionComponent = () => {
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
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    return (
        <>
            <DataPanel
                autoPublish={true}
                api={`${proxyURL}/GetBusinessFlatPlusDetails`}
                queryParams={{
                    accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                    actionCode: "GetBusinessFlatPlusDetails",
                    ...(isDebugMode
                        ? { isDebugMode }
                        : {}) /* Add isDebugMode only if it is true */
                }}
                selectedRows={selectedRows}
                setSelectedRows={onRowSelectionChange}
                hideSelectionCheckbox
                debugMode={!!isDebugMode}
                headerTitle="Voice Usage Plan Details"
                shouldRender={checkGroupPermissionExists(
                    "businessFlatPlusDetailsTbl"
                )} /* No group permission found in JSF code. */
                viewLayout="table"
                leadingColumns={[
                    {
                        title: "view",
                        component: preColumnButton
                    }
                ]}
            />

            {selectedRowData && (
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/GetCorporateCustomerVoiceUsagePlanDetails`}
                    queryParams={{
                        IN_CCID: `${selectedRowData?.["GetBusinessFlatPlusDetails.CCID"]}`,
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    debugMode={!!isDebugMode}
                    headerTitle="Corporate Customer Voice Usage Plan Details"
                    shouldRender={checkGroupPermissionExists("CCID_Table")}
                    viewLayout="table"
                />
            )}
        </>
    );
};

export default BusinessFlatPlus;
