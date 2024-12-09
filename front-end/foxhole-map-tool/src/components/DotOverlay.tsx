import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import L from "leaflet";

interface Dot {
  lat: number;
  lng: number;
  color: string;
}

interface DotOverlayProps {
  bounds: [[number, number], [number, number]]; // Specify bounds as an array of two [lat, lng] points
  pixelsPerMeter: number;
}

const DotOverlay: React.FC<DotOverlayProps> = ({ bounds, pixelsPerMeter }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [distance, setDistance] = useState<number | null>(null);

  // Convert bounds to LatLngBounds
  const boundsLatLng = L.latLngBounds(bounds);

  useMapEvents({
    click: (e) => {
      // Restrict clicks to within the bounds of the image
      if (!boundsLatLng.contains(e.latlng)) {
        return;
      }

      // Allow only two dots
      if (dots.length < 2) {
        const newDot: Dot = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          color: dots.length === 0 ? "black" : "orange",
        };

        const newDots = [...dots, newDot];
        setDots(newDots);

        // Calculate distance if two dots are placed
        if (newDots.length === 2) {
          const [dot1, dot2] = newDots;
          const dx = dot2.lng - dot1.lng;
          const dy = dot2.lat - dot1.lat;
          const distanceInPixels = Math.sqrt(dx * dx + dy * dy);
          const distanceInMeters = distanceInPixels / pixelsPerMeter;
          setDistance(distanceInMeters);
        }
      }
    },
  });

  return (
    <>
      {/* Render dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${dot.lat}px`, // Position based on lat/lng
            left: `${dot.lng}px`,
            backgroundColor: dot.color,
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Render distance */}
      {distance !== null && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            backgroundColor: "white",
            padding: "5px 10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          Distance: {distance.toFixed(2)} meters
        </div>
      )}
    </>
  );
};

export default DotOverlay;