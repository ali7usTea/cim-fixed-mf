"use client";
import React from "react";
import OutagesDates from "./OutagesDates";
import OutagesSearchPanel from "./OutagesSearchPanel";
// import { clientLogger } from '../../../../clientLogger';

// const LOGGER_PAGE = "app.main.Pages.Outages";

const Outages: React.FunctionComponent = () => {
    return (
        <div title="Outages" className="flex flex-col gap-2">
            <OutagesDates />
            <OutagesSearchPanel />
        </div>
    );
};

export default Outages;
