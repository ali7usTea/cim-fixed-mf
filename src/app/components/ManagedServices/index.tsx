"use client";

import React from "react";
import Gipvpn from "./Gipvpn";
import CPETechnicalDetails from "./CPETechnicalDetails";
import DataPortCustomerWAN_IP from "./DataPortCustomerWAN_IP";
import MRWANProv from "./MRWANProv";
import LanBroadcastSubnets from "./LanBroadcastSubnets";
import MSSPortMgmtWAN_IP from "./MSSPortMgmtWAN_IP";
import DeviceIPDetails from "./DeviceIPDetails";
import FileUpload from "./FileUpload";
import FromToIPAddressIDA from "./FromToIPAddressIDA";
import Main_ManagedServices from "./Main";
// import { clientLogger } from '../../../../clientLogger';

// const LOGGER_PAGE = "app.main.Pages.Managed Services";

const ManagedServices: React.FunctionComponent = () => {
    return (
        <div title="Managed Services" className="flex flex-col gap-2">
            <Main_ManagedServices />
            <Gipvpn />
            <CPETechnicalDetails />
            {/* GIPVPN Details panel had no content */}
            <DataPortCustomerWAN_IP />
            <MRWANProv />
            <LanBroadcastSubnets />
            <MSSPortMgmtWAN_IP />
            <DeviceIPDetails />
            <FileUpload />
            <FromToIPAddressIDA />
        </div>
    );
};

export default ManagedServices;
