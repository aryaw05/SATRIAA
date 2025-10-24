import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";
import "../bootstrap.js";
export default function Home(props) {
    const { halte, buses, jadwal, tracking } = props;

    const mapProviderRef = useRef(null);
    const [dataBus, setDataBus] = useState([]);
    const [location, setLocation] = useState([]);
    useEffect(() => {
        window.Echo.channel("data-kepadatan-bus.").listen(
            ".kepadatan.updated",
            (e) => {
                setDataBus((prevData) => {
                    let updated = [...prevData];

                    e.data.forEach((incoming) => {
                        const index = updated.findIndex(
                            (b) => b.id_bus === incoming.id_bus
                        );

                        if (index !== -1) {
                            updated[index] = { ...updated[index], ...incoming };
                        } else {
                            updated.push(incoming);
                        }
                    });
                    return updated;
                });
            }
        );

        return () => {
            window.Echo.leave("data-kepadatan-bus.");
        };
    }, []);
    // useEffect(() => {
    //     const channel = window.Echo.channel("location-updated.");

    //     channel.listen(".bus.location.updated", (e) => {
    //         // Update object keyed by id_bus
    //         setLocation((prev) => {
    //             const updated = { ...prev };

    //             e.data.forEach((bus) => {
    //                 updated[bus.id_bus] = bus;
    //             });

    //             return updated;
    //         });
    //     });

    //     return () => {
    //         window.Echo.leave("location-updated.");
    //     };
    // }, []);
    // const BusLocationData = Object.values(location).map((bus) => ({ bus }));

    // console.log(BusLocationData);

    // console.log(location);
    useEffect(() => {
        window.Echo.channel("location-updated.").listen(
            ".bus.location.updated",
            (e) => {
                setLocation((prevData) => {
                    let updated = [...prevData];

                    e.data.forEach((incoming) => {
                        const index = updated.findIndex(
                            (b) => b.id_bus === incoming.id_bus
                        );

                        if (index !== -1) {
                            updated[index] = { ...updated[index], ...incoming };
                        } else {
                            updated.push(incoming);
                        }
                    });

                    return updated;
                });
            }
        );

        return () => {
            window.Echo.leave("location-updated.");
        };
    }, []);

    const Location = () => {
        if (mapProviderRef.current) {
            mapProviderRef.current.userLocationHandle();
        }
    };
    const busSearch = (busId) => {
        if (mapProviderRef.current) {
            mapProviderRef.current.busSearchHandle(busId);
        }
    };

    return (
        <div>
            <MapProvider
                halte={halte}
                isAdmin={false}
                ref={mapProviderRef}
                bus={tracking}
                realTimeBus={location}
            />
            <MenuBar
                totalJadwal={jadwal}
                onClickBus={busSearch}
                onClickUser={Location}
                detailBus={buses}
                dataBus={dataBus}
            />
        </div>
    );
}
