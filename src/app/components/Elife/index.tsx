"use client";

import React from "react";
import ACSDetails from "./ACSDetails";
import AdslDetails from "./AdslDetails";
import ELifeInterimDetails from "./ElifeInterimDetails";
import IPTVDetail from "./IPTVDetail";
import MPhone from "./MPhone";
import PstnDetail from "./PstnDetail";
import UMSDEvice from "./UMSDevice";
import UMSSubscription from "./UMSSubscription";
import VirtualCPE from "./VirtualCPE";
import STBAccountDetails from "./STBAccountDetails";
import WebTVAccountDetails from "./WebTVAccountDetails";
// import { clientLogger } from '../../../../clientLogger';
// const LOGGER_PAGE = 'app.main.Pages.Elife details';

const Elife: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-2">
            <PstnDetail />
            <AdslDetails />
            <IPTVDetail />
            <VirtualCPE />
            <UMSDEvice />
            <UMSSubscription />
            <ACSDetails />
            <STBAccountDetails />
            <WebTVAccountDetails />
            <MPhone />
            <ELifeInterimDetails />
        </div>
    );
};

export default Elife;
