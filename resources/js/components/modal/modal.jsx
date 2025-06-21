


// export default function ModalProvider(){
//     return(
//           <dialog id="my_modal_1" className="modal">
//                     <div className="modal-box rounded-3xl w-[95%] max-w-md">
//                         <form method="dialog">
//                             <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
//                                 ✕
//                             </button>
//                         </form>

//                         <h1 className="text-2xl font-semibold text-center pt-5 mb-4">
//                             Tambah Jadwal Bus
//                         </h1>
//                         <form className="space-y-4 px-2 py-4" onSubmit={(e)=> {handleSubmit(e ,"/admin/dashboard/jadwal/add",formData);}}>
//                             <div>
//                                 <label className="text-sm text-black">
//                                     Nama Bus
//                                 </label>
//                                 <select className="select w-full bg-gray-100" onChange={handleChange} name="id_bus">
//                                     <option value="" disabled >Pilih Nama Bus</option>
//                                         {buses.map((buss) => (
//                                             <option key={buss.id_bus} value={buss.nomor_bus} > 
//                                                 {buss.nomor_bus}
//                                             </option>
//                                         ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-black">
//                                     Nama Halte
//                                 </label>
//                                 <select className="select select-bordered w-full" onChange={handleChange} name="nama_halte">
//                                     {
//                                         halte.map((h) => (
//                                             <option key={h.id_halte} value={h.nama_halte} >
//                                                 {h.nama_halte}
//                                             </option>
//                                         ))
//                                     }

//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="text-sm text-black">
//                                     Waktu Berangkat
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     required
//                                     name="waktu_berangkat"
//                                     type="time"
//                                     className="input w-full bg-gray-100"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="text-sm text-black">
//                                     Waktu Tiba
//                                 </label>
//                                 <input
//                                     onChange={handleChange}
//                                     required
//                                     name="waktu_tiba"
//                                     type="time"
//                                     className="input w-full bg-gray-100"
//                                 />
//                             </div>
//                             <div className="flex justify-center pt-4">
//                                 <button className="btn bg-orange-500 w-4/5 text-white">
//                                     Submit
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </dialog>
//     )
// }