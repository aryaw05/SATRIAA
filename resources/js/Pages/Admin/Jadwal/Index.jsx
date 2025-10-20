import { use, useEffect, useState } from "react";
import useActionForm from "../../../hooks/useActionForm";
import {
    handleDelete,
    handleEdit,
    handleSubmit,
} from "../../../utils/handleCRUD";
import { useAlert } from "../../../hooks/useAlert";
import AlertList from "../../../components/alert/AlertList";
import DashboardLayout from "../Layout/DashboardLayout";

export default function JadwalBus(props) {
    const { jadwal, buses, halte } = props;
    const { isAlert, showError, showSuccess, clearAlert } = useAlert();

    const { formData, handleChange, setFormData } = useActionForm();
    const [dataJadwal, setdataJadwal] = useState({
        indexBus: null,
    });
    console.log("dataJadwal", formData);
    useEffect(() => {
        if (dataJadwal?.indexBus !== null) {
            const jadwalBus = jadwal[dataJadwal.indexBus];

            setFormData({
                id_halte: jadwalBus.id_halte || "",
                id_jadwal: jadwalBus.id_jadwal || "",
                id_bus: jadwalBus.id_bus || "",
                waktu_berangkat: jadwalBus.waktu_berangkat || "",
                waktu_tiba: jadwalBus.waktu_tiba || "",
            });
        } else {
            setFormData({});
        }
    }, [dataJadwal]);

    function editDataJadwal(modalId, index) {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        setdataJadwal({
            indexBus: index,
        });
    }

    function addDataJadwal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    }
    return (
        <DashboardLayout>
            <AlertList isAlert={isAlert} clearAlert={clearAlert} />

            <div className="px-4 py-5 ">
                <button
                    className="btn bg-orange-400 mb-3 rounded-lg w-1/2 lg:w-auto"
                    onClick={() => addDataJadwal("my_modal_1")}
                >
                    + Tambah Jadwal
                </button>
                <div className="overflow-auto">
                    <table className="table border border-collapse text-center w-full min-w-[500px]">
                        <thead className="bg-orange-400">
                            <tr>
                                <th className="border">Nama Bus</th>
                                <th className="border">Nama Halte</th>
                                <th className="border">Waktu Berangkat</th>
                                <th className="border">Waktu Tiba</th>
                                <th className="border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwal?.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="border">
                                            {e.bus.nomor_bus}
                                        </td>
                                        <td className="border">
                                            {e.halte.nama_halte}
                                        </td>
                                        <td className="border">
                                            {" "}
                                            {e.waktu_berangkat}
                                        </td>
                                        <td className="border">
                                            {e.waktu_tiba}
                                        </td>
                                        <td className="border">
                                            <div className="justify-center flex flex-col gap-2">
                                                <button
                                                    className="btn btn-error"
                                                    onClick={() =>
                                                        handleDelete(
                                                            e.id_jadwal,
                                                            "admin/dashboard/jadwal/delete",
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        showSuccess(
                                                                            [
                                                                                "Data Berhasil Dihapus",
                                                                            ]
                                                                        );
                                                                    },
                                                                onError: (
                                                                    errors
                                                                ) => {
                                                                    showError(
                                                                        Object.values(
                                                                            errors
                                                                        )
                                                                    );
                                                                },
                                                            }
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        editDataJadwal(
                                                            "my_modal_4",
                                                            index
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal Tambah Jadwal */}
            <dialog id="my_modal_1" className="modal">
                <AlertList isAlert={isAlert} clearAlert={clearAlert} />
                <div className="modal-box rounded-3xl w-[95%] max-w-md">
                    <form method="dialog">
                        <button
                            className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black"
                            onClick={() =>
                                setdataJadwal({
                                    indexBus: null,
                                })
                            }
                        >
                            ✕
                        </button>
                    </form>

                    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                        Tambah Jadwal Bus
                    </h1>
                    <form
                        className="space-y-4 px-2 py-4"
                        onSubmit={(e) => {
                            handleSubmit(
                                e,
                                "/admin/dashboard/jadwal/add",
                                formData,
                                {
                                    onSuccess: () => {
                                        setdataJadwal({
                                            indexBus: null,
                                        });
                                        showSuccess(["Data Berhasil Ditambah"]);
                                    },
                                    onError: (errors) => {
                                        showError(Object.values(errors));
                                    },
                                }
                            );
                        }}
                    >
                        <div>
                            <label className="text-sm text-black">
                                Nama Bus
                            </label>
                            <select
                                className="select w-full bg-gray-100"
                                onChange={handleChange}
                                name="id_bus"
                            >
                                <option disabled>Pilih Nama Bus</option>
                                {buses.map((buss) => (
                                    <option
                                        key={buss.id_bus}
                                        value={buss.id_bus}
                                    >
                                        {buss.nomor_bus}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Nama Halte
                            </label>
                            <select
                                className="select select-bordered w-full"
                                onChange={handleChange}
                                name="id_halte"
                            >
                                {halte.map((h) => (
                                    <option key={h.id_halte} value={h.id_halte}>
                                        {h.nama_halte}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Waktu Berangkat
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.waktu_berangkat || ""}
                                required
                                name="waktu_berangkat"
                                type="time"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Waktu Tiba
                            </label>
                            <input
                                onChange={handleChange}
                                value={formData.waktu_tiba || ""}
                                required
                                name="waktu_tiba"
                                type="time"
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

            {/* Modal edit Data Jadwal */}
            <dialog id="my_modal_4" className="modal">
                <AlertList isAlert={isAlert} clearAlert={clearAlert} />
                <div className="modal-box rounded-3xl w-[95%] max-w-md">
                    <form method="dialog">
                        <button
                            className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black"
                            onClick={() =>
                                setdataJadwal({
                                    indexBus: null,
                                })
                            }
                        >
                            ✕
                        </button>
                    </form>

                    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                        Edit Jadwal Bus
                    </h1>
                    <form
                        className="space-y-4 px-2 py-4"
                        onSubmit={(e) => {
                            handleEdit(
                                e,
                                "admin/dashboard/jadwal/edit",
                                formData?.id_jadwal,
                                formData,
                                {
                                    onSuccess: () => {
                                        showSuccess(["Data Berhasil Diubah"]);
                                    },
                                    onError: (errors) => {
                                        showError(Object.values(errors));
                                    },
                                }
                            );
                        }}
                    >
                        <div>
                            <label className="text-sm text-black">
                                Nama Bus
                            </label>
                            <select
                                className="select w-full bg-gray-100"
                                onChange={handleChange}
                                name="id_bus"
                            >
                                <option value={formData?.id_bus}>
                                    {
                                        jadwal[dataJadwal?.indexBus]?.bus
                                            .nomor_bus
                                    }
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Nama Halte
                            </label>
                            <select
                                className="select select-bordered w-full"
                                onChange={handleChange}
                                name="id_halte"
                            >
                                <option value={formData?.id_halte}>
                                    {
                                        jadwal[dataJadwal?.indexBus]?.halte
                                            .nama_halte
                                    }
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Waktu Berangkat
                            </label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.waktu_berangkat || ""}
                                name="waktu_berangkat"
                                type="time"
                                step="1"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Waktu Tiba
                            </label>
                            <input
                                onChange={handleChange}
                                required
                                value={formData.waktu_tiba || ""}
                                name="waktu_tiba"
                                type="time"
                                step="1"
                                className="input w-full bg-gray-100"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button className="btn bg-orange-500 w-4/5 text-white ">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </DashboardLayout>
    );
}
