import { useEffect, useMemo, useState } from "react";
import NavigationButton from "./Navigation-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwipeable } from "react-swipeable";
export default function MenuBar(props) {
    const { onClickBus, onClickUser, totalJadwal, detailBus, dataBus } = props;

    const [idBus, setIdBus] = useState(null);
    const [busInformation, setBusInformation] = useState(null);
    const [swipeCount, setSwipeCount] = useState(0);
    const [openState, setOpenState] = useState("closed");

    // Reset swipe count after 500ms
    useEffect(() => {
        if (swipeCount > 0) {
            const timer = setTimeout(() => setSwipeCount(0), 500);
            return () => clearTimeout(timer);
        }
    }, [swipeCount]);

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => {
            if (openState === "closed") {
                setOpenState("partial");
            } else if (openState === "partial") {
                setOpenState("full");
            }
        },
        onSwipedDown: () => {
            if (openState === "full") {
                setOpenState("partial");
            } else if (openState === "partial") {
                setOpenState("closed");
            }
        },
        trackMouse: true,
        trackTouch: true,
        delta: 30,
        preventDefaultTouchmoveEvent: true,
    });

    const busSearchData = (id) => {
        setIdBus(id);
        onClickBus(id);
    };
    useEffect(() => {
        if (idBus) {
            const detailDataBus = detailBus.filter((e) => e.id_bus === idBus);
            setBusInformation(detailDataBus[0]);
            if (dataBus.length > 0) {
                const realTimeData = dataBus.filter((e) => e.id_bus === idBus);
                if (realTimeData.length === 0) return;
                const detailDataBus = detailBus.filter(
                    (e) => e.id_bus === idBus
                );
                setBusInformation((prevData) => {
                    return {
                        ...prevData,
                        id_bus: idBus,
                        nomor_bus: detailDataBus[0].nomor_bus,
                        kapasitas_tempat_duduk:
                            realTimeData[0].kepadatan ||
                            detailDataBus[0].kapasitas_tempat_duduk,
                        kondisi:
                            realTimeData[0].kondisi || detailDataBus[0].kondisi,
                        plat_nomor: detailDataBus[0].plat_nomor,
                        tipe_bus: detailDataBus[0].tipe_bus,
                        jenis_bus: detailDataBus[0].jenis_bus,
                    };
                });
            }
        }
    }, [dataBus, idBus, detailBus]);

    const toggleMenu = () => {
        if (openState === "closed") {
            setOpenState("partial");
        } else if (openState === "partial") {
            setOpenState("full");
        } else {
            setOpenState("closed");
        }
    };

    const getHeightClass = () => {
        switch (openState) {
            case "closed":
                return "translate-y-[85%]"; // Tertutup
            case "partial":
                return "translate-y-[53%]"; // Setengah
            case "full":
                return "translate-y-[7%]"; // Full screen
            default:
                return "translate-y-[83%]";
        }
    };
    console.log(busInformation);
    const setJadwal = useMemo(() => {
        if (!idBus) {
            return [];
        }
        const hasil = [];
        totalJadwal.forEach((e) => {
            if (e.id_bus === idBus) {
                const namaHalte = e.halte.nama_halte;
                hasil.push(namaHalte);
            }
        });

        return [...new Set(hasil)];
    }, [idBus, totalJadwal]);

    return (
        <div
            {...swipeHandlers}
            className={`fixed bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out  ${getHeightClass()}`}
        >
            <div className="mb-4 mx-4 px-2 flex h-16 items-center justify-between">
                <button
                    className="bg-linear-65 from-red-500 from-10% to-red-secondary to-90% p-3 rounded-xl flex items-center justify-center"
                    onClick={onClickUser}
                    aria-label="Tambah user"
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-location-crosshairs"
                        className="text-2xl text-white "
                    />
                </button>

                <div className="flex gap-4">
                    {detailBus.map((item, index) => (
                        <NavigationButton
                            onClick={() => busSearchData(item.id_bus)}
                            id={item.id_bus}
                            key={index}
                            icon={"fa-solid fa-bus"}
                            className={"text-white text-2xl"}
                        />
                    ))}
                </div>
            </div>

            <div className="mx-4 bg-white p-3 pb-30 h-full overflow-y-auto rounded-t-4xl cursor-grab active:cursor-grabbing">
                <div
                    className="flex justify-center py-3 cursor-pointer"
                    onClick={toggleMenu}
                >
                    <div className="w-1/4 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <div className="bg-white-500 justify-items-center h-[calc(100%-20px)] overflow-y-auto">
                    <div className="flex items-center m-7 space-x-4">
                        <div className="bg-red-secondary rounded-3xl ">
                            <FontAwesomeIcon
                                icon="fa-solid fa-users"
                                className="text-5xl text-white p-4"
                            />
                        </div>
                        <div className="flex-col">
                            <p className="text-lg font-medium">
                                Kapasitas Tersedia
                            </p>
                            <p className="text-lg font-medium">
                                {busInformation?.kapasitas_tempat_duduk || "-"}
                            </p>
                        </div>
                    </div>
                    <p className="text-xl font-medium mt-9 mb-4">Detail Bus</p>
                    <div className="flex w-fit rounded-3xl overflow-hidden  bg-red-primary">
                        {/* Kiri: Ikon dan Nama */}
                        <div className="bg-red-secondary flex flex-col items-center justify-center px-5 py-4 rounded-3xl">
                            <FontAwesomeIcon
                                icon={"fa-solid fa-bus"}
                                className="text-4xl text-white"
                            />
                            <p className="text-md text-white font-semibold">
                                {busInformation?.nomor_bus || "-"}
                            </p>
                        </div>

                        {/* Kanan: Detail Info */}
                        <div className="bg-red-primary px-5 py-4 space-y-1 text-white">
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Jenis Bus</span>
                                <span>:</span>
                                <span className="text-white font-bold">
                                    {busInformation?.jenis_bus || "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Plat Nomor</span>
                                <span>:</span>
                                <span className="text-white font-bold">
                                    {busInformation?.plat_nomor || "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Kondisi Bus </span>
                                <span>:</span>
                                <span className="text-white font-bold">
                                    {busInformation?.kondisi || "-"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl font-medium mt-9 mb-4 ">
                        Jadwal Kedatangan Trans Kediri
                    </p>

                    {setJadwal && setJadwal.length > 0 ? (
                        <div className="flex flex-col space-y-4">
                            {setJadwal.map((e, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-red-secondary rounded-2xl px-5 py-8 gap-4 "
                                >
                                    <span className="text-md font-medium text-white">
                                        {e}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {totalJadwal
                                            .filter((e) => e.id_bus === idBus)
                                            .map((e, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-white text-black text-md font-semibold  rounded-md px-2 py-4"
                                                >
                                                    {e.waktu_tiba}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            Tidak ada jadwal untuk bus ini.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
