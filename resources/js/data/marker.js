const customIcon = L.Icon.extend({
    options: {
        iconSize: [38, 38],
        iconAnchor: [22, 38],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
    },
});

const halteIcon = new customIcon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1042/1042314.png",
});

const busIcon = new customIcon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8/8110.png",
});

const userIcon = new customIcon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8/8110.png",
});
export { halteIcon, busIcon, userIcon };
