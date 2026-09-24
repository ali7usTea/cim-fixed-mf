"use client";

import React from "react";
import AccountInfo from "./AccountInfo";
import InfoPanel from "./InfoPanel";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = "app.main.Pages.E-Hospitality";

const EHospitality: React.FunctionComponent = () => {
    return (
        <div title="E-Hospitality" className="flex flex-col gap-2">
            <InfoPanel />
            <AccountInfo />
        </div>
    );
};

export default EHospitality;
