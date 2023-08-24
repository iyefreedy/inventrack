import { AppMenuItem } from "../types/layout";
import { MenuProvider } from "../context/MenuContext";
import AppMenuitem from "./AppMenuItem";

const AppMenu = () => {
    const model: AppMenuItem[] = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: "/dashboard",
                },
                {
                    label: "Computers",
                    icon: "pi pi-fw pi-desktop",
                    to: "/computers",
                },
                {
                    label: "Rooms",
                    icon: "pi pi-fw pi-building",
                    to: "/rooms",
                },
            ],
        },
        {
            label: "e-Commerce",
            items: [
                {
                    label: "Sales",
                    icon: "pi pi-fw pi-id-card",
                    to: "/uikit/formlayout",
                },
                {
                    label: "Stock",
                    icon: "pi pi-fw pi-check-square",
                    to: "/uikit/input",
                },
                {
                    label: "Bookmark",
                    icon: "pi pi-fw pi-bookmark",
                    to: "/uikit/floatlabel",
                },
                {
                    label: "Feedback",
                    icon: "pi pi-fw pi-exclamation-circle",
                    to: "/uikit/invalidstate",
                },
            ],
        },
        {
            label: "Admin",
            icon: "pi pi-fw pi-briefcase",
            to: "/pages",
            items: [
                {
                    label: "Landing",
                    icon: "pi pi-fw pi-globe",
                    to: "/landing",
                },
                {
                    label: "Users",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "Login",
                            icon: "pi pi-fw pi-sign-in",
                            to: "/auth/login",
                        },
                        {
                            label: "Error",
                            icon: "pi pi-fw pi-times-circle",
                            to: "/auth/error",
                        },
                        {
                            label: "Access Denied",
                            icon: "pi pi-fw pi-lock",
                            to: "/auth/access",
                        },
                    ],
                },
                {
                    label: "Roles",
                    icon: "pi pi-fw pi-pencil",
                    to: "/pages/crud",
                },
                {
                    label: "Timeline",
                    icon: "pi pi-fw pi-calendar",
                    to: "/pages/timeline",
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
