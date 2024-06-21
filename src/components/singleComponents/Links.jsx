import React from "react";
import { Link } from "react-router-dom";

function Links({ to, name }) {
  return (
    <Link to={to} className="link">
      <span className="logoName">{name}</span>
    </Link>
  );
}

export default Links;
