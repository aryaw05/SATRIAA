import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import MenuBar from "../components/menu-bar/Menu-bar";
import MapProvider from "../data/MapProvider";

export default function Home(props) {

    const { halte , buses } = props;
    
    const mapProviderRef = useRef(null);

    let jumlahBus = [
        {
            id: 1,
            lat: -7.8238,
            lng: 112.0209,
        },
        {
            id: 2,
            lat: -7.8165,
            lng: 112.0173,
        },
        {
            id: 3,
            lat: -7.8302,
            lng: 112.0256,
        },
    ];

    const Location = () => {
        if (mapProviderRef.current) {
            mapProviderRef.current.userLocationHandle();
        }
    };
    const busSearch = (busId) => {
        if (mapProviderRef.current) {
            mapProviderRef.current.busSearchHandle(busId);
        }
    };

    return (
        <div className=" ">
            <MapProvider halte={halte} isAdmin={false} ref={mapProviderRef} />
            <MenuBar
                totalBus={buses}
                onClickBus={busSearch}
                onClickUser={Location}
            />
        </div>
    );
}
