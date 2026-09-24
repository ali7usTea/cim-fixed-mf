"use client";

import React from "react";
import { DataPanel } from "cim-ui-components";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../../hooks/usePermissionsChecker";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.File.Upload";

const FileUpload: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;
    // clientLogger.info(`${LOGGER_PAGE}:Rendering file uploading`);

    return (
        <DataPanel
            autoPublish={true}
            api={`${proxyURL}/GetFileUploadDetailsByAccountId`}
            queryParams={{
                accountId: Customers[Object.keys(Customers)[0]]?.accountID,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="File Upload Details"
            shouldRender={checkGroupPermissionExists("fileUploadDetailsGrp")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        />
    );
};

export default FileUpload;
