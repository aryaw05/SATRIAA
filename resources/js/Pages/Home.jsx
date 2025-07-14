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

    const [dataBus, setDataBus] = useState({
        namaBus: "",
        namaHalte: "",
        kepadatan: "",
        statusBus: "",
        id_bus: "",
    });
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
                setDataBus({
                    kepadatan: e.kepadatan,
                    id_bus: e.id_bus,
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
            <h1>TES NAMA HALTE : {dataBus.kepadatan}</h1>
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
            />
        </div>
    );
}
