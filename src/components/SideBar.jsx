import React from 'react';

function SideBar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? '' : 'close'}`} id="sidebar">
      <a href="#" className="logo">
        <i className="bx bx-code"></i>
        <div className="logoName">
          Panel
        </div>
      </a>
      <ul className="sideMenu">
        <li className="active">
          <a href="#" >
            <span><i class='bx bxs-car'></i></span>
            <span>QuickCar</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-store"></i>Tucampillo
          </a>
        </li>
        <li>
          <a href="#">
           Fedetierra
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-message-square-dots"></i>Teamtouch
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-group"></i>Conpicoypala
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cog"></i>Obbaramarket
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-cog"></i>Roulettpromociones
          </a>
        </li>
        <li>
        <a href="#">
          <i className="bx bx-cog"></i>Shopsgrup
        </a>
      </li>
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
