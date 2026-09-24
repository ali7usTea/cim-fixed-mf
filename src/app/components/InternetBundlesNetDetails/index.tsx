"use client";

import React from "react";
import AdminDetails from "./AdminDetails";
import AccountDisclaimer from "./AccountDisclaimer";

// const LOGGER_PAGE = "app.main.Pages.Internet Bundles Internet Net Details";

const InternetBundlesNetDetails: React.FunctionComponent = () => {
    return (
        <div
            title="Internet Bundles Net Details"
            className="flex flex-col gap-2"
        >
            <AccountDisclaimer />
            <AdminDetails />
        </div>
    );
};

export default InternetBundlesNetDetails;
