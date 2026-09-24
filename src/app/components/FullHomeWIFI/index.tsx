"use client";
import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.FullHomeWIFI";

const FullHomeWIFI: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_CMSACCOUNT_PAGE}:Rendering CMS Account Details`);

    // https://next.cimnewuat.etisalat.corp.ae/v1/bff/fixed/GetHomeWifiDevicesDetails?accountnumber=065213300
    return (
        <div title="GetHomeWifiDevicesDetails-contractEndDate" className="GetHomeWifiDevicesDetails-contractEndDate" >
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetHomeWifiDevicesDetails`}
            queryParams={{
                accountnumber:
                    Customers[Object.keys(Customers)[0]]?.accountNumber,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Contract End Date,Device Details"
            shouldRender={checkGroupPermissionExists("home_Wifi_pnl")}
            viewLayout="grid"
            debugMode={!!isDebugMode}
        />
        </div>
        // <>
        //     <div title="GetHomeWifiDevicesDetails-contractEndDate">
        //         <div className="px-2 py-2 w-full h-full mb-2">
        //             <DataPanel
        //                 autoPublish={true}
        //                 api={`${proxyURL}/custom/getHomeWifiDevicesDetails`}
        //                 queryParams={{
        //                     accountnumber: Customers[Object.keys(Customers)[0]]?.accountNumber,
        //                     tableName: "contractEndDate",
        //                     ...(isDebugMode ? { isDebugMode } : {})
        //                 }}
        //                 headerTitle="Contract End Date"
        //                 shouldRender={
        //                     checkGroupPermissionExists('contract_End_Date_pnl')
        //                 }
        //                 viewLayout="grid"
        //                 debugMode={!!isDebugMode}
        //             />
        //         </div>
        //     </div>
        // </>
    );
};

export default FullHomeWIFI;
