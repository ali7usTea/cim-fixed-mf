"use client";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    ChildContainerProps,
    LayoutConfig,
    LayoutContextProps,
    LayoutState
} from "../../types/types";
export const LayoutContext = createContext({} as LayoutContextProps);

import { toast, Toaster } from "sonner";
import { RootState } from "../../redux/store";

export const LayoutProvider = ({ children }: ChildContainerProps) => {
    const [jwtToken, setJwtToken] = useState<string>("");
    const { notificationType, infoText, notificationHeader } = useSelector(
        (state: RootState) => state.notifications
    );

    useEffect(() => {
        if (!notificationHeader) return;
        toast(notificationHeader, {
            description: infoText || "Message Content",
            id: notificationHeader
        });
    }, [notificationType, notificationHeader, infoText]);

    const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
        ripple: false,
        inputStyle: "outlined",
        colorScheme: "light",
        theme: "lara-light-indigo",
        scale: 14
    });

    const [layoutState, setLayoutState] = useState<LayoutState>({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const onMenuToggle = () => {
        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive:
                    !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
            }));
        }
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value: LayoutContextProps = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        jwtToken,
        setJwtToken
    };

    return (
        <LayoutContext.Provider value={value}>
            <Toaster 
                position='top-right'
                richColors
                expand={true}
                duration={5000}
                closeButton
            />
            {children}
        </LayoutContext.Provider>
    );
};
