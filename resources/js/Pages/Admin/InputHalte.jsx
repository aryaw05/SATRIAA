import { Head } from '@inertiajs/react';


const HalteSatria = () => {
  return (
    <>
      <Head>
        <title>Halte SATRIA</title>
      </Head>

      <div className="bg-white min-h-screen items-center justify-center">
        {/* Navbar */}
        <div className="navbar bg-base-100 fixed top-0 w-full z-50">
          {/* Left Side */}
          <div className="flex-1">
            <ul className="menu menu-horizontal px-auto text-xl relative z-50">
              <li>
                <details className="dropdown">
                  <summary className="sm:text-3xl hover:bg-transparent focus:!bg-transparent focus:!text-inherit">
                    Jadwal SATRIA
                  </summary>
                  <ul className="menu dropdown rounded-t-none p-2">
                    <li>
                      <a className="whitespace-nowrap sm:tehttps://unpkg.com/react@17/umd/react.development.js
https://unpkg.com/react-dom@17/umd/react-dom.development.js
https://unpkg.com/babel-standalone@6/babel.min.js
xt-lg active:!bg-transparent active:!text-inherit">
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

          {/* Right Side */}
          <div className="flex-none pr-4 text-md sm:text-2xl flex flex-col items-end">
            <div className="font-bold">Admin Dishub</div>
            <div className="text-sm sm:text-base text-gray-500">Admin</div>
          </div>
        </div>

        {/* Grid Layout for Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 sm:h-screen pt-17 sm:pl-2">
          {/* Main Content (empty for desktop) */}
          <div className="bg-gray-400 sm:rounded-3xl sm:m-6 sm:block w-full h-screen sm:h-[92%] sm:w-[132%] overflow-hidden">
            {/* Place for real-time map */}
            <div className="h-full w-full text-gray-500 z-0"></div>
          </div>

          {/* Input Form at the bottom */}
          <div className="fixed bottom-0 w-full bg-white pb-3 pt-4 sm:relative sm:w-4/6 sm:ml-auto sm:h-full sm:flex sm:flex-col sm:justify-start sm:items-end">
            {/* Bus Stop Information */}
            <div className="flex w-fit mx-auto rounded-3xl overflow-hidden bg-[#f1c65d] mb-1 order-1 sm:order-2 sm:py-auto sm:mt-5 sm:w-[85%]">
              {/* Bus Stop Icon */}
              <div className="bg-orange-500 flex items-center justify-center px-5 py-4 rounded-3xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white size-[60px]"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                >
                  <path d="M 9 4 C 6.800781 4 5 5.800781 5 8 L 5 13 L 3 13 L 3 16 L 5 16 L 5 27 C 5 27.550781 5.449219 28 6 28 L 9 28 L 9.34375 27 L 22.65625 27 L 23 28 L 26 28 C 26.550781 28 27 27.550781 27 27 L 27 16 L 29 16 L 29 13 L 27 13 L 27 8 C 27 5.800781 25.199219 4 23 4 Z M 9 6 L 23 6 C 24.117188 6 25 6.882813 25 8 L 7 8 C 7 6.882813 7.882813 6 9 6 Z M 7 10 L 15 10 L 15 17 L 7 17 Z M 17 10 L 25 10 L 25 17 L 17 17 Z M 7 19 L 25 19 L 25 25 L 7 25 Z M 8 21 L 8 23 L 12 23 L 12 21 Z M 20 21 L 20 23 L 24 23 L 24 21 Z" />
                </svg>
              </div>

              {/* Bus Stop Details */}
              <div className="px-5 py-4 space-y-1">
                <div className="sm:text-xl text-center font-bold">Halte Sukorame</div>
                <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium">
                  <span>Latitude</span>
                  <span>:</span>
                  <span className="text-black font-bold">238234234</span>
                </div>
                <div className="grid grid-cols-[90px_10px_1fr] text-sm font-medium">
                  <span>Longitude</span>
                  <span>:</span>
                  <span className="text-black font-bold">238234234</span>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="w-full max-w-md mx-auto px-6 py-3 grid grid-cols-1 gap-2 order-2 sm:order-1 sm:px-12 sm:pt-10">
              <div>
                <p className="text-lg font-semibold text-black">Nama Halte</p>
                <input
                  type="text"
                  className="input rounded-lg bg-gray-100 w-full"
                  placeholder="Masukkan nama"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-black">Latitude</p>
                <input
                  type="text"
                  className="input rounded-lg bg-gray-100 w-full"
                  placeholder="Masukkan latitude"
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-black">Longitude</p>
                <input
                  type="text"
                  className="input rounded-lg bg-gray-100 w-full"
                  placeholder="Masukkan longitude"
                />
              </div>
              <div className="flex justify-center mt-3">
                <button className="btn rounded-lg bg-orange-500 w-3/4">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HalteSatria;