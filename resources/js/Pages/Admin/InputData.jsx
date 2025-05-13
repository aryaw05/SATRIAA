import { Head } from '@inertiajs/react';


const DataSatria = () => {
  // Fungsi untuk menampilkan modal
  const showModal1 = () => {
    const modal = document.getElementById('my_modal_1');
    if (modal) modal.showModal();
  };

  const showModal2 = () => {
    const modal = document.getElementById('my_modal_2');
    if (modal) modal.showModal();
  };

  return (
    <>
      <Head>
        <title>Data SATRIA</title>
      </Head>

      <div className="min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-base-100 fixed top-0 w-full z-50">
          {/* Kiri */}
          <div className="flex-1">
            <ul className="menu menu-horizontal px-auto text-xl relative z-50">
              <li>
                <details className="dropdown">
                  <summary className="sm:text-3xl hover:bg-transparent focus:!bg-transparent focus:!text-inherit">
                    Jadwal SATRIA
                  </summary>
                  <ul className="menu dropdown rounded-t-none p-2">
                    <li>
                      <a className="whitespace-nowrap sm:text-lg active:!bg-transparent active:!text-inherit">
                        Jadwal SATRIA
                      </a>
                    </li>
                    <li>
                      <a className="whitespace-nowrap sm:text-lg active:!bg-transparent active:!text-inherit">
                        Data SATRIA
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          {/* Kanan */}
          <div className="flex-none pr-4 text-md sm:text-2xl flex flex-col items-end">
            <div className="font-bold">Admin Dishub</div>
            <div className="text-sm sm:text-base text-gray-500">Admin</div>
          </div>
        </div>

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
                      <th className="border">Nama Halte</th>
                      <th className="border">Waktu Berangkat</th>
                      <th className="border">Waktu Tiba</th>
                      <th className="border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border">SATRIA</td>
                      <td className="border">Halte Sukorame</td>
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
                      <th className="border">Driver</th>
                      <th className="border">Plat Nomor</th>
                      <th className="border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border">SATRIA</td>
                      <td className="border">Yazid</td>
                      <td className="border">AG 2390 ER</td>
                      <td className="border"></td>
                    </tr>
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

            <h1 className="text-2xl font-semibold text-center pt-5 mb-4">Tambah Jadwal Bus</h1>
            <form className="space-y-4 px-2 py-4">
              <div>
                <label className="text-sm text-black">Nama Bus</label>
                <input type="text" className="input w-full bg-gray-100" placeholder="Masukkan Nama Bus" />
              </div>
              <div>
                <label className="text-sm text-black">Nama Halte</label>
                <select className="select select-bordered w-full">
                  <option>Halte Sukorame</option>
                  <option>Halte Penanggungan</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-black">Waktu Berangkat</label>
                <input type="time" className="input w-full bg-gray-100" />
              </div>
              <div>
                <label className="text-sm text-black">Waktu Tiba</label>
                <input type="time" className="input w-full bg-gray-100" />
              </div>
              <div className="flex justify-center pt-4">
                <button className="btn bg-orange-500 w-4/5 text-white">Submit</button>
              </div>
            </form>
          </div>
        </dialog>

        {/* Modal Tambah Data */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box rounded-3xl w-[95%] max-w-md">
            <form method="dialog">
              <button className="btn btn-lg btn-circle absolute border-transparent right-4 top-4 bg-transparent hover:bg-transparent !hover:text-black">
                ✕
              </button>
            </form>

            <h1 className="text-2xl font-semibold text-center pt-5 mb-4">Tambah Data Bus</h1>
            <form className="space-y-4 px-2 py-4">
              <div>
                <label className="text-sm text-black">Nama Bus</label>
                <select className="select select-bordered w-full">
                  <option>SATRIA 1</option>
                  <option>SATRIA 2</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-black">Nama Driver</label>
                <input type="text" className="input w-full bg-gray-100" placeholder="Masukkan Nama Driver" />
              </div>
              <div>
                <label className="text-sm text-black">Plat Nomor</label>
                <input type="text" className="input w-full bg-gray-100" placeholder="Masukkan Plat Nomor" />
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

export default DataSatria;