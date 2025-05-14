import { Head, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import createCustomIcon from "../../components/marker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
const HalteSatria = (props) => {
    const { halte } = props;

    const [formData, setFormData] = useState({
        nama_halte: "",
        lokasi_lat: "",
        lokasi_long: "",
    });

    const [dataHalte, setDataHalte] = useState({
        halte_id: null,
        lat: null,
        lng: null,
        halteName: null,
    });
    const mapRef = useRef(null);
    function clickZoom(e) {
        mapRef.current.setView(e.target.getLatLng(), 25);
        const halteLatLng = e.target.getLatLng();
        const halteName = e.target.options.alt;
        const halteId = e.target.options.id;

        setDataHalte({
            halte_id: halteId,
            lat: halteLatLng.lat,
            lng: halteLatLng.lng,
            halteName: halteName,
        });
    }
    useEffect(() => {
        if (mapRef.current !== null) {
            mapRef.current.remove();
        }
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
    // halte
    useEffect(() => {
        // terminal
        halte.map((data) => {
            L.marker([data.lokasi_lat, data.lokasi_long], {
                id: data.id_halte,
                icon: createCustomIcon("halte", data.nama_halte),
                alt: data.nama_halte,
            })
                .addTo(mapRef.current)
                .on("click", clickZoom);
        });
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const res = router.post("/createHalte", formData);
        console.log(res);
    };

    const handleDelete = (id) => {
        const res = router.delete(`/deleteHalte/${id}`);
        console.log(res);
    };

    const handleEdit = (id) => {
        const res = router.put(`/editHalte/${id}`, formData);
        console.log(res);
    };
    return (
        <>
            <Head>
                <title>Halte SATRIAAAAA</title>
            </Head>

            <div className="bg-white min-h-screen items-center justify-center">
                {/* Navbar */}
                <Navbar />

                {/* Grid Layout for Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 sm:h-screen pt-17 sm:pl-2">
                    {/* Main Content (empty for desktop) */}
                    <div className="bg-gray-400 sm:rounded-3xl sm:m-6 sm:block w-full h-screen sm:h-[92%] sm:w-[132%] overflow-hidden">
                        {/* Place for real-time map */}
                        <div id="map" className="w-full h-screen z-1"></div>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        {/* Input Form at the bottom */}
                        <div className="fixed bottom-0 w-full bg-white pb-3 pt-4 sm:relative sm:w-4/6 sm:ml-auto sm:h-full sm:flex sm:flex-col sm:justify-start sm:items-end">
                            {/* Bus Stop Information */}
                            <div className="flex w-fit mx-auto  justify-between rounded-3xl  bg-[#f1c65d] mb-1 order-1 sm:order-2 sm:py-auto sm:mt-5 sm:w-[85%] ">
                                <div className=" flex flex-row">
                                    {/* Bus Stop Icon */}
                                    <div className="bg-orange-500 flex items-center justify-center px-5 py-4 rounded-3xl">
                                        <FontAwesomeIcon
                                            icon={"fa-solid fa-bus"}
                                            className="text-4xl text-white"
                                        />
                                    </div>

                                    {/* Bus Stop Details */}
                                    <div className="px-5 py-4 space-y-1">
                                        <div className="sm:text-xl text-center font-bold">
                                            {!dataHalte.halteName
                                                ? "-"
                                                : dataHalte.halteName}
                                        </div>
                                        <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium">
                                            <span>Latitude</span>
                                            <span>:</span>
                                            <span className="text-black font-bold">
                                                {!dataHalte.lat
                                                    ? "-"
                                                    : dataHalte.lat}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium">
                                            <span>Longitude</span>
                                            <span>:</span>
                                            <span className="text-black font-bold">
                                                {!dataHalte.lng
                                                    ? "-"
                                                    : dataHalte.lng}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className=" flex justify-center px-5 py-4  ">
                                    <div className="dropdown dropdown-top dropdown-end ">
                                        <div tabIndex={0}>
                                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                                        >
                                            <li>
                                                <a>Edit Halte</a>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="text-red-500"
                                                    onClick={() =>
                                                        handleDelete(
                                                            dataHalte.halte_id
                                                        )
                                                    }
                                                >
                                                    Delete Halte
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Input Form */}
                            <div className="w-full max-w-md mx-auto px-6 py-3 grid grid-cols-1 gap-2 order-2 sm:order-1 sm:px-12 sm:pt-10">
                                <div>
                                    <p className="text-lg font-semibold text-black">
                                        Nama Halte
                                    </p>
                                    <input
                                        required
                                        type="text"
                                        name="nama_halte"
                                        value={formData.nama_halte}
                                        onChange={handleChange}
                                        className="input rounded-lg bg-gray-100 w-full"
                                        placeholder="Masukkan nama"
                                    />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-black">
                                        Latitude
                                    </p>
                                    <input
                                        required
                                        type="number"
                                        step="any"
                                        name="lokasi_lat"
                                        value={formData.lokasi_lat}
                                        onChange={handleChange}
                                        className="input rounded-lg bg-gray-100 w-full"
                                        placeholder="Masukkan latitude"
                                    />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-black">
                                        Longitude
                                    </p>
                                    <input
                                        required
                                        type="number"
                                        step="any"
                                        name="lokasi_long"
                                        value={formData.lokasi_long}
                                        onChange={handleChange}
                                        className="input rounded-lg bg-gray-100 w-full"
                                        placeholder="Masukkan longitude"
                                    />
                                </div>
                                <div className="flex justify-center mt-3">
                                    <button
                                        className="btn rounded-lg  bg-orange-500 w-3/4"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default HalteSatria;
