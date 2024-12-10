import React from 'react';
import HexMapSelector from './components/HexMapSelector';

const App: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100%",
            }}
        >
            {/* Header Section */}
            <header
                style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                }}
            >
                <h1 style={{ margin: 0 }}>Foxhole Map Tool</h1>
            </header>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center content horizontally
                    justifyContent: "center", // Center content vertically
                }}
            >
                {/* Left Section for Instructions */}
                <div
                    style={{
                        position: "absolute",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        textAlign: "left",
                        fontSize: "14px",
                        lineHeight: "1.5",
                        border: "1px solid lightgray",
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "black",
                    }}
                >
                    <h2>Instructions</h2>
                    <p>• Hold <b>Ctrl + Left Click</b> to drag the map.</p>
                    <p>• Left click anywhere to place the first point (black).</p>
                    <p>• Left click again to place the second point (orange).</p>
                    <p>• Distance and azimuth will appear after two points are placed.</p>
                    <p>• Click "Clear Measurements" to reset the dots.</p>
                </div>

                {/* Center Section for Map and Tools */}
                <HexMapSelector />
            </div>
        </div>
    );
};

export default App;
