"use client";
import React from "react";
import { DataPanel } from "cim-ui-components";
import DIDDetails from "./DIDDetails";
import DIDSummary from "./DIDSummary";
import DIDRange from "./DIDRange";
import PABXPilotDetails from "./PABXPilotDetails";
import HypoLinesPanel from "./HypoLinesPanel";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_CMSACCOUNT_PAGE = "app.main.Pages.Locnet";

const PABXDetails: React.FunctionComponent = () => {
    return (
        <div title="PABX Details" className="flex flex-col gap-2">
            <PABXPilotDetails />
            <HypoLinesPanel />
            <DIDRange />
            <DIDSummary />
            <DIDDetails />
        </div>
    );
};

export default PABXDetails;
