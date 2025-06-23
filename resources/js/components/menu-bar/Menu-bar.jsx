import { useEffect, useState } from "react";
import NavigationButton from "./Navigation-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwipeable } from "react-swipeable";
export default function MenuBar(props) {
    const { onClickBus, onClickUser, totalBus , totalJadwal , detailBus } = props;
    
    
    // state id bus 
    const [idBus , setIdBus]  = useState(null);
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
    }
    // Manual toggle function
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
    return (
        <div
            {...swipeHandlers}
            className={`fixed bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out  ${getHeightClass()}`}
        >
            <div className="mb-4 mx-4 px-2 flex h-16 items-center justify-between">
                <button
                    className="bg-orange-primary p-3 rounded-xl flex items-center justify-center"
                    onClick={onClickUser}
                    aria-label="Tambah user"
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-location-crosshairs"
                        className="text-2xl text-white"
                    />
                </button>

                <div className="flex gap-4">
                    {totalBus.map((item , index) => (
                        <NavigationButton
                            onClick={() => busSearchData(item.id )}
                            id={item.id}
                            key={index}
                            icon={"fa-solid fa-bus"}
                            className={"text-white text-2xl"}
                            buttonColor={"orange-secondary"}
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
                        <div className="bg-orange-secondary rounded-3xl ">
                            <FontAwesomeIcon
                                icon="fa-solid fa-wheelchair"
                                className="text-5xl text-white p-4"
                            />
                        </div>
                        <div className="flex-col">
                            <p className="text-lg font-medium">
                                Kapasitas  Tersedia
                            </p>
                            <p className="text-lg font-medium">{detailBus.find(bus => bus.id_bus === idBus)?.kapasitas_tempat_duduk || "-"}%</p>
                        </div>
                    </div>
                    <p className="text-xl font-medium mt-9 mb-4">Detail Bus</p>
                    <div className="flex w-fit rounded-3xl overflow-hidden  bg-orange-primary">
                        {/* Kiri: Ikon dan Nama */}
                        <div className="bg-orange-secondary flex flex-col items-center justify-center px-5 py-4 rounded-3xl">
                            <FontAwesomeIcon
                                icon={"fa-solid fa-bus"}
                                className="text-4xl text-white"
                            />
                            <p className="text-md text-white font-semibold">
                                {detailBus.find(bus => bus.id_bus === idBus)?.nomor_bus || "-"}
                            </p>
                        </div>

                        {/* Kanan: Detail Info */}
                        <div className="bg-orange-primary px-5 py-4 space-y-1">
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Jenis Bus</span>
                                <span>:</span>
                                <span className="text-black font-bold">
                                    {detailBus.find(bus => bus.id_bus === idBus)?.jenis_bus || "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Plat Nomor</span>
                                <span>:</span>
                                <span className="text-black font-bold">
                                    {
                                        detailBus.find(bus => bus.id_bus === idBus)?.plat_nomor || "-"
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl font-medium mt-9 mb-4 ">
                        Jadwal Kedatangan Satria
                    </p>
                    

                    {
                        totalJadwal.find((e) => e.id_bus === idBus ) ? (
                            <div className="flex flex-col space-y-4">
                                {totalJadwal
                                    .filter((e) => e.id_bus === idBus)
                                    .map((e, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-orange-secondary rounded-2xl px-6 py-5 gap-4"
                                        >
                                            <span className="text-md font-medium text-black">
                                                {e.halte.nama_halte}
                                            </span>
                                            <span className="bg-white text-black text-md font-semibold px-2 py-2 rounded-md ">
                                                {e.waktu_tiba}
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Tidak ada jadwal untuk bus ini.</p>
                        )
                    }
                    
                    
                </div>
            </div>
        </div>
    );
}
