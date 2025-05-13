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
            <div className="flex-none pr-4 text-md sm:text-2xl flex flex-col items-end">
                <div className="font-bold">Admin Dishub</div>
                <div className="text-sm sm:text-base text-gray-500">Admin</div>
            </div>
        </div>
    );
}
