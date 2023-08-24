import { LayoutContext } from "@/context/LayoutContext";
import { User } from "@/types";
import { AppTopbarRef, LayoutContextProps } from "@/types/layout";
import { classNames } from "primereact/utils";
import React, {
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useRef,
} from "react";
import AppTopbar from "./AppTopbar";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import AppConfig from "./AppConfig";

export default function DefaultLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const { layoutConfig, layoutState } =
        useContext<LayoutContextProps>(LayoutContext);
    const topbarRef = useRef<AppTopbarRef>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const darkThemeLink = "/themes/md-dark-indigo/theme.css";
    const lightThemeLink = "/themes/md-light-indigo/theme.css";

    const containerClass = classNames("layout-wrapper", {
        "layout-overlay": layoutConfig.menuMode === "overlay",
        "layout-static": layoutConfig.menuMode === "static",
        "layout-static-inactive":
            layoutState.staticMenuDesktopInactive &&
            layoutConfig.menuMode === "static",
        "layout-overlay-active": layoutState.overlayMenuActive,
        "layout-mobile-active": layoutState.staticMenuMobileActive,
        "p-input-filled": layoutConfig.inputStyle === "filled",
        "p-ripple-disabled": !layoutConfig.ripple,
    });

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
    }, [layoutConfig]);
    return (
        <React.Fragment>
            <div className={containerClass}>
                <AppTopbar ref={topbarRef} />
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">{children}</div>
                    <AppFooter />
                </div>
                <AppConfig />
                <div className="layout-mask"></div>
            </div>
        </React.Fragment>
    );
}
