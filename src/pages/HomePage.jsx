
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../style/navbar.css";
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  const user = useSelector(state => state.user.user);

  const getLastPartOfPath = () => {
    const path = location.pathname;
    const lastSlashIndex = path.lastIndexOf("/");
    return path.substring(lastSlashIndex + 1);
  };

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
        <h2>{getLastPartOfPath()}</h2>
        <div className="timeContainer">
          <p>{dayOfWeek}</p>
          <p>{time}</p>
        </div>
      </div>
      <div>
        {user ? (
          <h1 className='greeting'>¡Hola de nuevo {user.first_name} {user.last_name}!</h1>
        ) : (
          <h1 className='greeting'>¡Hola! Bienvenido de nuevo</h1>
        )}
      </div>
    </div>
  );
}
