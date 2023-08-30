import { LayoutContext } from "@/context/LayoutContext";
import { User } from "@/types";
import { AppTopbarRef, LayoutState } from "@/types/layout";
import { classNames } from "primereact/utils";
import {
    useEventListener,
    useMountEffect,
    useUnmountEffect,
} from "primereact/hooks";
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
import { PrimeReactContext } from "primereact/api";

export default function DefaultLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const darkThemeLink = "/themes/md-dark-indigo/theme.css";
    const lightThemeLink = "/themes/md-light-indigo/theme.css";

    const { layoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);
    const { setRipple } = useContext(PrimeReactContext);
    const topbarRef = useRef<AppTopbarRef>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] =
        useEventListener({
            type: "click",
            listener: (event) => {
                const isOutsideClicked = !(
                    sidebarRef.current?.isSameNode(event.target as Node) ||
                    sidebarRef.current?.contains(event.target as Node) ||
                    topbarRef.current?.menubutton?.isSameNode(
                        event.target as Node
                    ) ||
                    topbarRef.current?.menubutton?.contains(
                        event.target as Node
                    )
                );

                if (isOutsideClicked) {
                    hideMenu();
                }
            },
        });
    useEffect(() => {
        hideMenu();
        hideProfileMenu();
    }, []);

    const [
        bindProfileMenuOutsideClickListener,
        unbindProfileMenuOutsideClickListener,
    ] = useEventListener({
        type: "click",
        listener: (event) => {
            const isOutsideClicked = !(
                topbarRef.current?.topbarmenu?.isSameNode(
                    event.target as Node
                ) ||
                topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(
                    event.target as Node
                ) ||
                topbarRef.current?.topbarmenubutton?.contains(
                    event.target as Node
                )
            );

            if (isOutsideClicked) {
                hideProfileMenu();
            }
        },
    });

    const hideMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };

    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState: LayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false,
        }));
        unbindProfileMenuOutsideClickListener();
    };

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

    useMountEffect(() => {
        setRipple(layoutConfig.ripple);
    });

    useEffect(() => {
        if (
            layoutState.overlayMenuActive ||
            layoutState.staticMenuMobileActive
        ) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);

    useEffect(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);

    useUnmountEffect(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });

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

        if (
            layoutState.overlayMenuActive ||
            layoutState.staticMenuMobileActive
        ) {
            bindMenuOutsideClickListener();
        }

        layoutState.staticMenuMobileActive && blockBodyScroll();

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
