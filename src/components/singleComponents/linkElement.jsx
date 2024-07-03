import React, { useEffect } from 'react';
import '../../style/LinkComponent.css';
import { fetchBlogs } from '../../utils/Api';
import { Link, useLocation } from 'react-router-dom';

export default function LinkElement() {
  const location = useLocation();
 

  const isActiveLink = (path) => {
    // Comprueba si location.pathname coincide exactamente con path
    return location.pathname === path ? "activeLink" : "";
  };

  return (
    <div className='LinkComponentContainer'>
      <ul>
      <li>
          {/* Usa isActiveLink para agregar la clase "activeLink" cuando corresponda */}
          <Link className={`${isActiveLink("/QuickCar")} link`} to="/QuickCar">
            QuickCar
          </Link>
        </li>
        <li>
          {/* Usa isActiveLink para agregar la clase "activeLink" cuando corresponda */}
          <Link className={`${isActiveLink("/QuickCar/Blog")} link`} to="/QuickCar/Blog">
            Blogs
          </Link>
        </li>
        <li>
          <Link className={`${isActiveLink("/QuickCar/Tienda")} link`} to="/QuickCar/Tienda">
            Tienda
          </Link>
        </li>
        <li>
          <Link className={`${isActiveLink("/QuickCar/Usuarios")} link`} to="/QuickCar/Usuarios">
            Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
}
