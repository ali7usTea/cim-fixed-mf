"use client";

import { useContext, useEffect } from "react";
import { AppConfigProps, LayoutState } from "../types/types";
import { LayoutContext } from "./context/layoutcontext";
import { CogIcon } from "../app/icons/CogIcon";
import { Button } from "cim-ui-components";

const AppConfig = (_props: AppConfigProps) => {
    const { layoutConfig, setLayoutState } = useContext(LayoutContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({
            ...prevState,
            configSidebarVisible: true
        }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <Button
            className="fixed right-0 z-10 flex items-center justify-center top-1/5 h-11 w-11 rounded-r-none! bg-[#e00700] text-white"
            type="button"
            onClick={onConfigButtonClick}
        >
            <CogIcon />
        </Button>
    );
};

export default AppConfig;
