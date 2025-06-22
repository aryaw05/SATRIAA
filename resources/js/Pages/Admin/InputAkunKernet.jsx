import { Head } from "@inertiajs/react";
import Navbar from "./Navbar";
import useActionForm from "../../hooks/useActionForm";
import { handleDelete, handleEdit, handleSubmit } from "../../utils/handleCRUD";


export default function InputAkunKernet(props) {
   
    const {kernet} = props;
    console.log(props);
        const { formData, handleChange , setFormData } = useActionForm();
        console.log(formData);
        


//     if (dataBus?.indexBus !== null) {
//         if(dataBus.component === "data_bus") {
//             const bus = buses[dataBus.indexBus];
//             setFormData({
//             nomor_bus: bus.nomor_bus || "",
//             plat_nomor: bus.plat_nomor || "",
//             jenis_bus: bus.jenis_bus || "",
//             password: "",
//             }); 
//         }
//         else if(dataBus.component === "jadwal_bus") {
//             const jadwalBus = jadwal[dataBus.indexBus];
//             console.log("jadwal bus" , jadwalBus);
//             setFormData({
//                 id_bus: jadwalBus.id_bus || "",
//                 id_halte: jadwalBus.id_halte || "",
//                 waktu_berangkat: jadwalBus.waktu_berangkat || "",
//                 waktu_tiba: jadwalBus.waktu_tiba || "",
//             });
//         }
     
//     }
//   }, [dataBus, buses]);        
//     // Fungsi untuk menampilkan modal


    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        setFormData({});
    }
       const showModalEdit = (index , modalId , component) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
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
                        {/* Bagian kiri - Jadwal */}
                        <div className=" w-full">
                            <button
                                className="btn bg-orange-400 mb-3 rounded-lg w-1/2 lg:w-auto"
                                onClick={() => showModal("my_modal_1")}
                            >
                                + Tambah Akun Kernet
                            </button>
                            <div className="overflow-auto">
                                <table className="table border border-collapse text-center w-full min-w-[500px]">
                                    <thead className="bg-orange-400">
                                        <tr>
                                            <th className="border">Nama Kernet</th>
                                            <th className="border">
                                                username
                                            </th>
                                            <th className="border">
                                                update terakhir
                                            </th>
                                            <th className="border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                        {/* bagian kolom kernet */}
                                          {
                                            kernet?.map((e , index)=> {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border">
                                                            {e.nama}
                                                        </td>
                                                        <td className="border"> {e.username}</td>
                                                        <td className="border">
                                                            {e.updated_at}
                                                        </td>
                                                        <td className="border">
                                                            <div className="justify-center flex flex-col gap-2">
                                                                <button className="btn btn-error"
                                                                onClick={() => handleDelete(e.id_user, "admin/dashboard/kernet/delete")} >Delete</button>
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
                {/* asdsad */}

                {/* Modal Tambah akun Kernet */}
                <dialog id="my_modal_1" className="modal">
  <div className="modal-box rounded-3xl w-[95%] max-w-md">
    <form method="dialog">
      <button
        className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black"
        // onClick={() => setDataBus({ idBus: null, indexBus: null, component: null })}
      >
        ✕
      </button>
    </form>

    <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
      Tambah Kernet
    </h1>
    <form
      className="space-y-4 px-2 py-4"
      onSubmit={(e) => {
        handleSubmit(e, "/admin/dashboard/kernet/add", formData);
      }}
    >
      <div>
        <label className="text-sm text-black">Nama Kernet</label>
        <input
          onChange={handleChange}
          required
          name="nama"
          type="text"
          className="input w-full bg-gray-100"
        />
      </div>
      <div>
        <label className="text-sm text-black">Username</label>
        <input
          onChange={handleChange}
          required
          name="username"
          type="text"
          className="input w-full bg-gray-100"
        />
      </div>
      <div>
        <label className="text-sm text-black">Password</label>
        <input
          onChange={handleChange}
          required
          name="password"
          type="password"
          className="input w-full bg-gray-100"
        />
      </div>
      <div className="flex justify-center pt-4">
        <button className="btn bg-orange-500 w-4/5 text-white">Submit</button>
      </div>
    </form>
  </div>
</dialog>
            </div>
        </>
    );
};

