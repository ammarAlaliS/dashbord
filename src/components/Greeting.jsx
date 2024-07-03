import React, { useState, useEffect } from "react";
import useUserStore from "../app/userSlice";
import "../style/navbar.css";
import { useLocation } from "react-router-dom";
import Buttom from "./singleComponents/Buttom";

export default function Greeting() {
  const location = useLocation();
  const { user, setUser } = useUserStore(state => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const [path, setPath] = useState('');

  useEffect(() => {
    const getLastPartOfPath = () => {
      const path = location.pathname;
      const lastSlashIndex = path.lastIndexOf("/");
      const result = path.substring(lastSlashIndex + 1);
      setPath(result);
    };
    getLastPartOfPath();
  }, [location.pathname]);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const getDateTime = () => {
    const now = new Date();
    setCurrentDateTime(now);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getDateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dayOfWeek = currentDateTime.toLocaleDateString(undefined, {
    weekday: "long",
  });
  const time = currentDateTime.toLocaleTimeString();

  return (
    <div className="titleSection">
      <div className="greetingAndTime">
        <div className="iconHeader">
          <h2>{path}</h2>
        </div>
        <div className="timeContainer">
          <p>{dayOfWeek}</p>
          <p>{time}</p>
        </div>
      </div>
      <div className="greeting-buttom">
        <div>
          {user && user.first_name && user.last_name ? (
            <h1 className="greeting">
              ¡Hola de nuevo {user.first_name} {user.last_name}!
            </h1>
          ) : (
            <h1 className="greeting">¡Hola! Bienvenido de nuevo</h1>
          )}
        </div>
        <div>
          {path && path === 'Blog' ? <Buttom /> : ''}
        </div>
      </div>
    </div>
  );
}
