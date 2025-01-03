import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface ResetViewButtonProps {
    bounds: L.LatLngBoundsExpression;
}

const ResetViewButton: React.FC<ResetViewButtonProps> = ({bounds}) =>{
    const map = useMap();

    const resetView = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        map.fitBounds(bounds, {padding: [50,50]});
    };

    return (
        <button
        onClick={resetView}
        style={{
            position: "absolute",
        zIndex: 1000, // Ensure the button stays above everything
        top: "10px",
        right: "10px",
        padding: "10px",
        background: "black",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        pointerEvents:"auto",
        }}
        >
            Reset View
        </button>
    );
};

export default ResetViewButton;