import React from "react";
import "../style/navbar.css";
import { Link, useLocation } from "react-router-dom";
function QuickCarPage() {
  const location = useLocation();

  const getLastPartOfPath = () => {
    const path = location.pathname;
    const lastSlashIndex = path.lastIndexOf("/");
    return path.substring(lastSlashIndex + 1);
  };

  return (
    <div className="titleSection">
      <h2>{getLastPartOfPath()}</h2>
      <Link to="/resume">
        <button>get resume</button>
      </Link>
    </div>
  );
}

export default QuickCarPage