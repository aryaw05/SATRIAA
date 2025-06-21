import "leaflet/dist/leaflet.css";
// <<<<<<< HEAD
// import React, { useState, useEffect, useRef } from "react";
// import { kediriPolygon } from "../data/map-koordinat";
// import createCustomIcon from "../components/marker";
// import MenuBar from "../components/menu-bar/Menu-bar";
// import { db, ref, onValue } from "../data/firebaseConfig";
// =======
import { useRef } from "react";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";
// >>>>>>> main

export default function Home(props) {

    const { halte , buses } = props;
    
    const mapProviderRef = useRef(null);

// <<<<<<< HEAD
    // const [jumlahBus, setJumlahBus] = useState([]);

    // // Ambil lokasi dari Firebase
    // useEffect(() => {
    //     const busRef = ref(db, "buses"); // pastikan path "buses" sesuai struktur di Firebase-mu
    //     onValue(busRef, (snapshot) => {
    //         const data = snapshot.val();
    //         if (data) {
    //             const buses = Object.entries(data).map(([id, val]) => ({
    //                 id: parseInt(id),
    //                 lat: val.lat,
    //                 lng: val.lng,
    //             }));
    //             setJumlahBus(buses);
    //         }
    //     });
    // }, []);

    // function Location() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success, error);
    //     } else {
    //         alert("Lokasi Tidak Ditemukan");
    //     }

    //     function success(position) {
    //         setMyLocation({
    //             long: position.coords.longitude,
    //             lat: position.coords.latitude,
    //         });

    //         mapRef.current.flyTo(
    //             [position.coords.latitude, position.coords.longitude],
    //             17
    //         );
    //     }

    //     function error() {
    //         alert("Lokasi Tidak Ditemukan");
    //     }
    // }

    // const busSearch = (busId) => {
    //     const bus = jumlahBus.find((b) => b.id === busId);
    //     if (bus && mapRef.current) {
    //         mapRef.current.flyTo([bus.lat, bus.lng], 17);
    //     }
    // };

    // // Inisialisasi map
    // useEffect(() => {
    //     const southWest = L.latLng(-7.84306, 111.97746);
    //     const northEast = L.latLng(-7.79468, 112.0451);
    //     const bounds = L.latLngBounds(southWest, northEast);
    //     const map = L.map("map", {
    //         maxBounds: bounds,
    //         center: [-7.8238, 112.0209],
    //         zoom: 17,
    //         minZoom: 15,
    //     });
    //     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //         attribution:
    //             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     }).addTo(map);

    //     mapRef.current = map;
    // }, []);

    // function clickZoom(e) {
    //     mapRef.current.setView(e.target.getLatLng(), 25);
    // }

    // // Lokasi User
    // useEffect(() => {
    //     if (!mapRef.current || !myLocation.lat) return;

    //     if (userMarkerRef.current) {
    //         userMarkerRef.current.setLatLng([myLocation.lat, myLocation.long]);
    //     } else {
    //         userMarkerRef.current = L.marker(
    //             [myLocation.lat, myLocation.long],
    //             {
    //                 icon: createCustomIcon("user", ""),
    //             }
    //         )
    //             .addTo(mapRef.current)
    //             .on("click", clickZoom);
    let jumlahBus = [
        {
            id: 1,
            lat: -7.8238,
            lng: 112.0209,
        },
        {
            id: 2,
            lat: -7.8165,
            lng: 112.0173,
        },
        {
            id: 3,
            lat: -7.8302,
            lng: 112.0256,
        },
    ];

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

// <<<<<<< HEAD
    // // Lokasi Bus
    // useEffect(() => {
    //     if (!mapRef.current) return;

    //     jumlahBus.forEach((bus) => {
    //         if (busMarkerRef.current[bus.id]) {
    //             // update lokasi jika marker sudah ada
    //             busMarkerRef.current[bus.id].setLatLng([bus.lat, bus.lng]);
    //         } else {
    //             // buat marker baru
    //             busMarkerRef.current[bus.id] = L.marker(
    //                 [bus.lat, bus.lng],
    //                 {
    //                     icon: createCustomIcon("bus", `bus${bus.id}`),
    //                 }
    //             )
    //                 .addTo(mapRef.current)
    //                 .on("click", clickZoom);
    //         }
    //     });
    // }, [jumlahBus]);

    // // jalur bus
    // useEffect(() => {
    //     const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
    //     L.polyline(flipCoords, { color: "#7C4585", weight: 4 }).addTo(
    //         mapRef.current
    //     );
    // }, []);

    // // halte
    // useEffect(() => {
    //     halte.forEach((data) => {
    //         L.marker([data.lokasi_lat, data.lokasi_long], {
    //             icon: createCustomIcon("halte", data.nama_halte),
    //             alt: "halte",
    //         })
    //             .addTo(mapRef.current)
    //             .on("click", clickZoom);
    //     });
    // }, [halte]);

    // return (
    //     <div className=" ">
    //         <div id="map" className="w-full h-screen z-1"></div>
// =======
    return (
        <div className=" ">
            <MapProvider halte={halte} isAdmin={false} ref={mapProviderRef} />
            <MenuBar
                totalBus={buses}
                onClickBus={busSearch}
                onClickUser={Location}
            />
        </div>
    );
}
