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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#333333", // Dark gray background for the whole page
            }}
        >
            <MapContainer
                center={[0, 0]} // Initial center of the map
                zoom={2} // Initial zoom level
                style={{
                    height: "90vh",
                    width: "90%", // Adjust as needed for screen coverage
                    backgroundColor: "#333333", // Dark background for the map
                }}
                className="custom-map-container"
            >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />
                <HandleClick />
            </MapContainer>
        </div>
    );
};

export default Map;
