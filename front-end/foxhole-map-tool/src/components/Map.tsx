import React from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
    const HandleClick = () => {
        useMapEvents({
            click: (e) => {
                console.log(`Clicked at: Latitude ${e.latlng.lat}, Longitude ${e.latlng.lng}`);
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={[0, 0]} // Initial center of the map
            zoom={2} // Initial zoom level
            style={{ height: "90vh", width: "100%" }}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />
            <HandleClick />
        </MapContainer>
    );
};

export default Map;