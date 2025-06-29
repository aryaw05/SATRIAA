import { Head, router } from "@inertiajs/react";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { handleDelete, handleEdit, handleSubmit } from "../../utils/handleCRUD";
import useActionForm from "../../hooks/useActionForm";
import MapProvider from "../../data/MapProvider";

const HalteSatria = (props) => {
    const { halte } = props;
    const { formData, handleChange, setFormData } = useActionForm();

    const [dataHalte, setDataHalte] = useState({
        halte_id: null,
        lat: null,
        lng: null,
        halteName: null,
    });
    console.log(dataHalte.halteName);

    function clickZoom(e) {
        setDataHalte(e);
    }

    const showModalEdit = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        if (dataHalte.halte_id) {
            setFormData({
                halte_id: dataHalte.halte_id || "",
                nama_halte: dataHalte.halteName || "",
                lokasi_lat: dataHalte.lat || "",
                lokasi_long: dataHalte.lng || "",
            });
        }
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
                    <div>
                        {/* Form Input Halte */}
                        <form
                            action=""
                            onSubmit={(e) =>
                                handleSubmit(e, "/createHalte", formData)
                            }
                        >
                            <div className="fixed bottom-0 w-full bg-white pb-3 pt-4 sm:relative sm:w-4/6 sm:ml-auto sm:h-full sm:flex sm:flex-col sm:justify-start sm:items-end">
                                <div className="w-full max-w-md mx-auto px-6 py-3 grid grid-cols-1 gap-4 sm:px-12 sm:pt-10">
                                    {/* Nama Halte */}
                                    <div>
                                        <p className="text-lg font-semibold text-black">
                                            Nama Halte
                                        </p>
                                        <input
                                            type="text"
                                            name="nama_halte"
                                            required
                                            onChange={handleChange}
                                            className="input rounded-lg bg-gray-100 w-full"
                                            placeholder="Masukkan nama"
                                        />
                                    </div>

                                    {/* Latitude */}
                                    <div>
                                        <p className="text-lg font-semibold text-black">
                                            Latitude
                                        </p>
                                        <input
                                            type="number"
                                            required
                                            step="any"
                                            name="lokasi_lat"
                                            onChange={handleChange}
                                            className="input rounded-lg bg-gray-100 w-full"
                                            placeholder="Masukkan latitude"
                                        />
                                    </div>

                                    {/* Longitude */}
                                    <div>
                                        <p className="text-lg font-semibold text-black">
                                            Longitude
                                        </p>
                                        <input
                                            type="number"
                                            step="any"
                                            required
                                            name="lokasi_long"
                                            onChange={handleChange}
                                            className="input rounded-lg bg-gray-100 w-full"
                                            placeholder="Masukkan longitude"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-center mt-3">
                                        <button
                                            className="btn rounded-lg bg-orange-500 w-3/4 text-white"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Detail Halte - Di luar form */}
                        <div className="w-full px-6 mt-5 sm:w-4/6 sm:ml-auto sm:pr-12">
                            <div className="flex justify-between rounded-3xl bg-[#f1c65d] shadow-md ">
                                {/* Icon */}
                                <div className="bg-orange-500 flex items-center justify-center px-5 py-4 rounded-l-3xl">
                                    <FontAwesomeIcon
                                        icon={"fa-solid fa-bus"}
                                        className="text-4xl text-white"
                                    />
                                </div>

                                {/* Info Halte */}
                                <div className="px-5 py-4 flex-1">
                                    <div className="text-lg font-bold text-center">
                                        {dataHalte.halteName || "-"}
                                    </div>
                                    <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium mt-1">
                                        <span>Latitude</span>
                                        <span>:</span>
                                        <span className="text-black font-bold">
                                            {dataHalte.lat || "-"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium">
                                        <span>Longitude</span>
                                        <span>:</span>
                                        <span className="text-black font-bold">
                                            {dataHalte.lng || "-"}
                                        </span>
                                    </div>
                                </div>

                                {/* Dropdown */}
                                <div className="flex items-center px-4">
                                    <div className="dropdown dropdown-top dropdown-end">
                                        <div tabIndex={0}>
                                            <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
                                        >
                                            <li>
                                                <button
                                                    onClick={() =>
                                                        showModalEdit(
                                                            "editModal"
                                                        )
                                                    }
                                                >
                                                    Edit Halte
                                                </button>
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
                        </div>
                    </div>
                </div>
            </div>

            {/* mdal edit halte */}

            <dialog id="editModal" className="modal">
                <div className="modal-box rounded-3xl w-[95%] max-w-md">
                    <form method="dialog">
                        <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
                            ✕
                        </button>
                    </form>

                    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                        Edit Halte
                    </h1>
                    <form
                        className="space-y-4 px-2 py-4"
                        onSubmit={(e) => {
                            handleEdit(
                                e,
                                "editHalte",
                                formData.halte_id,
                                formData
                            );
                        }}
                    >
                        <div>
                            <label className="text-sm text-black">
                                Nama Halte
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.nama_halte || ""}
                                name="nama_halte"
                                type="text"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                longitude
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.lokasi_long || ""}
                                name="lokasi_long"
                                type="text"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                latitude
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.lokasi_lat || ""}
                                name="lokasi_lat"
                                type="text"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button className="btn bg-orange-500 w-4/5 text-white">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default HalteSatria;
