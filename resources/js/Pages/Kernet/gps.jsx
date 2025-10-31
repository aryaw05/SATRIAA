import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleXmark,
    faBus,
} from "@fortawesome/free-solid-svg-icons";
import { Head, router } from "@inertiajs/react";

const Gps = (props) => {
    const { bus } = props;
    const [isActive, setIsActive] = useState(!!bus.status);
    const [kepadatan, setKepadatan] = useState(bus.kapasitas_tempat_duduk);
    const [statusBus, setStatusBus] = useState(bus.kondisi);
    const [openKepadatan, setOpenKepadatan] = useState(false);
    const [openStatusBus, setOpenStatusBus] = useState(false);
    const intervalRef = useRef(null);
    const toggleGps = () => setIsActive((prev) => !prev);
    const handleLogout = () => {
        router.post("/logoutBus");
    };

    const resetLocation = () => {
        const resetData = {
            id_bus: bus.id_bus,
            lokasi_lat: -7.810829,
            lokasi_long: 112.063374,
        };

        router.post("/kernet/dashboard/location/update", resetData, {
            onError: (errors) => {
                console.error("Gagal kirim lokasi:", errors);
            },
        });
    };
    const updateLocation = () => {
        if (!navigator.geolocation) {
            console.warn("Geolocation tidak didukung");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const data = {
                    id_bus: bus.id_bus,
                    lokasi_lat: lat,
                    lokasi_long: lng,
                };

                router.post("/kernet/dashboard/location/update", data, {
                    onError: (errors) => {
                        console.error("Gagal kirim lokasi:", errors);
                    },
                    onSuccess: () => {
                        console.log(
                            `Lokasi Bus ${bus.id_bus} terkirim:`,
                            lat,
                            lng
                        );
                    },
                });
            },
            (error) => {
                console.error("Gagal dapatkan lokasi:", error);
            },
            { enableHighAccuracy: true }
        );
    };

    function updateKondisiBus() {
        router.put(
            `/kernet/dashboard/bus/updateKondisi/${bus.id_bus}`,
            {
                kondisi: statusBus,
            },
            {
                onError: (errors) => {
                    console.error("Gagal kirim status bus:", errors);
                },
                onSuccess: () => {
                    console.log(
                        `Status Bus ${bus.id_bus} terkirim:`,
                        statusBus
                    );
                },
            }
        );
    }
    function updateKapasitasBus() {
        router.put(
            `/kernet/dashboard/bus/updateKapasitas/${bus.id_bus}`,
            {
                kapasitas_tempat_duduk: kepadatan,
            },
            {
                onError: (errors) => {
                    console.error("Gagal kirim status bus:", errors);
                },
                onSuccess: () => {
                    console.log(`Kapasitas ${bus.id_bus} terkirim:`, kepadatan);
                },
            }
        );
    }

    function updateStatusBus() {
        router.put(
            `/kernet/dashboard/bus/updateStatus/${bus.id_bus}`,
            {
                status: isActive,
            },
            {
                onError: (errors) => {
                    console.error("Gagal kirim status bus:", errors);
                },
                onSuccess: () => {
                    console.log(`Status Bus ${bus.id_bus} terkirim:`, isActive);
                },
            }
        );
    }
    useEffect(() => {
        if (isActive) {
            updateLocation();
            intervalRef.current = setInterval(updateLocation, 50000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, bus.id_bus, kepadatan, statusBus]);

    useEffect(() => {
        if (!isActive) resetLocation();
    }, [isActive]);

    useEffect(() => {
        if (isActive && kepadatan) {
            updateKapasitasBus();
        }
    }, [kepadatan]);

    useEffect(() => {
        updateStatusBus();
    }, [isActive]);
    useEffect(() => {
        if (isActive && statusBus) {
            updateKondisiBus();
        }
    }, [statusBus]);

    return (
        <div className="bg-gray-100 min-h-screen items-center justify-center">
            <Head title="GPS Bus | Trans Kediri" />
            {/* Navbar */}
            <div className="navbar bg-gray-100 w-full z-50 ">
                <div className="flex justify-between w-full px-5 py-5">
                    <h1 className="text-2xl font-bold ">
                        Dashboard Trans Kediri
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="button bg-red-500 rounded-md px-6 py-2 shadow-md text-white font-bold hover:bg-red-400 cursor-pointer "
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Konten */}
            <div className="bg-gray-100 min-h-screen mx-5">
                <div className="bg-white rounded-3xl mt-10 mx-5 px-6 py-6 w-full max-w-md mx-auto">
                    <div className="flex">
                        <div className="">
                            <h1 className="font-bold text-2xl mb-0">
                                {bus.nomor_bus}
                            </h1>
                            <h2 className="text-gray-400 text-xl mb-3">
                                ON/OFF GPS
                            </h2>
                        </div>
                    </div>
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
                                    {kepadatan
                                        ? kepadatan + "%"
                                        : "Pilih Tingkat Kepadatan"}
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
                                                    setKepadatan(10);
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                10% Sedikit
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setKepadatan(30);
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
                                                    setKepadatan(50);
                                                    setOpenKepadatan(false);
                                                }}
                                            >
                                                50% Cukup Ramai
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    setKepadatan(70);
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
                                                    setKepadatan(100);
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
                                        icon={faBus}
                                        className="text-3xl text-black"
                                    />
                                    <span className="flex-1 text-left">
                                        {statusBus
                                            ? statusBus
                                            : "Pilih Status Bus"}
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
export default Gps;
