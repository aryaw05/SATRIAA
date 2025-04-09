import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, useEffect, useRef } from "react";
import { kediriPolygon, halteCoords } from "../data/map-koordinat";
import createCustomIcon from "../components/marker";
import MenuBar from "../components/menu-bar/Menu-bar";
export default function Home() {
    const mapRef = useRef(null);
    const userMarkerRef = useRef(null);
    const busMarkerRef = useRef({});

    const [myLocation, setMyLocation] = useState({
        lat: null,
        long: null,
    });

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

            mapRef.current.flyTo(
                [position.coords.latitude, position.coords.longitude],
                17
            );
        }

        function error() {
            alert("Lokasi Tidak Ditemukan");
        }
    }
    const busSearch = (busId) => {
        const bus = jumlahBus.find((b) => b.id === busId);
        if (bus && mapRef.current) {
            mapRef.current.flyTo([bus.lat, bus.lng], 17);
        }
    };
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

    // inisiasi map
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

        mapRef.current = map;
    }, []);
    function clickZoom(e) {
        mapRef.current.setView(e.target.getLatLng(), 25);
    }
    // inisiasi Lokasi User
    useEffect(() => {
        if (!mapRef.current || !myLocation.lat) return;

        // Lokasi User
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
            // const userPosition = userMarker.getLatLng();
            // map.panTo(userPosition);
        }
    }, [myLocation]);

    // inisiasi Lokasi Bus
    useEffect(() => {
        if (!mapRef.current) return;
        // Lokasi Bus
        jumlahBus.map((bus) => {
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

    // jalur Bus
    useEffect(() => {
        const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
        L.polyline(flipCoords, { color: "#9EC6F3" }).addTo(mapRef.current);
    });
    // halte
    useEffect(() => {
        // terminal
        halteCoords.map((coord) => {
            L.marker([coord[1], coord[0]], {
                icon: createCustomIcon("halte", coord[1]),
                alt: "halte",
            })
                .addTo(mapRef.current)
                .on("click", clickZoom);
        });
    });
    return (
        <div className=" ">
            <div id="map" className="w-full h-screen z-1"></div>
            {/* <button onClick={Location()}>Lokasi Saya</button> */}

            <MenuBar
                totalBus={jumlahBus}
                onClickBus={busSearch}
                onClickUser={Location}
            />
        </div>
    );
}
