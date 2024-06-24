import React from "react";
import { Link } from "react-router-dom";
import Links from "./singleComponents/Links";

function SideBar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "" : "close"}`} id="sidebar">
      <Link to="/" className="logo">
        <i className="bx bx-code"></i>
        <div className="logoName">Panel</div>
      </Link>
      <ul className="sideMenu">
        <Links to="/principal" name="Home" iconName="bx bx-home" />
        <Links to="/quickcar" name="Quickar" iconName="bx bx-car" />  
        <Links to="/fedetierra" name="Fedetierra" iconName="bx bx-leaf" />
        <Links to="/shopsgrup" name="Shopsgrup" iconName="bx bx-shopping-bag" />
        <Links to="/tucampillo" name="Tu campillo" iconName="bx bx-lemon" />
        <Links to="/teamtouch" name="Teamtouch" iconName="bx bx-calendar-heart" />
        <Links to="/conpicoypala" name="Conpicoypala" iconName="bx bx-hard-hat" />
        <Links to="/obbaramarket" name="Obbaramarket" iconName="bx bx-store" />
        <Links to="/roulettpromociones" name="Roulettpromociones" iconName="bx bx-dice-1" />
      </ul>
      <ul className="sideMenu">
        <li>
          <a href="#" className="logout">
            <i className="bx bx-log-out-circle"></i> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;


        
   

