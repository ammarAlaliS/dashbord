import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import "./style/navbar.css";
import SideBar from "./components/SideBar.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMainContentOpen, setIsMainContentOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMainContentOpen(!isMainContentOpen);
  };
  return (
    <div className="app">
      <div className={`content ${isSidebarOpen ? "" : "close"}`}>
      <SideBar isOpen={isSidebarOpen} />
        <Navbar
          isMainContentOpen={isMainContentOpen}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <main class="mainContent">
        
        
        </main>
      
      </div>
    </div>
  );
}

export default App;
