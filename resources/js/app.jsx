import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
    faLocationCrosshairs,
    faBus,
    faWheelchair,
    faEllipsis,
    faCircleUser,
    faUserTie,
    faCalendarDays,
    faHouse,
    faRightFromBracket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./echo";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/400.css";
createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
        library.add(
            faTwitter,
            faLocationCrosshairs,
            faBus,
            faWheelchair,
            faEllipsis,
            faCircleUser,
            faRightFromBracket,
            faUserTie,
            faCalendarDays,
            faHouse,
            faUsers
        );
    },
});
