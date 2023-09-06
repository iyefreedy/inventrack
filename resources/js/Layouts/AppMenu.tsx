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
                    label: "Maintenances",
                    icon: "pi pi-fw pi-wrench",
                    to: "/maintenances",
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
