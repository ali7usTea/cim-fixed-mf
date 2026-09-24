"use client";

import React, { useState } from "react";
import AllocatedResources from "./AllocatedResources";
import FixedOnLTEPanel from "./FixedOnLTEPanel";
import { PanelData, RowSelectionState } from "cim-ui-components";
// import { clientLogger } from '../../../../clientLogger';

// const LOGGER_PAGE = "app.main.Pages.FixedOnLTE";

export type ClickedRowType = {
    [key: string]: string | null;
};

const FixedOnLTE: React.FunctionComponent = () => {
    const [selectedRow, setSelectedRow] = useState<RowSelectionState | null>(
        null
    );

    const handleDataLoaded = ({
        data
    }: {
        data: PanelData;
        refId?: string;
    }) => {
        // Mimics the MutationObserver + autoClickFirstRow logic
        if (!data || Object.keys(data).length === 0) return;
        const name = Object.keys(data)[0];
        setSelectedRow({ [name]: true });
    };

    return (
        <div title="FixedOnLTE" className="flex flex-col gap-2">
            <FixedOnLTEPanel onDataLoaded={handleDataLoaded} />
            <AllocatedResources selectedRow={selectedRow} />
        </div>
    );
};

export default FixedOnLTE;
