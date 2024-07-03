import React from "react";
import { Link, useLocation } from "react-router-dom";

function Links({ to, name, iconName, onClick }) {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleClick = () => {
    onClick(); 
  };

  return (
    <li className={isActiveLink(to)} onClick={handleClick}>
      <Link to={to} className="link">
        <i className={iconName}></i>
        <span className="logoName">{name}</span>
      </Link>
    </li>
  );
}

export default Links;
