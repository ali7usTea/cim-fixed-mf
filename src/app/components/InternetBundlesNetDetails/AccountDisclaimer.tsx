"use client";

import React, { Fragment } from "react";
import { DataPanel } from "cim-ui-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import axios from "axios";
import { proxyURL } from "../../../utils/lib/proxyAPI";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.Internet Bundles Internet Net Details";

const AccountDisclaimer: React.FunctionComponent = () => {
    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const [shouldShowAccountDetails, setShouldShowAccountDetails] =
        React.useState(false);

    const [disclaimerData, setDisclaimerData] = React.useState(null);

    const fetchDisclaimerData = React.useCallback(async () => {
        try {
            const response = await axios.get(
                `${proxyURL}/custom/getUCAASTotalNetDetails?accountId=${
                    Customers[Object.keys(Customers)[0]]?.accountID
                }&actionCode=getUCAASTotalNetDetails&GET_TOTALNET_ACCOUNT=false`
            );

            setDisclaimerData(
                response.data.data.renderDisplayTotalNetAccountDisclaimer
            );
        } catch (error) {}
    }, []);

    React.useEffect(() => {
        fetchDisclaimerData();
    }, [fetchDisclaimerData]);

    if (!disclaimerData) {
        return <></>;
    }
    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <Fragment>
            {!shouldShowAccountDetails ? (
                <>
                    <p className="ucaasTotalNetAccountDetailsDisclaimer text-default text-sm">
                        Current searched account{" "}
                        <span className="text-base text-black-500">
                            {
                                Customers[Object.keys(Customers)[0]]
                                    ?.accountNumber
                            }
                        </span>{" "}
                        is a Internet Bundles Voice Line
                    </p>
                    <p
                        className="ucaas_total_details_btn  text-default text-sm"
                        onClick={() => setShouldShowAccountDetails(true)}
                    >
                        Display Internet Bundles
                    </p>
                </>
            ) : (
                <DataPanel
                    autoPublish={true}
                    api={`${proxyURL}/custom/getUCAASTotalNetDetails`}
                    queryParams={{
                        accountId:
                            Customers[Object.keys(Customers)[0]]?.accountID,
                        actionCode: "getUCAASTotalNetDetails",
                        GET_TOTALNET_ACCOUNT: true,
                        ...(isDebugMode ? { isDebugMode } : {})
                    }}
                    headerTitle="Admin Details"
                    shouldRender={disclaimerData}
                    viewLayout=",grid"
                    debugMode={!!isDebugMode}
                />
            )}
        </Fragment>
    );
};

export default AccountDisclaimer;
