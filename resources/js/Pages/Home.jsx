import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect } from "react";
import kediriPolygon from "../data/map-koordinat";
import createCustomIcon from "../components/marker";
import MenuBar from "../components/menu-bar/Menu-bar";
export default function Home() {
    const [myLocation, setMyLocation] = useState({
        lat: null,
        long: null,
    });
    const [busId, setBusId] = useState(null);
    function Location() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert("Lokasi Tidak Ditemukan");
        }

        function success(position) {
            setMyLocation({
                long: position.coords.longitude,
                lat: position.coords.latitude,
            });
        }

        function error() {
            alert("Lokasi Tidak Ditemukan");
        }
    }

    function busSearch(id) {
        if (busId === null) {
            setBusId(id);
        } else {
            setBusId(id);
        }
    }
    //jika jumlah diambil dari database
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
    useEffect(() => {
        // Bounds
        const southWest = L.latLng(-7.84306, 111.97746);
        const northEast = L.latLng(-7.79468, 112.0451);
        const bounds = L.latLngBounds(southWest, northEast);
        const map = L.map("map", {
            maxBounds: bounds,
            center: [-7.8238, 112.0209],
            zoom: 17,
            minZoom: 15,
        });
        L.tileLayer(
            "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(map);

        let marker = null;
        // Lokasi User
        // if (myLocation.lat && myLocation.long) {
        //     marker = L.marker([myLocation.lat, myLocation.long], {
        //         icon: UserMarker,
        //     }).addTo(map);
        // }

        // Lokasi Terminal
        // looping lokasi dengan data latlangs diambil dari array
        kediriPolygon.map((coord, index) => {
            L.marker([coord[1], coord[0]], {
                icon: createCustomIcon("halte", coord[1]),
                alt: "halte",
            })
                .addTo(map)
                .on("click", clickZoom);
        });

        function clickZoom(e) {
            map.setView(e.target.getLatLng(), 25);
        }

        jumlahBus.map((bus) => {
            const marker = L.marker([bus.lat, bus.lng], {
                icon: createCustomIcon("bus", "", bus.id),
            })
                .addTo(map)
                .on("click", clickZoom);
            let markerId = (marker._leaflet_id = bus.id);
            const position = marker.getLatLng();
            if (markerId === busId) {
                map.setView(position, 17);
            }
        });
        // Lokasi Bus
        const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
        L.polyline(flipCoords, { color: "#9EC6F3" }).addTo(map);
        // Bersihkan map saat komponen unmount
        return () => {
            map.remove();
            if (marker) marker.remove();
        };
    }, [myLocation.lat, myLocation.long, busId]);
    return (
        <div className=" ">
            <div id="map" className="w-full h-screen z-1"></div>
            {/* <button onClick={Location()}>Lokasi Saya</button> */}
            {/* <button className="btn" onClick={() => busSearch(1)}>
                bus 1
            </button>
            <button className="btn" onClick={() => busSearch(2)}>
                bus 2
            </button>
            <button className="btn" onClick={() => busSearch(3)}>
                bus 3
            </button> */}
            <MenuBar totalBus={jumlahBus} onClick={busSearch} />
        </div>
    );
}
