import { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import createCustomIcon from "../../components/marker";
export default function HalteList(props) {
    const { halte } = props;

    const [formData, setFormData] = useState({
        nama_halte: "",
        lokasi_lat: "",
        lokasi_long: "",
    });
    const mapRef = useRef(null);
    function clickZoom(e) {
        mapRef.current.setView(e.target.getLatLng(), 25);
    }
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
    // halte
    useEffect(() => {
        // terminal
        halte.map((data) => {
            L.marker([data.lokasi_lat, data.lokasi_long], {
                icon: createCustomIcon("halte", data.nama_halte),
                alt: "halte",
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
        // <div className="p-4">
        //     <h2 className="text-lg font-semibold mb-4">Tambah Data Halte</h2>
        //     <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        //         <div>
        //             <label>Nama Halte:</label>
        //             <input
        //                 type="text"
        //                 name="nama_halte"
        //                 value={formData.nama_halte}
        //                 onChange={handleChange}
        //                 className="border px-2 py-1 w-full"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Latitude:</label>
        //             <input
        //                 type="number"
        //                 step="any"
        //                 name="lokasi_lat"
        //                 value={formData.lokasi_lat}
        //                 onChange={handleChange}
        //                 className="border px-2 py-1 w-full"
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label>Longitude:</label>
        //             <input
        //                 type="number"
        //                 step="any"
        //                 name="lokasi_long"
        //                 value={formData.lokasi_long}
        //                 onChange={handleChange}
        //                 className="border px-2 py-1 w-full"
        //                 required
        //             />
        //         </div>
        //         <button
        //             type="submit"
        //             className="bg-blue-500 text-white px-4 py-2 rounded"
        //         >
        //             Tambah Halte
        //         </button>
        //     </form>

        //     <h2 className="text-lg font-semibold mb-2">Daftar Halte</h2>
        //     <table
        //         border="1"
        //         cellPadding="8"
        //         cellSpacing="0"
        //         className="w-full text-left"
        //     >
        //         <thead className="bg-gray-200">
        //             <tr>
        //                 <th>ID Halte</th>
        //                 <th>Nama Halte</th>
        //                 <th>Latitude</th>
        //                 <th>Longitude</th>
        //                 <th>Dibuat Pada</th>
        //                 <th>Action</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {halte.map((halte) => (
        //                 <tr key={halte.id_halte}>
        //                     <td>{halte.id_halte}</td>
        //                     <td>{halte.nama_halte}</td>
        //                     <td>{halte.lokasi_lat}</td>
        //                     <td>{halte.lokasi_long}</td>
        //                     <td>{halte.created_at}</td>
        //                     <td>
        //                         <div className="flex gap-2">
        //                             <button
        //                                 className="btn btn-warning btn-sm"
        //                                 data-bs-toggle="modal"
        //                                 data-bs-target="#editModal{{ $h->id_halte }}"
        //                                 onClick={() =>
        //                                     handleEdit(halte.id_halte)
        //                                 }
        //                                 type="button"
        //                             >
        //                                 Edit
        //                             </button>
        //                             <button
        //                                 type="button"
        //                                 onClick={() =>
        //                                     handleDelete(halte.id_halte)
        //                                 }
        //                                 className="btn btn-danger btn-sm"
        //                                 data-bs-toggle="modal"
        //                                 data-bs-target="#deleteModal{{ $h->id_halte }}"
        //                             >
        //                                 Delete
        //                             </button>
        //                         </div>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div className="absolute z-10  right-0">
                <div className="flex justify-end">
                    <button
                        className="btn bg-orange-primary  "
                        onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                        }
                    >
                        Tambah Halte
                    </button>
                </div>

                <div className="card bg-neutral text-neutral-content w-96">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Cookies!</h2>
                        <p>We are using cookies for no reason.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Accept</button>
                            <button className="btn btn-ghost">Deny</button>
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3  z-10  p-5 rounded-xl"
                    >
                        <div>
                            <label>Nama Halte:</label>
                            <input
                                type="text"
                                name="nama_halte"
                                value={formData.nama_halte}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>Latitude:</label>
                            <input
                                type="number"
                                step="any"
                                name="lokasi_lat"
                                value={formData.lokasi_lat}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label>Longitude:</label>
                            <input
                                type="number"
                                step="any"
                                name="lokasi_long"
                                value={formData.lokasi_long}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Tambah Halte
                        </button>
                    </form>
                </div>
            </dialog>

            <div id="map" className="w-full h-screen z-1"></div>
        </div>
    );
}
