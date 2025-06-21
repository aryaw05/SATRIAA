import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import useActionForm from "../../hooks/useActionForm";
import { handleSubmit } from "../../utils/handleCRUD";
import GpsRealtime from "./gps"; // pastikan path sudah benar

const DashboardKernet = (props) => {
  const { buses } = props;
  const { formData, handleChange } = useActionForm({
    password: "",
  });

  const [activeBus, setActiveBus] = useState(null);

  function logoutButton() {
    router.post("/logout");
  }

  // Fungsi dipanggil setelah login bus berhasil
  const handleBusLogin = (id_bus) => {
    setActiveBus(id_bus.toString());
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 w-full z-50">
        <div className="flex-1">
          <h1 className="text-2xl font-bold p-4">Dashboard Kernet</h1>
        </div>
        <div className="flex-none pr-4 text-md sm:text-2xl flex flex-col items-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <FontAwesomeIcon
                icon="fa-solid fa-circle-user"
                className="text-5xl cursor-pointer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <button onClick={logoutButton} className="text-lg text-red-500">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="px-5 pt-8">
        {buses?.map((e) => (
          <div
            key={e.id_bus}
            onClick={() =>
              document.getElementById(`my_modal_${e.id_bus}`).showModal()
            }
          >
            <div className="flex items-center justify-between pb-2 mb-3">
              <h1 className="text-4xl font-bold">Satria {e.id_bus}</h1>
              <div className="indicator">
                <span className="indicator-item badge badge-warning me-2">
                  {e.id_bus}
                </span>
                <FontAwesomeIcon
                  icon={"fa-solid fa-bus"}
                  className="text-7xl text-orange-500"
                />
              </div>
            </div>
            <div className="h-px bg-black w-full mb-5"></div>

            <dialog id={`my_modal_${e.id_bus}`} className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">
                  Masukkan Password Satria {e.id_bus}
                </h3>

                <form
                  onSubmit={async (ev) => {
                    ev.preventDefault();
                    // Kirim data login bus
                    const success = await handleSubmit(ev, "/logBus", {
                      ...formData,
                      id_bus: e.id_bus,
                    });

                    if (success) {
                      handleBusLogin(e.id_bus); // set bus aktif
                      document.getElementById(`my_modal_${e.id_bus}`).close();
                    }
                  }}
                >
                  <div className="flex flex-col justify-center px-9 min-h-60 gap-8">
                    <input
                      className="input input-bordered w-full"
                      type="password"
                      name="password"
                      placeholder="********"
                      onChange={handleChange}
                    />
                    <button
                      className="btn bg-orange-primary hover:opacity-80"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        ))}
      </div>

      {/* Render GPS Real-time jika bus sudah login */}
      {activeBus && <GpsRealtime idBus={activeBus} />}
    </div>
  );
};

export default DashboardKernet; 
