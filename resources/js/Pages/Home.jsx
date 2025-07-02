import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import { db, ref, onValue } from "../data/firebaseConfig";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";
import "../bootstrap.js";
export default function Home(props) {
    const { halte, buses, jadwal } = props;
    console.log("bus", buses);

    const mapProviderRef = useRef(null);

    const [jumlahBus, setJumlahBus] = useState([]);

    const [dataBus, setDataBus] = useState({ namaBus: "", namaHalte: "" });

    // Ambil lokasi dari Firebase
    // useEffect(() => {
    //     const busRef = ref(db, "buses");
    //     onValue(busRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const buses = Object.entries(data).map(([id, val]) => ({
    //                 id: parseInt(id),
    //                 lat: val.lat,
    //                 lng: val.lng,
    //                 kepadatan: val.kepadatan,
    //                 statusBus: val.statusBus,
    //             }));
    //             setJumlahBus(buses);
    //         }
    //     });
    // }, []);
    useEffect(() => {
        console.log("Cek Echo: ", window.Echo.channel("data-halte"));
        const channel = window.Echo.channel("data-halte").listen(
            ".data.halte.updated",
            (e) => {
                setDataBus({
                    namaBus: e.namaBus,
                    namaHalte: e.namaHalte,
                });
            }
        );

        return () => {
            window.Echo.leave("data-halte");
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
            <h1>TES NAMA HALTE : {dataBus.namaHalte}</h1>
            <MapProvider
                halte={halte}
                isAdmin={false}
                ref={mapProviderRef}
                bus={jumlahBus}
            />
            <MenuBar
                totalBus={jumlahBus}
                totalJadwal={jadwal}
                onClickBus={busSearch}
                onClickUser={Location}
                detailBus={buses}
            />
        </div>
    );
}
