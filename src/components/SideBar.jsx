import React from "react";
import { Link } from "react-router-dom";
import Links from "../components/singleComponents/Links.jsx"; // Importa el componente Links externo
import { clearToken } from "../utils/TokenManage";

function SideBar({ isSidebarOpen, setAuth, redirectToHome, setIsSidebarOpen }) {
  const handleLogout = () => {
    clearToken();
    setAuth(false);
    alert("¿Seguro que quieres cerrar sesión?");
    redirectToHome();
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Cierra el sidebar cuando se hace clic en un enlace
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "close"}`} id="sidebar">
      <Link to="/" className="logo">
        <i className="bx bxs-dashboard"></i>
        <div className="logoName">Panel</div>
      </Link>
      <ul className="sideMenu">
        <Links
          to="/Inicio"
          name="Inicio"
          iconName="bx bx-home"
          onClick={handleLinkClick}
        />
        <Links
          to="/QuickCar"
          name="Quickar"
          iconName="bx bx-car"
          onClick={handleLinkClick}
        />
        <Links
          to="/FedeTierra"
          name="Fedetierra"
          iconName="bx bx-leaf"
          onClick={handleLinkClick}
        />
        <Links
          to="/ShopsGrup"
          name="Shopsgrup"
          iconName="bx bx-shopping-bag"
          onClick={handleLinkClick}
        />
        <Links
          to="/TuCamPillo"
          name="Tu campillo"
          iconName="bx bx-lemon"
          onClick={handleLinkClick}
        />
        <Links
          to="/TeamTouch"
          name="Teamtouch"
          iconName="bx bx-calendar-heart"
          onClick={handleLinkClick}
        />
        <Links
          to="/ConpicoYpala"
          name="Conpicoypala"
          iconName="bx bx-hard-hat"
          onClick={handleLinkClick}
        />
        <Links
          to="/Obbaramarket"
          name="Obbaramarket"
          iconName="bx bx-store"
          onClick={handleLinkClick}
        />
        <Links
          to="/roulettpromociones"
          name="Roulettpromociones"
          iconName="bx bx-dice-1"
          onClick={handleLinkClick}
        />
      </ul>
      <ul className="sideMenu">
        <li>
          <button onClick={handleLogout}>
            <i className="bx bx-log-out-circle"></i> Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
