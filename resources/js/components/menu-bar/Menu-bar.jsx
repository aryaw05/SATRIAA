import { useState } from "react";
import NavigationButton from "./Navigation-button";
export default function MenuBar(props) {
    const { onClick, totalBus } = props;
    const [isOpen, setIsOpen] = useState({
        position: "bottom-25",
    });

    function openBar() {
        if (isOpen.position === "bottom-25") {
            setIsOpen({ position: "bottom-35" });
        } else {
            setIsOpen({ position: "bottom-25" });
        }
    }
    // data diambil dari database jika terdapat fitur tambah bus
    let jumlahBus = totalBus;
    return (
        <div
            className={`w-full relative z-10 h-96  ${isOpen.position}  overflow-hidden`}
        >
            <div className="mb-4 px-2 flex  justify-between">
                <NavigationButton icon={"Lokasi"} />
                <div className="flex gap-2">
                    {jumlahBus.map((item) => {
                        return (
                            <NavigationButton
                                onClick={() => onClick(item.id)}
                                id={item.id}
                                key={item.id}
                                icon={`Bus ${item.id}`}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="w-full bg-violet-500 p-3 h-full">
                <h1 className="text-center " onClick={() => openBar()}>
                    Menu Bar
                </h1>
            </div>
        </div>
    );
}
