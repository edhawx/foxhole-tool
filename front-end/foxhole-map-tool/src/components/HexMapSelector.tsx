import React, { useState } from "react";
import { MapContainer, ImageOverlay} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResetViewButton from "./ResetViewButton";

// List of hexes
const hexRegions = [
    { name: "Acrithia", path: "/src/assets/images/hexes/MapAcrithiaHex.png" },
    { name: "Deadlands", path: "/src/assets/images/hexes/MapDeadlandsHex.png"},
    { name: "Endless Shore", path: "/src/assets/images/hexes/MapEndlessShoreHex.png"}
];

// Default bounds for image
const defaultBounds: L.LatLngBoundsExpression = [
    [0,0],
    [888,1024],
];



const HexMapSelector: React.FC = () => {
    const [selectedHex, setSelectedHex] = useState<string>(hexRegions[0].path);
    const [mapKey, setMapKey] = useState<number>(0);

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHex(event.target.value);
        setMapKey((prevKey) => prevKey +  1);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <label htmlFor="hex-select" style={{ fontSize: "1.2em" }}>
                Select a Hex Region:
            </label>
            <select
            id="hex-select"
            onChange={handleSelectionChange}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "1em" }}
            >
                {hexRegions.map((region)=>(
                    <option key={region.name} value={region.path}>
                        {region.name}
                    </option>
                ))}
            </select>
            <div style={{ marginTop: "20px", height: "888px", width: "1024px", margin: "0 auto" }}>
                <MapContainer
                key={mapKey}
                bounds={defaultBounds}
                // center={[500, 500]}
                zoom={-1}
                // minZoom={1}
                maxZoom={3}
                style={{height: "100%", width: "100%"}}
                crs={L.CRS.Simple}
                >
                    <ImageOverlay
                    url={selectedHex}
                    bounds={defaultBounds}
                    />
                    <ResetViewButton bounds={defaultBounds} />
                </MapContainer>
            </div>
        </div>
    );
};

export default HexMapSelector;