import { Head } from "@inertiajs/react";
import Navbar from "./Navbar";
import useActionForm from "../../hooks/useActionForm";
import { handleDelete, handleEdit, handleSubmit } from "../../utils/handleCRUD";
import { useEffect, useState } from "react";
import JadwalBus from "./JadwalBus";
import InputBus from "./InputBus";

const DataSatria = (props) => {
    const { buses, jadwal, halte, errors } = props;

    const [dataBus, setDataBus] = useState({
        idJadwal: null,
        idBus: null,
        indexBus: null,
        component: null,
    });

    const { formData, handleChange, setFormData } = useActionForm();

    useEffect(() => {
        if (dataBus?.indexBus !== null) {
            if (dataBus.component === "data_bus") {
                const bus = buses[dataBus.indexBus];
                setFormData({
                    nomor_bus: bus.nomor_bus || "",
                    plat_nomor: bus.plat_nomor || "",
                    jenis_bus: bus.jenis_bus || "",
                    password: "",
                });
            } else if (dataBus.component === "jadwal_bus") {
                const jadwalBus = jadwal[dataBus.indexBus];
                console.log("jadwal bus", jadwalBus);
                setFormData({
                    id_bus: jadwalBus.id_bus || "",
                    id_halte: jadwalBus.id_halte || "",
                    waktu_berangkat: jadwalBus.waktu_berangkat || "",
                    waktu_tiba: jadwalBus.waktu_tiba || "",
                });
            }
        }
    }, [dataBus, buses]);
    // Fungsi untuk menampilkan modal

    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        setFormData({});
    };
    const showModalEdit = (index, modalId, component) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
        setDataBus({
            idJadwal: jadwal[index].id_jadwal,
            idBus: jadwal[index].id_bus,
            indexBus: index,
            component,
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
                        <JadwalBus
                            jadwal={jadwal}
                            buses={buses}
                            halte={halte}
                        />

                        {/* Bagian kanan - Data Bus */}
                        <InputBus buses={buses} jadwal={jadwal} halte={halte} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataSatria;
