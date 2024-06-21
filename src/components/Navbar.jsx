import React, { useState } from "react";
import SideBar from "./SideBar";
import "../style/navbar.css";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isMainContentOpen, setIsMainContentOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMainContentOpen(!isMainContentOpen)
  };
  return (
    <div className="content">
      <nav className={`navbar ${isMainContentOpen ? '' : 'close'}`}>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        <form action="#">
          <div className="formInput formActive">
            <input className="" type="search" placeholder="Search..." />
            <button className="search-btn" type="submit">
              <i className="bx bx-search"></i>
            </button>
          </div>
        </form>
        <input type="checkbox" id="theme_toggle" hidden />
        <label htmlFor="theme_toggle" className="theme_toggle"></label>
        <a href="#" className="notification">
          <i className="bx bx-bell"></i>
          <span className="count">12</span>
        </a>
        <a href="#" className="profile">
          <img
            src="https://cdn.logo.com/hotlink-ok/logo-social.png"
            alt="logo"
          />
        </a>
      </nav>
      <SideBar isOpen={isSidebarOpen} />
    </div>
  );
}

export default Navbar;
