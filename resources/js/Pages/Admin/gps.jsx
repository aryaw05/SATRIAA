import React, { useEffect, useRef, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../data/firebaseConfig"; // sesuaikan path sesuai file kamu

const GpsRealtime = ({ idBus = "1" }) => {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  const updateLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation tidak didukung");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          await set(ref(db, `buses/${idBus}`), {
            lat,
            lng,
            updatedAt: new Date().toISOString(), // opsional untuk timestamp
          });
          console.log(`Lokasi Bus ${idBus} terkirim:`, lat, lng);
        } catch (error) {
          console.error("Gagal kirim lokasi:", error);
        }
      },
      (error) => {
        console.error("Gagal dapatkan lokasi:", error);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (isActive) {
      updateLocation(); // kirim lokasi sekali saat mulai
      intervalRef.current = setInterval(updateLocation, 3000); // update tiap 3 detik
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, idBus]); // perhatikan dependensi idBus supaya update jika idBus berubah

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">GPS Real-time Bus {idBus}</h2>
      <button
        onClick={() => setIsActive(!isActive)}
        className={`mt-4 px-4 py-2 rounded ${
          isActive ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {isActive ? "Stop GPS" : "Start GPS"}
      </button>
    </div>
  );
};

export default GpsRealtime;
