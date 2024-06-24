// main.jsx o App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App';
import SignInPage from './pages/SignInPage';
import QuickCarPage from './pages/QuickCarPage.jsx';
import FedetierraPage from './pages/FedetierraPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TucampilloPage from './pages/TucampilloPage.jsx';
import { isAuthenticated } from './utils/TokenManage.js';

const root = createRoot(document.getElementById('root'));

export function PrivateRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
}


const routes = [
  { path: '/', element: <SignInPage /> },
  { path: '/quickcar', element: <PrivateRoute element={<QuickCarPage />} /> },
  { path: '/fedetierra', element: <PrivateRoute element={<FedetierraPage />} /> },
  { path: '/principal', element: <PrivateRoute element={<HomePage />} /> },
  { path: '/tucampillo', element: <PrivateRoute element={<TucampilloPage />} /> },
  { path: '/home', element: <PrivateRoute element={<App />} /> },
];

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

root.render(<Main />);
