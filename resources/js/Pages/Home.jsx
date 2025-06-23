import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import { db, ref, onValue } from "../data/firebaseConfig";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";

export default function Home(props) {

    const { halte , buses , jadwal  } = props;
    
    const mapProviderRef = useRef(null);

    const [jumlahBus, setJumlahBus] = useState([]);

    // Ambil lokasi dari Firebase
    useEffect(() => {
        const busRef = ref(db, "buses"); 
        onValue(busRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const buses = Object.entries(data).map(([id, val]) => ({
                    id: parseInt(id),
                    lat: val.lat,
                    lng: val.lng,
                }));
                setJumlahBus(buses);
            }
        });
    }, []);
    const Location = () => {
        if (mapProviderRef.current) {
            mapProviderRef.current.userLocationHandle();            
        }
        
    };
    const busSearch =  (busId) => {
        if (mapProviderRef.current) {
        mapProviderRef.current.busSearchHandle(busId);               
        }

        
    };

    return (
        <div>
            <MapProvider halte={halte} isAdmin={false} ref={mapProviderRef}  bus ={jumlahBus}/>
            <MenuBar
                totalBus={jumlahBus}
                totalJadwal={jadwal}
                onClickBus={busSearch}
                onClickUser={Location}
                detailBus={buses}
            />
        </div>
    );
}
