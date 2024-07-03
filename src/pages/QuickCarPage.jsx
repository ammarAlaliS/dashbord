import React from "react";
import Greeting from "../components/Greeting";
import DashbordContainerInfo from "../components/singleComponents/DashbordContainerInfo";
import LinkElement from "../components/singleComponents/linkElement";

import "../style/card.css";
export default function QuickCarPage() {
  return (
    <div>
      <Greeting />
      <LinkElement/>
      <div className="dashbord-info">
        <DashbordContainerInfo
          iconName="ImUserPlus"
          backendInfo={30}
          name="Todos los usuarios"
          grafico="UserChart"
        />
        <DashbordContainerInfo
          iconName="GiBookCover"
          backendInfo={30}
          name="Todos los blogs"
          grafico="Grafico"
          to="/QuickCar/Blog"
        />
        <DashbordContainerInfo
          iconName="FaCartShopping"
          backendInfo={30}
          name="Todos los productos"
          grafico="UserChart"
        />
      </div>
    </div>
  );
}
