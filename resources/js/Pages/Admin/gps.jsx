import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const GpsSatria = (props) => {
    // console.log(props);
    const { bus } = props;


    const [isActive, setIsActive] = useState(false);
    const [kepadatan, setKepadatan] = useState("Pilih Tingkat Kepadatan");
    const [statusBus, setStatusBus] = useState("Pilih Status Bus");
    const [openKepadatan, setOpenKepadatan] = useState(false);
    const [openStatusBus, setOpenStatusBus] = useState(false);

    const toggleGps = () => setIsActive((prev) => !prev);

    return (
        <div className="bg-gray-100 min-h-screen items-center justify-center">
            {/* Navbar */}
            <div className="navbar bg-gray-100 w-full z-50">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold p-4">Dashboard SATRIA</h1>
                </div>
            </div>

            {/* Konten */}
            <div className="bg-gray-100 min-h-screen mx-5">
                <div className="bg-white rounded-3xl mt-10 mx-5 px-6 py-6 w-full max-w-md mx-auto">
                    <h1 className="font-bold text-2xl mb-0">
                        SATRIA {bus.id_bus}
                    </h1>

                    <h2 className="text-gray-400 text-xl mb-3">ON/OFF GPS</h2>

                    {/* ON/OFF Toggle */}
                    <div className="flex items-center justify-between mb-1">
                        {isActive ? (
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="text-green-500 text-4xl"
                                />
                                <h3 className="font-bold text-4xl text-green-600">
                                    Aktif
                                </h3>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="text-red-500 text-4xl"
                                />
                                <h3 className="font-bold text-4xl text-red-600">
                                    Non-Aktif
                                </h3>
                            </div>
                        )}
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={toggleGps}
                            className="toggle toggle-xl"
                        />
                    </div>
                </div>
                {/* Dropdown Container */}
                {isActive && (
                    <div className="mt-8 space-y-6">
                        {/* Dropdown Tingkat Kepadatan */}
                        <div className="w-full">
                            <div
                                className="dropdown  w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="btn w-full py-7 rounded-2xl bg-white text-lg justify-between"
                                    onClick={() =>
                                        setOpenKepadatan(!openKepadatan)
                                    }
                                >
                                    {kepadatan}
                                    <svg
                                        className={`w-4 h-4 ml-2 transition-transform ${
                                            openKepadatan ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openKepadatan && (
                                    <ul className="mt-1 p-2 shadow menu dropdown-content bg-white text-lg rounded-2xl w-full z-10">
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setKepadatan("10% Sedikit");
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                10% Sedikit
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setKepadatan("30% Sedikit");
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                30% Sedikit
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setKepadatan(
                                                        "50% Cukup Ramai"
                                                    );
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                50% Cukup Ramai
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setKepadatan("70% Ramai");
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                70% Ramai
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setKepadatan("100% Ramai");
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                100% Ramai
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Dropdown Status Bus */}
                        <div className="w-full">
                            <div
                                className="dropdown w-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="btn w-full py-7 bg-white text-lg rounded-2xl flex items-center gap-3 px-4"
                                    onClick={() =>
                                        setOpenStatusBus(!openStatusBus)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={"fa-solid fa-bus"}
                                        className="text-3xl text-black"
                                    />
                                    <span className="flex-1 text-left">
                                        {statusBus}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            openStatusBus ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {openStatusBus && (
                                    <ul className="mt-1 p-2 shadow menu dropdown-content text-lg bg-white rounded-2xl w-full z-10">
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setStatusBus(
                                                        "Bus Dalam Perjalanan"
                                                    );
                                                    setOpenStatusBus(false);
                                                }}
                                            >
                                                Bus Dalam Perjalanan
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setStatusBus(
                                                        "Bus Mengalami Trouble"
                                                    );
                                                    setOpenStatusBus(false);
                                                }}
                                            >
                                                Bus Mengalami Trouble
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setStatusBus(
                                                        "Bus Terkena Macet"
                                                    );
                                                    setOpenStatusBus(false);
                                                }}
                                            >
                                                Bus Terkena Macet
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setStatusBus(
                                                        "Bus Tidak Beroperasi"
                                                    );
                                                    setOpenStatusBus(false);
                                                }}
                                            >
                                                Bus Tidak Beroperasi
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="bg-yellow-100"
                                                onClick={() => {
                                                    setStatusBus(
                                                        "Sopir Sedang Ngopi"
                                                    );
                                                    setOpenStatusBus(false);
                                                }}
                                            >
                                                Sopir Sedang Ngopi
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GpsSatria;
