import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Content from "./components/MainContent.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuickCarPage from "./pages/QuickCarPage.jsx";
import FedetierraPage from "./pages/FedetierraPage.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <Content>
          <Navbar />
        </Content>
      </div>
    </Router>
  );
}

export default App;
