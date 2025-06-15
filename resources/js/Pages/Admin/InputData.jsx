import { Head } from "@inertiajs/react";
import Navbar from "./Navbar";
import useActionForm from "../../hooks/useActionForm";
import { handleDelete, handleEdit, handleSubmit } from "../../utils/handleCRUD";
import { useEffect, useState } from "react";

const DataSatria = (props) => {
    const {buses} = props;
    console.log(buses);
    
    
    const [dataBus, setDataBus] = useState({
        idBus : null,
        indexBus : null
    });
        const { formData, handleChange , setFormData } = useActionForm();

  useEffect(() => {
    if (dataBus?.indexBus !== null) {
      const bus = buses[dataBus.indexBus];
      setFormData({
        nomor_bus: bus.nomor_bus || "",
        plat_nomor: bus.plat_nomor || "",
        jenis_bus: bus.jenis_bus || "",
        password: "",
      });
    }
  }, [dataBus, buses]);        
    // Fungsi untuk menampilkan modal
    const showModal1 = () => {
        const modal = document.getElementById("my_modal_1");
        if (modal) modal.showModal();
    };

    const showModal2 = () => {
        const modal = document.getElementById("my_modal_2");
        if (modal) modal.showModal();
    };
       const showModal3 = (index) => {
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.showModal();
        setDataBus({
            idBus : buses[index].id_bus,
            indexBus : index
        });
    };

    return (
        <>
            <Head>
                <title>Data SATRIA</title>
            </Head>

            <div className="min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Konten */}
                <div className="px-4 py-6 pt-23">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Bagian kiri - Jadwal */}
                        <div className="lg:w-1/2 w-full">
                            <button
                                className="btn bg-orange-400 mb-3 rounded-lg w-1/2 lg:w-auto"
                                onClick={showModal1}
                            >
                                + Tambah Jadwal
                            </button>
                            <div className="overflow-auto">
                                <table className="table border border-collapse text-center w-full min-w-[500px]">
                                    <thead className="bg-orange-400">
                                        <tr>
                                            <th className="border">Nama Bus</th>
                                            <th className="border">
                                                Nama Halte
                                            </th>
                                            <th className="border">
                                                Waktu Berangkat
                                            </th>
                                            <th className="border">
                                                Waktu Tiba
                                            </th>
                                            <th className="border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border">SATRIA</td>
                                            <td className="border">
                                                Halte Sukorame
                                            </td>
                                            <td className="border">08.40</td>
                                            <td className="border">10.20</td>
                                            <td className="border"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bagian kanan - Data Bus */}
                        <div className="lg:w-1/2 w-full">
                            <button
                                className="btn bg-orange-500 mb-3 rounded-lg w-1/2 lg:w-auto"
                                onClick={showModal2}
                            >
                                + Tambah Data
                            </button>
                            <div className="overflow-auto">
                                <table className="table border border-collapse text-center w-full min-w-[500px]">
                                    <thead className="bg-orange-500">
                                        <tr>
                                            <th className="border">Nama Bus</th>
                                            <th className="border">Jenis Bus</th>
                                            <th className="border">
                                                Plat Nomor
                                            </th>
                                            <th className="border">Status</th>
                                            <th className="border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            buses?.map((e , index)=> {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border">{e.nomor_bus}</td>
                                                        <td className="border">
                                                            {e.jenis_bus}
                                                        </td>
                                                        <td className="border">{e.plat_nomor}</td>
                                                        <td className="border"> {e.status}</td>
                                                        <td className="border">
                                                            <div className="justify-center flex gap-2">
                                                                <button className="btn btn-error"  onClick={() => handleDelete(e.id_bus ,"admin/dashboard/bus/delete")}>Delete</button>
                                                                <button className="btn btn-info" onClick={() => showModal3(index)}>Edit</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Tambah Jadwal */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box rounded-3xl w-[95%] max-w-md">
                        <form method="dialog">
                            <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
                                ✕
                            </button>
                        </form>

                        <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                            Tambah Jadwal Bus
                        </h1>
                        <form className="space-y-4 px-2 py-4">
                            <div>
                                <label className="text-sm text-black">
                                    Nama Bus
                                </label>
                                <input
                                    type="text"
                                    className="input w-full bg-gray-100"
                                    placeholder="Masukkan Nama Bus"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-black">
                                    Nama Halte
                                </label>
                                <select className="select select-bordered w-full">
                                    <option>Halte Sukorame</option>
                                    <option>Halte Penanggungan</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-black">
                                    Waktu Berangkat
                                </label>
                                <input
                                    type="time"
                                    className="input w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-black">
                                    Waktu Tiba
                                </label>
                                <input
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

                {/* Modal Tambah Data */}
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box rounded-3xl w-[95%] max-w-md">
                        <form method="dialog" >
                            <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
                                ✕
                            </button>
                        </form>

                        <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                            Tambah Data Bus
                        </h1>
                        <form className="space-y-4 px-2 py-4" onSubmit={(e)=> {
                            handleSubmit(e ,"/admin/dashboard/bus/add",formData);
                        }}>
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
                                    type="text"
                                    name="password"
                                    className="input w-full bg-gray-100"
                                    placeholder="Masukkan Password Bus"
                                />
                            </div>
                            <div className="flex justify-center pt-4">
                                <button className="btn bg-orange-500 w-4/5 text-white " type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
                
                {/* Modal Edit Data Bus */}
                 <dialog id="my_modal_3" className="modal">
                    <div className="modal-box rounded-3xl w-[95%] max-w-md">
                        <form method="dialog" >
                            <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
                                ✕
                            </button>
                        </form>

                        <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
                            Edit Data Bus 
                        </h1>
                        <form className="space-y-4 px-2 py-4">
                            <div>
                                <label className="text-sm text-black">
                                    Nama Bus
                                </label>
                                <input
                                    value={formData.nomor_bus || " "}  
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
                                    value={formData.plat_nomor || " "}
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
                                    value={formData.jenis_bus || " "} 
                                    type="text"
                                    onChange={handleChange}
                                    required
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
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    className="input w-full bg-gray-100"
                                    placeholder="Masukkan Password Baru Bus"
                                />
                            </div>
                            <div className="flex justify-center pt-4">
                                <button className="btn bg-orange-500 w-4/5 text-white "    type="button" onClick = {(e)=> {
                            handleEdit(e,"admin/dashboard/bus/edit", dataBus?.idBus ,formData);
                        }}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default DataSatria;
