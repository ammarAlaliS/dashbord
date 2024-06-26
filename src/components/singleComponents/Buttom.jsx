import React from "react";
import '../../style/buttom.css'
import { Link } from "react-router-dom";

export default function Buttom() {
  return (
    <div className="buttom-box">
      <Link className="link-crear" to="/QuickCar/Blog/Crear">Crear</Link>
    </div>
  );
}
