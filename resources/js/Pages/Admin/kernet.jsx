import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashboardKernet = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="navbar bg-base-100 w-full z-50">
        {/* Kiri */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold p-4">Dashboard Kernet</h1>
        </div>

        {/* Kanan */}
        <div className="flex-none pr-4 text-md sm:text-2xl flex flex-col items-end">
          <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button">
                        <FontAwesomeIcon
                            icon="fa-solid fa-circle-user "
                            className="text-5xl cursor-pointer"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm "
                    >
                        <li>
                            <a className="text-lg text-red-500">Log Out</a>
                        </li>
                    </ul>
                </div>
        </div>
      </div>

      {/* Konten */}
      <div className="px-5 pt-8">
        {/* SATRIA 1 + Ikon Bus */}
        <div className="flex items-center justify-between pb-2 mb-3">
            <h1 className="text-4xl font-bold">SATRIA 1</h1>
            <div className="indicator">
                <span className="indicator-item badge badge-warning me-2">1</span>
                <FontAwesomeIcon icon={"fa-solid fa-bus"} className="text-7xl text-orange-500" />
            </div>
        </div>
        <div className="h-px bg-black w-full mb-5"></div>

        {/* SATRIA 2 + Ikon Bus */}
        <div className="flex items-center justify-between pb-2 mb-3">
            <h1 className="text-4xl font-bold">SATRIA 2</h1>
            <div className="indicator">
                <span className="indicator-item badge badge-warning mr-2">2</span>
                <FontAwesomeIcon icon={"fa-solid fa-bus"} className="text-7xl text-orange-500" />
            </div>
        </div>
        <div className="h-px bg-black w-full mb-5"></div>

        {/* SATRIA 3 + Ikon Bus */}
        <div className="flex items-center justify-between pb-2 mb-3">
            <h1 className="text-4xl font-bold">SATRIA 3</h1>
            <div className="indicator">
                <span className="indicator-item badge badge-warning mr-2">3</span>
                <FontAwesomeIcon icon={"fa-solid fa-bus"} className="text-7xl text-orange-500" />
            </div>
        </div>
        <div className="h-px bg-black w-full mb-5"></div>
      </div>
    </div>
  );
};

export default DashboardKernet;
