import './App.css';
import {Routes, Route} from "react-router-dom";
import React from "react";

import Index from "./views/Index";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Index/>}></Route>
            </Routes>
        </div>
    )
}

export default App;