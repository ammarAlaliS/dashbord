import React from "react";
import { Link } from "react-router-dom";
import { ImUserPlus } from "react-icons/im";
import { GiBookCover } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import UserChart from "./UserChart ";
import Grafico from "../Grafico";

export default function DashbordContainerInfo({ to, iconName, backendInfo, name, grafico }) {
  const iconComponents = {
    ImUserPlus: ImUserPlus,
    GiBookCover: GiBookCover,
    FaCartShopping: FaCartShopping,
  };
  const graficoComponents = { 
    UserChart: UserChart, 
    Grafico: Grafico
  }

  const IconComponent = iconComponents[iconName];
  const GraficoComponent = graficoComponents[grafico];

  return (
    <Link to={to} className="card-container">
      <div className="card-container-flex">
        <div className="card-info-icon">
          {IconComponent && <IconComponent />}
        </div>
      </div>
      <div>
        {GraficoComponent && <GraficoComponent  totalUsers={backendInfo} name={name}/>}
      </div>
    </Link>
  );
}
