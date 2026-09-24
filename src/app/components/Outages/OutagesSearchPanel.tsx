"use client";

import React from "react";
import {
    Button,
    DataPanel,
    RadioGroup,
    RadioGroupItem
} from "cim-ui-components";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { proxyURL } from "../../../utils/lib/proxyAPI";
import { usePermissionChecker } from "../../hooks/usePermissionsChecker";
import { CalendarInput } from "cim-ui-components";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CONTENT_USAGE = "app.main.Pages.Outages";

const OutagesSearchPanel: React.FunctionComponent = () => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [partyId, setPartyId] = React.useState("");

    const { Customers } = useSelector(
        (state: RootState) => state.customerslice
    );
    const { checkGroupPermissionExists } = usePermissionChecker();
    // clientLogger.info(`${LOGGER_CONTENT_USAGE}:Rendering Content Usage`);

    const handleSearch = () => {
        (globalThis as any).GetOutageDetailsInquiryLoadData();
    };
    const handleStartDate = (value: Date | undefined) => {
        if (value) {
            setStartDate(formatDate(value));
            const lastday = new Date(value);
            lastday.setMonth(lastday.getMonth() + 1);
            lastday.setDate(0); // set the lsat date of the month.
            setEndDate(
                formatDate(new Date(lastday.toISOString().split("T")[0]))
            );
        } else {
            setEndDate(new Date(""));
        }
    };
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return new Date(`${year}-${month}-${day}`);
    };

    const requiredOutPut = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const handlePartySelect = (value: string) => {
        if (partyId === value) {
            return setPartyId("");
        }

        setPartyId(value);
    };

    const isSearchBttnEnabled = React.useMemo(() => {
        return startDate && partyId;
    }, [startDate, partyId]);

    const isDebugMode = Customers[Object.keys(Customers)[0]]?.debugReport;

    return (
        <DataPanel
            autoPublish={false}
            showRefreshButton={false}
            api={`${proxyURL}/GetOutageDetailsInquiry`}
            queryParams={{
                [partyId === "account" ? "accountId" : "partyId"]:
                    partyId === "account"
                        ? Object.keys(Customers)[0]
                        : Customers[Object.keys(Customers)[0]]?.partyID,
                startDate: requiredOutPut(startDate),
                endDate: requiredOutPut(endDate),
                noOfRecords:
                    Customers[Object.keys(Customers)[0]]?.noOfRecords || 10,
                ...(isDebugMode ? { isDebugMode } : {})
            }}
            headerTitle="Outages Search Panel"
            shouldRender={checkGroupPermissionExists("outages_Pnl")}
            viewLayout="table"
            debugMode={!!isDebugMode}
        >
            <div className="flex text-xs items-center justify-end gap-2 pt-3">
                <div className="flex items-center gap-2">
                    <label htmlFor="sdate">Start Date:</label>
                    <CalendarInput
                        value={startDate}
                        onChange={handleStartDate}
                        id="sdate"
                        name="sdate"
                        className="flex gap-2 text-xs"
                        placeholder="YYYY-MM-DD"
                    />
                    <label htmlFor="edate">End Date:</label>
                    <CalendarInput
                        value={endDate}
                        onChange={(date) => date && setEndDate(date)}
                        id="edate"
                        name="edate"
                        className="flex gap-2 text-xs"
                        placeholder="YYYY-MM-DD"
                    />
                    <RadioGroup
                        value={partyId}
                        onValueChange={handlePartySelect}
                        className="flex justify-center w-fit gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="party" id="party" />
                            <label htmlFor="party">Party</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="account" id="account" />
                            <label htmlFor="account">Account</label>
                        </div>
                    </RadioGroup>
                </div>

                <Button
                    onClick={handleSearch}
                    name="search"
                    size="lg"
                    disabled={!isSearchBttnEnabled}
                >
                    Search
                </Button>
            </div>
        </DataPanel>
    );
};

export default OutagesSearchPanel;
