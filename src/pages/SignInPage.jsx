import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setError } from "../app/userSlice";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/TokenManage";
import "../style/signIn.css";

export default function SignInPage({ setAuth }) {
  const [error, setLocalError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const response = await fetch(
        "https://obbaramarket-backend-1.onrender.com/api/ObbaraMarket/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        if (responseData.token) {
          setToken(responseData.token);
          dispatch(setUser(responseData));
          console.log("Datos del usuario recibidos y almacenados:", responseData);
          setAuth(true); // Actualiza el estado de autenticación en App.js
          navigate('/Inicio'); // Redirige al usuario a la página de inicio
        } else {
          dispatch(setError("Error: No se recibió un token válido del servidor."));
        }
      } else {
        dispatch(setError(responseData.message || "Error al iniciar sesión"));
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      dispatch(setError("Error al conectar con el servidor. Inténtalo de nuevo más tarde."));
    }
  };

  return (
    <div className="login-container">
      <div className="">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-heading">Iniciar sesión</h2>
          <h4 className="h4">Solo los administradores pueden iniciar sesión.</h4>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              placeholder="Ingresa tu Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
