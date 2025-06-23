import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { kediriPolygon } from "../data/map-koordinat";
import createCustomIcon from "../components/marker";
const MapProvider = forwardRef((props, ref) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const busMarkerRef = useRef({});
    const userMarkerRef = useRef(null);

    const [myLocation, setMyLocation] = useState({
        lat: null,
        long: null,
    });
    const { halte, onHalteClick, isAdmin = false , bus } = props;
    
    const clickZoom = useCallback(
        (e) => {
            mapRef.current.setView(e.target.getLatLng(), 25);
            onHalteClick({
                halte_id: e.target.options.id,
                lat: e.target.getLatLng().lat,
                lng: e.target.getLatLng().lng,
                halteName: e.target.options.alt,
            });
        },
        [onHalteClick]
    );

    useEffect(() => {
        if (mapRef.current !== null) {
            mapRef.current.remove();
        }
        // Bounds
        const tileLayer =
            "https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=WLwBLw0reffRjrA2gkQIRnF114LidMxbgrTpvUbugP7mOuCevCfuiq6S1RbbSqr6";
        const southWest = L.latLng(-7.84306, 111.97746);
        const northEast = L.latLng(-7.79468, 112.0451);
        const bounds = L.latLngBounds(southWest, northEast);
        const map = L.map(mapContainerRef.current, {
            maxBounds: bounds,
            center: [-7.8238, 112.0209],
            zoom: 17,
            minZoom: 15,
        });
        L.tileLayer(tileLayer, {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapRef.current = map;
    }, []);
    // jalur Bus
    useEffect(() => {
        const flipCoords = kediriPolygon.map((coord) => [coord[1], coord[0]]);
        L.polyline(flipCoords, { color: "#7C4585", weight: 4 }).addTo(
            mapRef.current
        );
    });

    // inisiasi Lokasi Bus
    useEffect(() => {
        if (!mapRef.current || isAdmin) return;
        // Lokasi Bus
        bus.map((bus) => {
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
    }, [bus]);
    // halte
    useEffect(() => {
        // terminal
        halte.map((data) => {
            L.marker([data.lokasi_lat, data.lokasi_long], {
                icon: createCustomIcon("halte", data.nama_halte),
                alt: data.nama_halte,
                id: data.id_halte,
            })
                .addTo(mapRef.current)
                .on("click", clickZoom);
        });
    }, [halte]);
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
        }
    }, [myLocation]);
    const  busSearchHandle  = useCallback((busId)  => {
        if(bus.length === 0) {
            alert("Tidak ada bus yang ditemukan");
            return;
        }
        const buses =  bus.find((b) => b.id === busId); 
        if (buses && mapRef.current) {
            mapRef.current.flyTo([buses.lat, buses.lng], 17);
        }
    }, [bus]);

    const userLocationHandle = useCallback(() => {
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
    });
    // Expose function to parent via ref
    useImperativeHandle(ref, () => ({
        busSearchHandle,
        userLocationHandle,
    }));

    return (
        <div>
            <div ref={mapContainerRef} className="w-full  h-screen z-1 "></div>
        </div>
    );
});

export default MapProvider;
