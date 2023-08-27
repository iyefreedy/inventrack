import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { AppTopbarRef, LayoutContextProps } from "@/types/layout";

import { LayoutContext } from "../context/LayoutContext";
import { classNames } from "primereact/utils";
import { Link } from "@inertiajs/react";

const AppTopbar = forwardRef<AppTopbarRef>((_, ref) => {
    const {
        layoutConfig,
        layoutState,
        onMenuToggle,
        showProfileSidebar,
        setLayoutConfig,
    } = useContext<LayoutContextProps>(LayoutContext);

    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const onToggleTheme = () => {
        setLayoutConfig((prevLayoutConfig) => ({
            ...prevLayoutConfig,
            colorScheme:
                prevLayoutConfig.colorScheme === "light" ? "dark" : "light",
        }));
    };

    return (
        <div className="layout-topbar">
            <Link href={"/"} className="layout-topbar-logo">
                <img
                    src={`https://sakai.primereact.org/layout/images/logo-${
                        layoutConfig.colorScheme !== "light" ? "white" : "dark"
                    }.svg`}
                    width="47.22px"
                    height={"35px"}
                    alt="logo"
                />
                <span>CompTracker</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames("layout-topbar-menu", {
                    "layout-topbar-menu-mobile-active":
                        layoutState.profileSidebarVisible,
                })}
            >
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={onToggleTheme}
                >
                    <i
                        className={`pi ${
                            layoutConfig.colorScheme === "light"
                                ? "pi-moon"
                                : "pi-sun"
                        }`}
                    ></i>
                    <span>Theme</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button
                        type="button"
                        className="p-link layout-topbar-button"
                    >
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>
    );
});

export default AppTopbar;
