import { Link } from "@inertiajs/react";
import { useState } from "react";
import { handleLogout } from "../utils/handleCRUD";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const link = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "fa-solid fa-house" },
    { name: "Data Bus", href: "/admin/dashboard/bus", icon: "fa-solid fa-bus" },
    {
        name: "Jadwal",
        href: "/admin/dashboard/jadwal",
        icon: "fa-solid fa-calendar-days",
    },
    {
        name: "Kernet",
        href: "/admin/dashboard/kernet",
        icon: "fa-solid fa-user-tie",
    },
];

const Sidebar = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="drawer lg:drawer-open h-screen z-10">
            {/* Input toggle untuk mobile */}
            <input
                id="sidebar-toggle"
                type="checkbox"
                className="drawer-toggle"
            />

            {/* Konten utama */}
            <div className="drawer-content flex flex-col">
                {/* Halaman utama */}
                <div className="flex flex-col  w-full overflow-y-auto h-screen">
                    {children}
                </div>
            </div>

            {/* Sidebar (drawer-side) */}
            <div className="drawer-side">
                <label
                    htmlFor="sidebar-toggle"
                    aria-label="close sidebar"
                    className="drawer-overlay lg:hidden"
                ></label>

                <div
                    className={`${
                        open ? "w-50" : "w-14"
                    } bg-base-200 flex flex-col items-start transition-all duration-300 pt-4 min-h-full`}
                >
                    {/* === HEADER === */}
                    <div className="w-full flex items-center justify-between px-3 py-3 border-b border-base-300">
                        {open && (
                            <h2 className="text-lg font-semibold">Dashboard</h2>
                        )}
                        <button
                            onClick={() => setOpen(!open)}
                            className="btn btn-ghost btn-circle hidden md:block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className={`inline-block size-4 transition-transform duration-300 ${
                                    open ? "rotate-180" : ""
                                }`}
                            >
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </button>
                    </div>

                    {/* === CONTENT === */}
                    <ul className="menu w-full space-y-3 flex-1 overflow-y-auto">
                        {link.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-3 hover:bg-base-300 transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    {open && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* === FOOTER === */}
                    <div className="w-full border-t border-base-300 px-4 py-3">
                        <button
                            className="btn btn-sm bg-red-600 w-full text-white "
                            onClick={() => {
                                handleLogout("logout");
                            }}
                        >
                            {open ? (
                                "Logout"
                            ) : (
                                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
