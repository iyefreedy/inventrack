import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { AppTopbarRef, LayoutContextProps } from "@/types/layout";

import { LayoutContext } from "../context/LayoutContext";
import { classNames } from "primereact/utils";
import { Link, useForm } from "@inertiajs/react";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

const AppTopbar = forwardRef<AppTopbarRef>((_, ref) => {
    const {
        layoutConfig,
        layoutState,
        onMenuToggle,
        showProfileSidebar,
        setLayoutConfig,
    } = useContext<LayoutContextProps>(LayoutContext);

    const { post } = useForm();

    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const profileMenu = useRef<Menu>(null);

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

    const items: MenuItem[] = [
        {
            label: "Logout",
            icon: "pi pi-sign-out",
            command: () => {
                post(route("logout"));
            },
        },
    ];

    return (
        <div className="layout-topbar">
            <Link href={"/"} className="layout-topbar-logo">
                <img
                    src={`/layout/images/inventrack-logo.png`}
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
                <Menu
                    model={items}
                    popup
                    ref={profileMenu}
                    id="profile_menu_right"
                />
                <button
                    type="button"
                    className="p-link layout-topbar-button"
                    onClick={(e) => profileMenu.current?.toggle(e)}
                >
                    <i className="pi pi-cog"></i>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
});

export default AppTopbar;
