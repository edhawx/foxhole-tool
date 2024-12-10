import React from "react";
import HexMapSelector from "./components/HexMapSelector";

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
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <HexMapSelector />
            </div>

            {/* Footer Section */}
            <footer
                style={{
                    backgroundColor: "#222",
                    color: "#ccc",
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "12px",
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

export default App;
