import { LayoutContext } from "@/context/LayoutContext";
import { LayoutContextProps } from "@/types/layout";
import { PropsWithChildren, useContext, useEffect } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const { layoutConfig, layoutState } =
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
    return <div>{children}</div>;
}
