import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
    return (
        <div className="navbar flex justify-end bg-white p-5 w-full ">
            <div className="p-2 lg:hidden">
                <label
                    htmlFor="sidebar-toggle"
                    className="btn btn-ghost btn-square"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                </label>
            </div>
            {/* Left Side
            <div className="flex-1">
                <h1>Dashboard</h1>
            </div> */}

            {/* Right Side */}
            <div className=" text-md  flex  items-center gap-4">
                <div>
                    <div className="font-bold">Admin</div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0}>
                        <FontAwesomeIcon
                            icon="fa-solid fa-circle-user"
                            className="md:text-4xl cursor-pointer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
