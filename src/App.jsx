


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import ImageGenerator from "./components/ImageGenerator/ImageGenerator";

const App = () => {
  return (
    <Router>
      {/* 🔧 Flex container for sidebar + page content */}
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
        <Sidebar />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
