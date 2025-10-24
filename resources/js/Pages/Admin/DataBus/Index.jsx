import { useEffect, useState } from "react";
import {
    handleDelete,
    handleEdit,
    handleSubmit,
} from "../../../utils/handleCRUD";
import useActionForm from "../../../hooks/useActionForm";
import { useAlert } from "../../../hooks/useAlert";
import AlertList from "../../../components/alert/AlertList";
import DashboardLayout from "../Layout/DashboardLayout";

export default function InputBus(props) {
    const { buses } = props;
    const { showError, showSuccess, clearAlert, isAlert } = useAlert();
    const [dataBus, setDataBus] = useState({
        index: null,
    });
    const { formData, handleChange, setFormData } = useActionForm();
    useEffect(() => {
        if (dataBus?.index !== null) {
            const dataBuses = buses[dataBus.index];
            setFormData({
                id_bus: dataBuses.id_bus || "",
                nomor_bus: dataBuses.nomor_bus || "",
                plat_nomor: dataBuses.plat_nomor || "",
                jenis_bus: dataBuses.jenis_bus || "",
                password: "",
            });
        }
    }, [dataBus]);

    function editDataBus(modalId, index) {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        setDataBus({
            index,
        });
    }

    function addDataBus(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    }
    return (
        <DashboardLayout>
            <AlertList isAlert={isAlert} clearAlert={clearAlert} />
            <div className="px-4 py-5">
                <button
                    className="btn text-sm bg-green-600 text-white mb-3 rounded-lg w-1/2 lg:w-auto"
                    onClick={() => addDataBus("my_modal_2")}
                >
                    + Tambah Data
                </button>
                <div className=" overflow-x-auto  rounded-lg bg-base-100 shadow-sm">
                    <table className="table text-center w-full min-w-[500px]">
                        <thead className="bg-gray-200 ">
                            <tr>
                                <th>Nama Bus</th>
                                <th>Jenis Bus</th>
                                <th>Plat Nomor</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses?.map((e, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                                    >
                                        <td>{e.nomor_bus}</td>
                                        <td>{e.jenis_bus}</td>
                                        <td>{e.plat_nomor}</td>
                                        <td>
                                            {e.status ? "Aktif" : "Tidak Aktif"}
                                        </td>
                                        <td>
                                            <div className="justify-center flex gap-2">
                                                <button
                                                    className="btn bg-red-500 text-white"
                                                    onClick={() =>
                                                        handleDelete(
                                                            e.id_bus,
                                                            "admin/dashboard/bus/delete",
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        showSuccess(
                                                                            [
                                                                                "Data bus berhasil dihapus",
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
                                                        editDataBus(
                                                            "my_modal_3",
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

            {/* Modal Tambah Data Bus */}
            <dialog id="my_modal_2" className="modal">
                <AlertList isAlert={isAlert} clearAlert={clearAlert} />
                <div className="modal-box rounded-3xl w-[95%] max-w-md">
                    <form method="dialog">
                        <button
                            className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black"
                            onClick={() =>
                                setDataBus({
                                    index: null,
                                })
                            }
                        >
                            ✕
                        </button>
                    </form>

                    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                        Tambah Data Bus
                    </h1>
                    <form
                        className="space-y-4 px-2 py-4"
                        onSubmit={(e) => {
                            handleSubmit(
                                e,
                                "/admin/dashboard/bus/add",
                                formData,
                                {
                                    onSuccess: () => {
                                        showSuccess([
                                            "Data bus berhasil ditambahkan",
                                        ]);
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
                            <input
                                type="text"
                                required
                                name="nomor_bus"
                                onChange={handleChange}
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Nama Driver"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Plat Nomor
                            </label>
                            <input
                                type="text"
                                required
                                name="plat_nomor"
                                onChange={handleChange}
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Plat Nomor"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Jenis Bus
                            </label>
                            <input
                                onChange={handleChange}
                                required
                                name="jenis_bus"
                                type="text"
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Jenis Bus"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Password Bus
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Password Bus"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button
                                className="btn bg-orange-500 w-4/5 text-white "
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Modal Edit Data Bus */}
            <dialog id="my_modal_3" className="modal">
                <AlertList isAlert={isAlert} clearAlert={clearAlert} />
                <div className="modal-box rounded-3xl w-[95%] max-w-md">
                    <form method="dialog">
                        <button
                            className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black"
                            onClick={() => setFormData({})}
                        >
                            ✕
                        </button>
                    </form>

                    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                        Edit Data Bus
                    </h1>
                    <form
                        className="space-y-4 px-2 py-4"
                        onSubmit={(e) => {
                            handleEdit(
                                e,
                                "admin/dashboard/bus/edit",
                                formData?.id_bus,
                                formData,
                                {
                                    onSuccess: () => {
                                        showSuccess([
                                            "Data bus berhasil diubah",
                                        ]);
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
                            <input
                                value={formData.nomor_bus || ""}
                                type="text"
                                name="nomor_bus"
                                onChange={handleChange}
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Nama Driver"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Plat Nomor
                            </label>
                            <input
                                value={formData.plat_nomor || ""}
                                type="text"
                                name="plat_nomor"
                                onChange={handleChange}
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Plat Nomor"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Jenis Bus
                            </label>
                            <input
                                value={formData.jenis_bus || ""}
                                type="text"
                                onChange={handleChange}
                                name="jenis_bus"
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Jenis Bus"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-black">
                                Password Bus
                            </label>
                            <input
                                value={formData.password || ""}
                                type="password"
                                onChange={handleChange}
                                name="password"
                                autoComplete="new-password"
                                className="input w-full bg-gray-100"
                                placeholder="Masukkan Password Baru Bus"
                            />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button
                                className="btn bg-orange-500 w-4/5 text-white "
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </DashboardLayout>
    );
}
