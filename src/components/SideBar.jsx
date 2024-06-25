import React from "react";
import { Link } from "react-router-dom";
import Links from "./singleComponents/Links";
import { clearToken } from "../utils/TokenManage";

function SideBar({ isOpen, setAuth, redirectToHome }) {
  const handleLogout = () => {
    clearToken();
    setAuth(false);
    alert("Seguro que quieres cerrar sesion") 
    redirectToHome(); 
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "close"}`} id="sidebar">
      <Link to="/" className="logo">
      <i class='bx bxs-dashboard'></i>
        <div className="logoName">Panel </div>
      </Link>
      <ul className="sideMenu">
        <Links to="/Inicio" name="Inicio" iconName="bx bx-home" />
        <Links to="/QuickCar" name="Quickar" iconName="bx bx-car" />  
        <Links to="/FedeTierra" name="Fedetierra" iconName="bx bx-leaf" />
        <Links to="/ShopsGrup" name="Shopsgrup" iconName="bx bx-shopping-bag" />
        <Links to="/TuCamPillo" name="Tu campillo" iconName="bx bx-lemon" />
        <Links to="/TeamTouch" name="Teamtouch" iconName="bx bx-calendar-heart" />
        <Links to="/ConpicoYpala" name="Conpicoypala" iconName="bx bx-hard-hat" />
        <Links to="/Obbaramarket" name="Obbaramarket" iconName="bx bx-store" />
        <Links to="/roulettpromociones" name="Roulettpromociones" iconName="bx bx-dice-1" />
      </ul>
      <ul className="sideMenu">
        <li>
          <button onClick={handleLogout}>
            <i className="bx bx-log-out-circle"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
