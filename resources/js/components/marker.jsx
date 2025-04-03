// export function HalteMarker(Data) {
//     return L.divIcon({
//         className: "my-div-icon",
//         html:
//             `<img src="icon/Halte.svg" class = "w-9 h-9"/>` +
//             `<span class="my-div-span font-semibold">${Data}</span>`,
//         iconAnchor: [17, 35],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3, -76],
//     });
// }

// export function UserMarker(Data) {
//     return L.divIcon({
//         className: "my-div-icon",
//         html:
//             `<img src="icon/User.svg" class = "w-9 h-9"/>` +
//             `<span class="my-div-span font-semibold">${Data}</span>`,
//         iconAnchor: [17, 35],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3, -76],
//     });
// }

// export function BusMarker(Data) {
//     return L.divIcon({
//         className: "my-div-icon",
//         html:
//             `<img src="icon/Halte.svg" class = "w-9 h-9"/>` +
//             `<span class="my-div-span font-semibold">${Data}</span>`,
//         iconAnchor: [17, 35],
//         shadowAnchor: [4, 62],
//         popupAnchor: [-3, -76],
//     });
// }

export default function createCustomIcon(iconType, label) {
    const iconConfig = {
        halte: {
            iconUrl: "icon/Halte.svg",
            className: "halte-icon",
        },
        user: {
            iconUrl: "icon/User.svg",
            className: "user-icon",
        },
        bus: {
            iconUrl: "icon/Bus.svg",
            className: "bus-icon",
        },
    };

    const config = iconConfig[iconType] || iconConfig.halte; // Fallback ke halte jika type tidak ada

    return L.divIcon({
        className: `my-div-icon ${config.className}`,
        html: `
            <img src="${config.iconUrl}" class="w-9 h-9"/>
            <span class="my-div-span font-semibold">${label}</span>
        `,
        iconAnchor: [17, 35],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
    });
}
