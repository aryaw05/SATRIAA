import { useEffect, useState } from "react";
import NavigationButton from "./Navigation-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSwipeable } from "react-swipeable";
export default function MenuBar(props) {
    const { onClickBus, onClickUser, totalBus } = props;

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
    // data diambil dari database jika terdapat fitur tambah bus
    let jumlahBus = totalBus;
    return (
        <div
            {...swipeHandlers}
            className={`fixed bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out shadow-lg ${getHeightClass()}`}
        >
            <div className="mb-4 mx-4 px-2 flex h-16 items-center justify-between">
                <button
                    className="bg-purple size-13 p-3 rounded-xl flex items-center justify-center"
                    onClick={onClickUser}
                    aria-label="Tambah user"
                >
                    <FontAwesomeIcon
                        icon="fa-solid fa-location-crosshairs"
                        className="text-2xl text-white"
                    />
                </button>

                <div className="flex gap-4">
                    {jumlahBus.map((item) => (
                        <NavigationButton
                            onClick={() => onClickBus(item.id)}
                            id={item.id}
                            key={item.id}
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
                        <div className="bg-orange-secondary rounded-3xl shadow-lg">
                            <FontAwesomeIcon
                                icon="fa-solid fa-wheelchair"
                                className="text-5xl text-white p-4"
                            />
                        </div>
                        <div className="flex-col">
                            <p className="text-lg font-medium">
                                Kursi Tersedia
                            </p>
                            <p className="text-lg font-medium">20</p>
                        </div>
                    </div>
                    <p className="text-xl font-medium mt-9 mb-4">Detail Bus</p>
                    <div className="flex w-fit rounded-3xl overflow-hidden shadow-lg bg-orange-primary">
                        {/* Kiri: Ikon dan Nama */}
                        <div className="bg-orange-secondary flex flex-col items-center justify-center px-5 py-4 rounded-3xl">
                            <FontAwesomeIcon
                                icon={"fa-solid fa-bus"}
                                className="text-4xl text-white"
                            />
                            <p className="text-md text-white font-semibold">
                                Satria 1
                            </p>
                        </div>

                        {/* Kanan: Detail Info */}
                        <div className="bg-orange-primary px-5 py-4 space-y-1">
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Driver</span>
                                <span>:</span>
                                <span className="text-black font-normal">
                                    Yazid
                                </span>
                            </div>
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Jenis Bus</span>
                                <span>:</span>
                                <span className="text-black font-bold">
                                    Hino
                                </span>
                            </div>
                            <div className="grid grid-cols-[90px_10px_1fr] text-md font-medium">
                                <span>Plat Nomor</span>
                                <span>:</span>
                                <span className="text-black font-bold">
                                    AG 224 A
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl font-medium mt-9 mb-4 ">
                        Jadwal Kedatangan Satria
                    </p>

                    <div className="flex items-center bg-orange-primary rounded-2xl px-6 py-5  shadow-lg mb-5">
                        {/* Keterangan Terminal */}
                        <span className="text-md font-medium text-black">
                            Terminal Tamanan
                        </span>

                        {/* Jam-jam Keberangkatan */}
                        <div className="flex space-x-2">
                            <span className="bg-white text-black text-md font-semibold px-2 py-2 rounded-md shadow">
                                07:30
                            </span>
                            <span className="bg-white text-black text-md font-semibold px-2 py-2 rounded-md shadow">
                                07:30
                            </span>
                            <span className="bg-white text-black text-md font-semibold px-2 py-2 rounded-md shadow">
                                07:30
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
