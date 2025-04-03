import React, { useState } from "react";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { busIcon, halteIcon } from "../data/marker";
import kediriPolygon from "../data/map-koordinat";
export default function Home() {
    const [myLocation, setMyLocation] = useState({
        lat: null,
        long: null,
    });
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
    //     }

    //     function error() {
    //         alert("Lokasi Tidak Ditemukan");
    //     }
    // }
    useEffect(() => {
        // Bounds
        const southWest = L.latLng(-7.84306, 111.97746);
        const northEast = L.latLng(-7.79468, 112.0451);
        const bounds = L.latLngBounds(southWest, northEast);
        const map = L.map("map", {
            maxBounds: bounds,
            center: [-7.8238, 112.0109],
            zoom: 16,
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
        if (myLocation.lat && myLocation.long) {
            marker = L.marker([myLocation.lat, myLocation.long]).addTo(map);
        }

        // Lokasi Terminal
        // looping lokasi dengan data latlangs diambil dari array
        kediriPolygon.map((coord) => {
            L.marker([coord[1], coord[0]], { icon: halteIcon }).addTo(map);
        });

        // Lokasi Bus
        L.marker([-7.8238, 112.0209], { icon: busIcon }).addTo(map);

        const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
        L.polyline(flipCoords, { color: "#9EC6F3" }).addTo(map);
        // Bersihkan map saat komponen unmount
        return () => {
            map.remove();
            if (marker) marker.remove();
        };
    }, []);
    return (
        <div>
            <h1>Home Page</h1>
            <p>Pengunjung: 20</p>
            <div id="map" className="w-full h-screen"></div>
            {/* <button onClick={Location()}>Lokasi Saya</button> */}
        </div>
    );
}
