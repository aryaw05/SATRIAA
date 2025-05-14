import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 fixed top-0 w-full z-50">
            {/* Left Side */}
            <div className="flex-1">
                <ul className="menu menu-horizontal px-auto text-xl relative z-50">
                    <li>
                        <details className="dropdown">
                            <summary className="sm:text-3xl hover:bg-transparent focus:!bg-transparent focus:!text-inherit">
                                Jadwal SATRIA
                            </summary>
                            <ul className="menu dropdown rounded-t-none p-2">
                                <li>
                                    <Link
                                        href="/admin/input-data"
                                        className="whitespace-nowrap sm:text-lg
text-lg active:!bg-transparent active:!text-inherit"
                                    >
                                        Jadwal SATRIA
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/halte"
                                        className="whitespace-nowrap sm:text-lg active:!bg-transparent active:!text-inherit"
                                    >
                                        Halte SATRIA
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            {/* Right Side */}
            <div className=" pr-4 text-md sm:text-2xl flex  items-center gap-4">
                <div>
                    <div className="font-bold">Admin Dishub</div>
                    <div className="text-sm sm:text-base text-gray-500">
                        Admin
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button">
                        <FontAwesomeIcon
                            icon="fa-solid fa-circle-user "
                            className="md:text-5xl cursor-pointer"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm "
                    >
                        <li>
                            <a className="text-red-500">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
