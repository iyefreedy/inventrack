import React, { useContext, useEffect } from "react";
import AppConfig from "./AppConfig";
import { LayoutContextProps } from "@/types/layout";
import { LayoutContext } from "@/context/LayoutContext";

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export default function SimpleLayout({ children }: SimpleLayoutProps) {
    const { layoutConfig, layoutState, setLayoutState } =
        useContext<LayoutContextProps>(LayoutContext);

    const darkThemeLink = "/themes/md-dark-indigo/theme.css";
    const lightThemeLink = "/themes/md-light-indigo/theme.css";

    useEffect(() => {
        const head = document.head;
        const link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";

        link.href =
            layoutConfig.colorScheme === "light"
                ? lightThemeLink
                : darkThemeLink;
        head.appendChild(link);

        return () => {
            head.removeChild(link);
        };
    }, [
        layoutConfig,
        layoutState.overlayMenuActive,
        layoutState.staticMenuMobileActive,
    ]);
    return (
        <React.Fragment>
            {children}
            <AppConfig simple />
        </React.Fragment>
    );
}
