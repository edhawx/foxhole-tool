import React, { useState, useEffect } from "react";
import { useMapEvents, Marker } from "react-leaflet";
import L from "leaflet";

interface Dot {
  lat: number;
  lng: number;
  color: string;
}

interface DotOverlayProps {
  bounds: [[number, number], [number, number]]; // Specify bounds as an array of two points
  pixelsPerMeter: number;
}

const DotOverlay: React.FC<DotOverlayProps> = ({ bounds, pixelsPerMeter }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [azimuth, setAzimuth] = useState<number | null>(null);

  // Convert bounds to LatLngBounds
  const boundsLatLng = L.latLngBounds(bounds);

  const calculateAzimuth = (dot1: Dot, dot2: Dot): number => {
    const dy = dot2.lat - dot1.lat;
    const dx = dot2.lng - dot1.lng;
    const angle = Math.atan2(dx, dy) * (180 / Math.PI); // Convert from radians to degrees
    return (angle + 360) % 360; // Normalize to 0–360 degrees
  };

  const map = useMapEvents({
    click: (e) => {
      // Prevent placing dots while dragging
      if (map.dragging.enabled()) return;

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

        // Calculate distance and azimuth if two dots are placed
        if (newDots.length === 2) {
          const [dot1, dot2] = newDots;
          const dx = dot2.lng - dot1.lng;
          const dy = dot2.lat - dot1.lat;
          const distanceInPixels = Math.sqrt(dx * dx + dy * dy);
          const distanceInMeters = distanceInPixels / pixelsPerMeter;
          setDistance(distanceInMeters);

          const azimuthValue = calculateAzimuth(dot1, dot2);
          setAzimuth(azimuthValue);
        }
      }
    },
    mousemove: (e) => {
      // Enable dragging when Ctrl is held
      if (e.originalEvent.ctrlKey) {
        if (!map.dragging.enabled()) {
          map.dragging.enable();
        }
      } else {
        if (map.dragging.enabled()) {
          map.dragging.disable();
        }
      }
    },
  });

  useEffect(() => {
    // Disable map dragging by default
    map.dragging.disable();
  }, [map]);

  const clearDots = () => {
    setDots([]); // Clear the dots
    setDistance(null); // Reset the distance
    setAzimuth(null); // Reset the azimuth
  };

  return (
    <>
      {dots.map((dot, index) => (
        <Marker
          key={index}
          position={[dot.lat, dot.lng]}
          icon={L.divIcon({
            className: "",
            html: `<div style="background: ${dot.color}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
            iconSize: [10, 10],
          })}
        />
      ))}
      {distance !== null && azimuth !== null && (
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
          <p>Distance: {distance.toFixed(2)} meters</p>
          <p>Azimuth: {azimuth.toFixed(2)}°</p>
        </div>
      )}
      {/* Clear Measurements Button */}
      <button
        onClick={clearDots}
        style={{
          position: "absolute",
          top: "10px", // Top of the map screen
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center align the button
          backgroundColor: "#f44336",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Clear Measurements
      </button>
    </>
  );
};

export default DotOverlay;