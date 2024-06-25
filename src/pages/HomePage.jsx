import React from "react";
import Greeting from "../components/Greeting";
export default function HomePage() {
  return (
    <div>
      <Greeting />
      <section className="grid-two">
        <div className="recent-orders-section">
          <div className="headerAndNavbar">
            <div className="section-header">
              <i className="bx bx-car"></i>
              <h2>Nuevos Usuarios</h2>
            </div>
            <div>
              <ul className="section-nav">
                <li>
                  <i className="bx bx-menu-alt-left"></i>
                </li>
                <li>
                  <i className="bx bx-search"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="recent-orders-section">
          <div className="headerAndNavbar">
            <div className="section-header">
              <i className="bx bx-car"></i>
              <h2>Nuevos Usuarios</h2>
            </div>
            <div>
              <ul className="section-nav">
                <li>
                  <i className="bx bx-menu-alt-left"></i>
                </li>
                <li>
                  <i className="bx bx-search"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
