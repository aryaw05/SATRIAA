import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { kediriPolygon } from "../data/map-koordinat";
import createCustomIcon from "./marker";

export default function MapComponent({
    halte,
    jumlahBus,
    myLocation,
    setMyLocation,
    mapRef,
    userMarkerRef,
    busMarkerRef,
}) {
    function clickZoom(e) {
        mapRef.current.setView(e.target.getLatLng(), 25);
    }

    function initLocation() {
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

            mapRef.current.flyTo(
                [position.coords.latitude, position.coords.longitude],
                17
            );
        }

        function error() {
            alert("Lokasi Tidak Ditemukan");
        }
    }

    useEffect(() => {
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

        mapRef.current = map;

        return () => {
            map.remove();
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current || !myLocation.lat) return;

        if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([myLocation.lat, myLocation.long]);
        } else {
            userMarkerRef.current = L.marker(
                [myLocation.lat, myLocation.long],
                {
                    icon: createCustomIcon("user", ""),
                }
            )
                .addTo(mapRef.current)
                .on("click", clickZoom);
        }
    }, [myLocation]);

    useEffect(() => {
        if (!mapRef.current) return;

        jumlahBus.forEach((bus) => {
            if (!busMarkerRef.current[bus.id]) {
                const busMarker = (busMarkerRef.current[bus.id] = L.marker(
                    [bus.lat, bus.lng],
                    {
                        icon: createCustomIcon("bus", `bus${bus.id}`),
                    }
                )
                    .addTo(mapRef.current)
                    .on("click", clickZoom));
            }
        });
    }, [jumlahBus]);

    useEffect(() => {
        const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
        L.polyline(flipCoords, { color: "#F48502", weight: 4 }).addTo(
            mapRef.current
        );
    }, []);

    useEffect(() => {
        halte.forEach((data) => {
            L.marker([data.lokasi_lat, data.lokasi_long], {
                icon: createCustomIcon("halte", data.nama_halte),
                alt: "halte",
            })
                .addTo(mapRef.current)
                .on("click", clickZoom);
        });
    }, [halte]);

    return <div id="map" className="w-full h-screen z-1"></div>;
}
