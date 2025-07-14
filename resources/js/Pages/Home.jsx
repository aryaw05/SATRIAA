import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import { db, ref, onValue } from "../data/firebaseConfig";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";
import "../bootstrap.js";
export default function Home(props) {
    const { halte, buses, jadwal } = props;

    const mapProviderRef = useRef(null);

    const [jumlahBus, setJumlahBus] = useState([]);

    const [dataBus, setDataBus] = useState([]);
    useEffect(() => {
        window.Echo.channel("data-halte").listen(".data.halte.updated", (e) => {
            setDataBus({
                namaBus: e.namaBus,
                namaHalte: e.namaHalte,
            });
        });

        return () => {
            window.Echo.leave("data-halte");
        };
    }, []);

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
                bus={jumlahBus}
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
