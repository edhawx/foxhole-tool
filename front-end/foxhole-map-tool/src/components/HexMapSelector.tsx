import React, { useState } from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResetViewButton from "./ResetViewButton";
import DotOverlay from "./DotOverlay";
import "../styles/HexMapSelector.css";

const hexRegions = [
    { name: "Acrithia", path: "/src/assets/images/hexes/MapAcrithiaHex.png" },
    { name: "Allods Bight", path: "/src/assets/images/hexes/MapAllodsBightHex.png" },
    { name: "Ash Fields", path: "/src/assets/images/hexes/MapAshFieldsHex.png" },
    { name: "Basin Sionnach", path: "/src/assets/images/hexes/MapBasinSionnachHex.png" },
    { name: "Callahans Passage", path: "/src/assets/images/hexes/MapCallahansPassageHex.png" },
    { name: "The Clahstra", path: "/src/assets/images/hexes/MapClahstraHexMap.png" },
    { name: "Clanshead Valley", path: "/src/assets/images/hexes/MapClansheadValleyHex.png" },
    { name: "Deadlands", path: "/src/assets/images/hexes/MapDeadlandsHex.png" },
    { name: "The Drowned Vale", path: "/src/assets/images/hexes/MapDrownedValeHex.png" },
    { name: "Endless Shore", path: "/src/assets/images/hexes/MapEndlessShoreHex.png" },
    { name: "Farranac Coast", path: "/src/assets/images/hexes/MapFarranacCoastHex.png" },
    { name: "Fishermans Row", path: "/src/assets/images/hexes/MapFishermansRowHex.png" },
    { name: "Godcrofts", path: "/src/assets/images/hexes/MapGodcroftsHex.png" },
    { name: "Great March", path: "/src/assets/images/hexes/MapGreatMarchHex.png" },
    { name: "The Heartlands", path: "/src/assets/images/hexes/MapHeartlandsHex.png" },
    { name: "Howl County", path: "/src/assets/images/hexes/MapHowlCountyHex.png" },
    { name: "Kalokai", path: "/src/assets/images/hexes/MapKalokaiHex.png" },
    { name: "Kings Cage", path: "/src/assets/images/hexes/MapKingsCageHex.png" },
    { name: "The Linn of Mercy", path: "/src/assets/images/hexes/MapLinnMercyHex.png" },
    { name: "Loch Mor", path: "/src/assets/images/hexes/MapLochMorHex.png" },
    { name: "Marban Hollow", path: "/src/assets/images/hexes/MapMarbanHollow.png" },
    { name: "The Moors", path: "/src/assets/images/hexes/MapMooringCountyHex.png" },
    { name: "Morgens Crossing", path: "/src/assets/images/hexes/MapMorgensCrossingHex.png" },
    { name: "Nevish Line", path: "/src/assets/images/hexes/MapNevishLineHex.png" },
    { name: "Oarbreaker Isles", path: "/src/assets/images/hexes/MapOarbreakerHex.png" },
    { name: "Origin", path: "/src/assets/images/hexes/MapOriginHex.png" },
    { name: "Reaching Trail", path: "/src/assets/images/hexes/MapReachingTrailHex.png" },
    { name: "Reavers Pass", path: "/src/assets/images/hexes/MapReaversPassHex.png" },
    { name: "Red River", path: "/src/assets/images/hexes/MapRedRiverHex.png" },
    { name: "Sableport", path: "/src/assets/images/hexes/MapSableportHex.png" },
    { name: "Shackled Chasm", path: "/src/assets/images/hexes/MapShackledChasmHex.png" },
    { name: "Speaking Woods", path: "/src/assets/images/hexes/MapSpeakingWoodsHex.png" },
    { name: "Stema Landing", path: "/src/assets/images/hexes/MapStemaLandingHex.png" },
    { name: "Stlican Shelf", path: "/src/assets/images/hexes/MapStlicanShelfHex.png" },
    { name: "Stonecradle", path: "/src/assets/images/hexes/MapStonecradleHex.png" },
    { name: "Tempest Island", path: "/src/assets/images/hexes/MapTempestIslandHex.png" },
    { name: "Terminus", path: "/src/assets/images/hexes/MapTerminusHex.png" },
    { name: "The Fingers", path: "/src/assets/images/hexes/MapTheFingersHex.png" },
    { name: "Umbral Wildwood", path: "/src/assets/images/hexes/MapUmbralWildwoodHex.png" },
    { name: "Viper Pit", path: "/src/assets/images/hexes/MapViperPitHex.png" },
    { name: "Weathered Expanse", path: "/src/assets/images/hexes/MapWeatheredExpanseHex.png" },
    { name: "Westgate", path: "/src/assets/images/hexes/MapWestgateHex.png" },
];

const defaultBounds: [[number, number], [number, number]] = [
    [0, 0],
    [888, 1024],
];

const pixelsPerMeter = 0.47;

const HexMapSelector: React.FC = () => {
    const [selectedHex, setSelectedHex] = useState<string>(hexRegions[0].path);
    const [mapKey, setMapKey] = useState<number>(0);
    const [instructionsVisible, setInstructionsVisible] = useState<boolean>(false);

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHex(event.target.value);
        setMapKey((prevKey) => prevKey + 1);
    };

    const toggleInstructions = () => {
        setInstructionsVisible((prev) => !prev);
    };

    return (
        <div className="hex-map-container">
            <label htmlFor="hex-select">Select a Hex Region:</label>
            <select id="hex-select" onChange={handleSelectionChange}>
                {hexRegions.map((region) => (
                    <option key={region.name} value={region.path}>
                        {region.name}
                    </option>
                ))}
            </select>

            <div className="map-container">
                <MapContainer
                    key={mapKey}
                    bounds={defaultBounds}
                    zoom={-1}
                    maxZoom={3}
                    style={{ height: "100%", width: "100%" }}
                    crs={L.CRS.Simple}
                >
                    <ImageOverlay url={selectedHex} bounds={defaultBounds} />
                    <ResetViewButton bounds={defaultBounds} />
                    <DotOverlay bounds={defaultBounds} pixelsPerMeter={pixelsPerMeter} />
                </MapContainer>
            </div>

            {/* Instructions Box */}
            <div
                className={`instructions ${instructionsVisible ? "expanded" : "collapsed"}`}
                onClick={toggleInstructions}
                style={{
                    cursor: "pointer",
                    userSelect: "none",
                }}
            >
                <h2>Instructions</h2>
                {instructionsVisible && (
                    <div>
                        <p>• Hold <b>Ctrl + Left Click</b> to drag the map.</p>
                        <p>• Left click anywhere to place the first point (black).</p>
                        <p>• Left click again to place the second point (orange).</p>
                        <p>• Distance and azimuth will appear after two points are placed.</p>
                        <p>• Click "Clear Measurements" to reset the dots.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HexMapSelector;
