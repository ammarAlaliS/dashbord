import React from "react";
import { Link, useLocation } from "react-router-dom";

function Links({ to, name, iconName }) {
  const location = useLocation();
  const isActiveLink = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <li className={isActiveLink(to)}>
      <Link to={to} className="link">
        <i class={iconName}></i>
        <span className="logoName">{name}</span>
      </Link>
    </li>
  );
}

export default Links;
