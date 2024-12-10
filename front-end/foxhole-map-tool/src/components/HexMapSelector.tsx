import React, { useState } from "react";
import { MapContainer, ImageOverlay} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ResetViewButton from "./ResetViewButton";
import DotOverlay from "./DotOverlay";



// List of hexes
const hexRegions = [
    { name: "Acrithia", path: "/src/assets/images/hexes/MapAcrithiaHex.png" },
    { name: "Allods Bight", path: "/src/assets/images/hexes/MapAllodsBightHex.png" },
    { name: "Ash Fields", path: "/src/assets/images/hexes/MapAshFieldsHex.png" },
    { name: "Basin Sionnach", path: "/src/assets/images/hexes/MapBasinSionnachHex.png" },
    { name: "Callahans Passage", path: "/src/assets/images/hexes/MapCallahansPassageHex.png" },
    { name: "The Clahstra", path: "/src/assets/images/hexes/MapClahstraHexMap.png"},
    { name: "Clanshead Valley", path: "/src/assets/images/hexes/MapClansheadValleyHex.png"},
    { name: "Deadlands", path: "/src/assets/images/hexes/MapDeadlandsHex.png"},
    { name: "The Drowned Vale", path: "/src/assets/images/hexes/MapDrownedValeHex.png"},
    { name: "Endless Shore", path: "/src/assets/images/hexes/MapEndlessShoreHex.png"},
    { name: "Farranac Coast", path: "/src/assets/images/hexes/MapFarranacCoastHex.png"},
    { name: "Fishermans Row", path: "/src/assets/images/hexes/MapFishermansRowHex.png"},
    { name: "Godcrofts", path: "/src/assets/images/hexes/MapGodcroftsHex.png"},
    { name: "Great March", path: "/src/assets/images/hexes/MapGreatMarchHex.png"},
    { name: "The Heartlands", path: "/src/assets/images/hexes/MapHeartlandsHex.png"},
    { name: "Howl County", path: "/src/assets/images/hexes/MapHowlCountyHex.png"},
    { name: "Kalokai", path: "/src/assets/images/hexes/MapKalokaiHex.png"},
    { name: "Kings Cage", path: "/src/assets/images/hexes/MapKingsCageHex.png"},
    { name: "The Linn of Mercy", path: "/src/assets/images/hexes/MapLinnMercyHex.png"},
    { name: "Loch Mor", path: "/src/assets/images/hexes/MapLochMorHex.png"},
    { name: "Marban Hollow", path: "/src/assets/images/hexes/MapMarbanHollow.png"},
    { name: "The Moors", path: "/src/assets/images/hexes/MapMooringCountyHex.png"},
    { name: "Morgens Crossing", path: "/src/assets/images/hexes/MapMorgensCrossingHex.png"},
    { name: "Nevish Line", path: "/src/assets/images/hexes/MapNevishLineHex.png"},
    { name: "Oarbreaker Isles", path: "/src/assets/images/hexes/MapOarbreakerHex.png"},
    { name: "Origin", path: "/src/assets/images/hexes/MapOriginHex.png"},
    { name: "Reaching Trail", path: "/src/assets/images/hexes/MapReachingTrailHex.png"},
    { name: "Reavers Pass", path: "/src/assets/images/hexes/MapReaversPassHex.png"},
    { name: "Red River", path: "/src/assets/images/hexes/MapRedRiverHex.png"},
    { name: "Sableport", path: "/src/assets/images/hexes/MapSableportHex.png"},
    { name: "Shackled Chasm", path: "/src/assets/images/hexes/MapShackledChasmHex.png"},
    { name: "Speaking Woods", path: "/src/assets/images/hexes/MapSpeakingWoodsHex.png"},
    { name: "Stema Landing", path: "/src/assets/images/hexes/MapStemaLandingHex.png"},
    { name: "Stlican Shelf", path: "/src/assets/images/hexes/MapStlicanShelfHex.png"},
    { name: "Stonecradle", path: "/src/assets/images/hexes/MapStonecradleHex.png"},
    { name: "Tempest Island", path: "/src/assets/images/hexes/MapTempestIslandHex.png"},
    { name: "Terminus", path: "/src/assets/images/hexes/MapTerminusHex.png"},
    { name: "The Fingers", path: "/src/assets/images/hexes/MapTheFingersHex.png"},
    { name: "Umbral Wildwood", path: "/src/assets/images/hexes/MapUmbralWildwoodHex.png"},
    { name: "Viper Pit", path: "/src/assets/images/hexes/MapViperPitHex.png"},
    { name: "Weathered Expanse", path: "/src/assets/images/hexes/MapWeatheredExpanseHex.png"},
    { name: "Westgate", path: "/src/assets/images/hexes/MapWestgateHex.png"}
];

// Default bounds for image
const defaultBounds: [[number, number], [number, number]] = [
    [0,0],
    [888,1024],
];

//conversion
const pixelsPerMeter= 0.47;



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
                zoom={-1}
                maxZoom={3}
                style={{height: "100%", width: "100%"}}
                crs={L.CRS.Simple}
                >
                    <ImageOverlay
                    url={selectedHex}
                    bounds={defaultBounds}
                    />
                    <ResetViewButton bounds={defaultBounds} />
                    <DotOverlay bounds={defaultBounds} pixelsPerMeter={pixelsPerMeter}/>
                </MapContainer>
            </div>
            <footer
                style={{
                    backgroundColor: "#222",
                    color: "#ccc",
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "12px",
                    marginTop: "auto",
                }}
            >
                <p>
                    This tool is for the game <b>Foxhole</b> developed by{" "}
                    <b>
                        <a
                            href="https://www.siegecamp.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#ccc", textDecoration: "none" }}
                        >
                            Siege Camp
                        </a>
                    </b>
                    . All map images and assets are the property of{" "}
                    <b>Siege Camp</b>.
                </p>
            </footer>
        </div>
    );
};

export default HexMapSelector;