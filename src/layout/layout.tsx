/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Toaster } from "sonner";
import React, { useContext, useEffect } from "react";
import AppConfig from "./AppConfig";
import { LayoutContext } from "./context/layoutcontext";
import FixedTabSuspense from "../app/main/page";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Layout = (_props: any) => {
    const { jwtToken } = useSelector((state: RootState) => state.auth);
    const { setJwtToken, layoutState } = useContext(LayoutContext);

    useEffect(() => {
        if (jwtToken) {
            setJwtToken(jwtToken);
        }
    }, [jwtToken]);

    const blockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.add("blocked-scroll");
        } else {
            document.body.className += " blocked-scroll";
        }
    };

    const unblockBodyScroll = (): void => {
        if (document.body.classList) {
            document.body.classList.remove("blocked-scroll");
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    "(^|\\b)" +
                        "blocked-scroll".split(" ").join("|") +
                        "(\\b|$)",
                    "gi"
                ),
                " "
            );
        }
    };

    useEffect(() => {
        if (
            layoutState.overlayMenuActive ||
            layoutState.staticMenuMobileActive
        ) {
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
        }
    }, [layoutState.profileSidebarVisible]);

    return (
        <React.Fragment>
            <FixedTabSuspense />

            <AppConfig />
        </React.Fragment>
    );
};

export default Layout;
