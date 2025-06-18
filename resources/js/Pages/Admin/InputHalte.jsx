import { Head, router } from "@inertiajs/react";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { handleDelete, handleSubmit } from "../../utils/handleCRUD";
import useActionForm from "../../hooks/useActionForm";
import MapProvider from "../../data/MapProvider";

const HalteSatria = (props) => {
    console.log(props);
    
    const { halte } = props;
    const { formData, handleChange } = useActionForm({
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
    function clickZoom(e) {
        setDataHalte(e);
    }

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
                        <MapProvider
                            halte={halte}
                            onHalteClick={clickZoom}
                            isAdmin={true}
                        />
                    </div>
                    <form
                        action=""
                        onSubmit={(e) => {
                            handleSubmit(e, "/createHalte", formData);
                        }}
                    >
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
                                                            dataHalte.halte_id,
                                                            "deleteHalte"
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
