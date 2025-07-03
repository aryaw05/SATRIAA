import { Head } from "@inertiajs/react";
import Navbar from "../Navbar";
import JadwalBus from "../JadwalBus";
import InputBus from "../InputBus";

const DashboardLayout = (props) => {
    const { buses, jadwal, halte } = props;

    return (
        <>
            <Head>
                <title>Dashboard</title>
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

export default DashboardLayout;
