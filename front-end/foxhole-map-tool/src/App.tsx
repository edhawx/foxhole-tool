import React from 'react';
// import Map from './components/Map';
import HexMapSelector from './components/HexMapSelector';

const App: React.FC = () => {
    return (
        <div>
            <h1>Foxhole Map Tool</h1>
            <HexMapSelector />
        </div>
    );
};

export default App;